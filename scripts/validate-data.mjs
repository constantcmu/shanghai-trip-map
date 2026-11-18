import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import { execFileSync } from 'node:child_process';

const CHINA_BBOX = { minLat: 18, maxLat: 54, minLng: 73, maxLng: 135 };
const LOCAL_BBOX = { minLat: 30.5, maxLat: 32.0, minLng: 120.0, maxLng: 122.2 };

const TRANSITION_WARN_TOLERANCE = 1e-3;
const TRANSITION_ERROR_TOLERANCE = 5e-3;
const SEGMENT_GAP_TOLERANCE = 1e-4;

const THUMB_MAX_BYTES = 25 * 1024;
const FULL_MAX_BYTES = 150 * 1024;
const DAY_THUMB_WEBP_BUDGET_BYTES = 350 * 1024;
const BUDGET_CHECK_DAYS = new Set(['d2', 'd4', 'd5']);

const FORBIDDEN_CDN_HOSTS = [
  'fonts.googleapis.com',
  'fonts.gstatic.com',
  'unpkg.com'
];

const THAI_WEEKDAYS = ['อาทิตย์', 'จันทร์', 'อังคาร', 'พุธ', 'พฤหัส', 'ศุกร์', 'เสาร์'];

function createContext() {
  return {
    errors: [],
    warnings: [],
    stats: {
      places: 0,
      days: 0,
      steps: 0,
      altSteps: 0,
      imagesChecked: 0,
      inlineScriptsChecked: 0,
      dayThumbWebpBytes: {}
    }
  };
}

function loadTripData(rootDir) {
  const tripDataPath = path.join(rootDir, 'data', 'trip_data.js');
  if (!fs.existsSync(tripDataPath)) {
    throw new Error(`Missing required file: ${tripDataPath}`);
  }
  const code = fs.readFileSync(tripDataPath, 'utf8');
  const sandbox = { window: {} };
  vm.runInNewContext(code, sandbox, { filename: 'data/trip_data.js' });
  const data = sandbox.window?.TRIP_DATA;
  if (!data || typeof data !== 'object') {
    throw new Error('window.TRIP_DATA was not defined by data/trip_data.js');
  }
  return data;
}

function checkCoord(coord, label, ctx) {
  if (!Array.isArray(coord) || coord.length < 2) {
    ctx.errors.push(`${label}: invalid coordinate tuple ${JSON.stringify(coord)}`);
    return;
  }
  const [lat, lng] = coord;
  if (typeof lat !== 'number' || typeof lng !== 'number' || !Number.isFinite(lat) || !Number.isFinite(lng)) {
    ctx.errors.push(`${label}: non-finite lat/lng [${lat}, ${lng}]`);
    return;
  }
  if (lat < CHINA_BBOX.minLat || lat > CHINA_BBOX.maxLat || lng < CHINA_BBOX.minLng || lng > CHINA_BBOX.maxLng) {
    ctx.errors.push(`${label}: [${lat}, ${lng}] is outside China bounding box (${CHINA_BBOX.minLat}-${CHINA_BBOX.maxLat}, ${CHINA_BBOX.minLng}-${CHINA_BBOX.maxLng})`);
    return;
  }
  if (lat < LOCAL_BBOX.minLat || lat > LOCAL_BBOX.maxLat || lng < LOCAL_BBOX.minLng || lng > LOCAL_BBOX.maxLng) {
    ctx.warnings.push(`${label}: [${lat}, ${lng}] is outside Shanghai/Suzhou local bounding box (${LOCAL_BBOX.minLat}-${LOCAL_BBOX.maxLat}, ${LOCAL_BBOX.minLng}-${LOCAL_BBOX.maxLng})`);
  }
}

function parseStepTimes(timeStr, label, ctx) {
  if (typeof timeStr !== 'string' || !timeStr.trim()) {
    ctx.errors.push(`${label}: missing step.time`);
    return null;
  }
  const matches = [...timeStr.matchAll(/\b(\d{1,2}):(\d{2})\b/g)];
  if (matches.length === 0) {
    ctx.errors.push(`${label}: cannot parse HH:MM from step.time "${timeStr}"`);
    return null;
  }

  const parsed = [];
  for (const m of matches) {
    const hh = Number(m[1]);
    const mm = Number(m[2]);
    if (hh < 0 || hh > 23 || mm < 0 || mm > 59) {
      ctx.errors.push(`${label}: invalid time "${m[0]}" in step.time "${timeStr}"`);
      return null;
    }
    parsed.push({ token: m[0], minutes: hh * 60 + mm });
  }

  const startMin = parsed[0].minutes;
  const endMin = parsed[parsed.length - 1].minutes;
  if (endMin < startMin) {
    ctx.errors.push(`${label}: end time precedes start time in "${timeStr}"`);
  }

  const isTransitArrow = timeStr.includes('→') || timeStr.includes('->');
  const syncToken = isTransitArrow ? parsed[parsed.length - 1].token : parsed[0].token;
  return { startMin, endMin, syncToken };
}

function validatePlaceImages(place, rootDir, ctx) {
  if (!place.img) return;
  const imgRel = place.img;
  if (!imgRel.startsWith('place_images/')) {
    ctx.errors.push(`place "${place.id}": img "${imgRel}" must be under place_images/`);
  }
  const origPath = path.join(rootDir, imgRel);
  if (!fs.existsSync(origPath)) {
    ctx.errors.push(`place "${place.id}": missing referenced image "${imgRel}"`);
    return;
  }

  ctx.stats.imagesChecked += 1;
  const stem = path.parse(imgRel).name;
  const variants = [
    { rel: `place_images/thumb/${stem}.webp`, max: THUMB_MAX_BYTES, kind: 'thumb webp' },
    { rel: `place_images/thumb/${stem}.jpg`, max: THUMB_MAX_BYTES, kind: 'thumb jpg' },
    { rel: `place_images/full/${stem}.webp`, max: FULL_MAX_BYTES, kind: 'full webp' },
    { rel: `place_images/full/${stem}.jpg`, max: FULL_MAX_BYTES, kind: 'full jpg' }
  ];

  for (const v of variants) {
    const fullPath = path.join(rootDir, v.rel);
    if (!fs.existsSync(fullPath)) {
      ctx.errors.push(`place "${place.id}": missing optimized ${v.kind} "${v.rel}"`);
      continue;
    }
    const size = fs.statSync(fullPath).size;
    if (size === 0) {
      ctx.errors.push(`place "${place.id}": empty ${v.kind} "${v.rel}"`);
    } else if (size > v.max) {
      ctx.errors.push(
        `place "${place.id}": ${v.kind} "${v.rel}" is ${(size / 1024).toFixed(1)} KB (limit ${(v.max / 1024).toFixed(0)} KB)`
      );
    }
  }
}

function validatePlaces(data, rootDir, ctx) {
  if (!Array.isArray(data.places) || data.places.length === 0) {
    ctx.errors.push('TRIP_DATA.places must be a non-empty array');
    return new Map();
  }
  ctx.stats.places = data.places.length;

  if (data.meta?.hotel) {
    checkCoord([data.meta.hotel.lat, data.meta.hotel.lng], 'meta.hotel', ctx);
  }

  const validZones = new Set(Object.keys(data.zones || {}));
  const validDays = new Set((data.days || []).map((d) => d.id));
  const placeById = new Map();

  for (let i = 0; i < data.places.length; i += 1) {
    const p = data.places[i];
    if (!p || typeof p.id !== 'string' || !p.id.trim()) {
      ctx.errors.push(`places[${i}]: missing valid string id`);
      continue;
    }
    if (placeById.has(p.id)) {
      ctx.errors.push(`Duplicate place id "${p.id}"`);
      continue;
    }
    placeById.set(p.id, p);

    if (!validZones.has(p.zone)) {
      ctx.errors.push(`place "${p.id}": unknown zone "${p.zone}"`);
    }
    if (!validDays.has(p.day)) {
      ctx.errors.push(`place "${p.id}": unknown day "${p.day}"`);
    }
    checkCoord([p.lat, p.lng], `place "${p.id}"`, ctx);
    validatePlaceImages(p, rootDir, ctx);
  }

  return placeById;
}

function validateDayCalendar(day, index, ctx) {
  if (typeof day.title !== 'string') {
    ctx.errors.push(`day "${day.id}": missing title`);
    return;
  }
  const match = day.title.match(/(อาทิตย์|จันทร์|อังคาร|พุธ|พฤหัสบดี|พฤหัส|ศุกร์|เสาร์)\s+(\d{1,2})\s+ธ\.ค\./);
  if (!match) {
    ctx.errors.push(`day "${day.id}": title "${day.title}" does not contain expected Thai weekday + December date`);
    return;
  }
  const rawWeekday = match[1] === 'พฤหัสบดี' ? 'พฤหัส' : match[1];
  const dayOfMonth = Number(match[2]);
  const expectedDayOfMonth = 6 + index;
  if (dayOfMonth !== expectedDayOfMonth) {
    ctx.errors.push(`day "${day.id}": expected Dec ${expectedDayOfMonth}, 2026 in title, found Dec ${dayOfMonth}`);
  }
  const actualDow = new Date(Date.UTC(2026, 11, dayOfMonth)).getUTCDay();
  const expectedWeekday = THAI_WEEKDAYS[actualDow];
  if (rawWeekday !== expectedWeekday) {
    ctx.errors.push(
      `day "${day.id}": weekday "${rawWeekday}" in "${day.title}" does not match ${dayOfMonth} Dec 2026 (${expectedWeekday})`
    );
  }
}

function coordDelta(a, b) {
  return Math.max(Math.abs(a[0] - b[0]), Math.abs(a[1] - b[1]));
}

function validateStepSegments(step, label, transitStyles, ctx) {
  if (step.segments === undefined) return;
  if (!Array.isArray(step.segments) || step.segments.length === 0) {
    ctx.errors.push(`${label}: segments must be a non-empty array when provided`);
    return;
  }

  for (let j = 0; j < step.segments.length; j += 1) {
    const seg = step.segments[j];
    const segLabel = `${label}.segments[${j}]`;
    if (!transitStyles.has(seg.mode)) {
      ctx.errors.push(`${segLabel}: unknown mode "${seg.mode}"`);
    }
    if (!Array.isArray(seg.coords) || seg.coords.length < 2) {
      ctx.errors.push(`${segLabel}: coords must have at least 2 points`);
      continue;
    }
    for (let k = 0; k < seg.coords.length; k += 1) {
      checkCoord(seg.coords[k], `${segLabel}.coords[${k}]`, ctx);
    }
    if (j < step.segments.length - 1) {
      const nextSeg = step.segments[j + 1];
      if (Array.isArray(nextSeg.coords) && nextSeg.coords.length > 0) {
        const gap = coordDelta(seg.coords[seg.coords.length - 1], nextSeg.coords[0]);
        if (gap > TRANSITION_ERROR_TOLERANCE) {
          ctx.errors.push(`${segLabel}->[${j + 1}]: segment gap ${gap.toFixed(6)} exceeds ${TRANSITION_ERROR_TOLERANCE}`);
        } else if (gap > SEGMENT_GAP_TOLERANCE) {
          ctx.warnings.push(`${segLabel}->[${j + 1}]: segment gap ${gap.toFixed(6)}`);
        }
      }
    }
  }

  const firstSeg = step.segments[0];
  const lastSeg = step.segments[step.segments.length - 1];
  if (Array.isArray(firstSeg.coords) && firstSeg.coords.length > 0 && Array.isArray(step.coords) && step.coords.length > 0) {
    const startGap = coordDelta(firstSeg.coords[0], step.coords[0]);
    if (startGap > SEGMENT_GAP_TOLERANCE) {
      ctx.warnings.push(`${label}: first segment start differs from step.coords[0] by ${startGap.toFixed(6)}`);
    }
    const endGap = coordDelta(lastSeg.coords[lastSeg.coords.length - 1], step.coords[step.coords.length - 1]);
    if (endGap > SEGMENT_GAP_TOLERANCE) {
      ctx.warnings.push(`${label}: last segment end differs from step.coords end by ${endGap.toFixed(6)}`);
    }
  }
}

function validateStepList(day, listName, steps, placeById, transitStyles, visitMap, ctx) {
  if (!Array.isArray(steps) || steps.length === 0) {
    ctx.errors.push(`day "${day.id}".${listName}: must be a non-empty array`);
    return;
  }

  let prevEndMin = -1;

  for (let i = 0; i < steps.length; i += 1) {
    const step = steps[i];
    const label = `${day.id}.${listName}[${i}] (stepNo=${step?.stepNo})`;
    if (listName === 'steps') ctx.stats.steps += 1;
    else ctx.stats.altSteps += 1;

    if (!placeById.has(step.placeId)) {
      ctx.errors.push(`${label}: unknown placeId "${step.placeId}"`);
    } else {
      if (!visitMap.has(step.placeId)) visitMap.set(step.placeId, []);
      visitMap.get(step.placeId).push({ dayId: day.id, listName, stepNo: step.stepNo, time: step.time });
    }

    if (!transitStyles.has(step.mode)) {
      ctx.errors.push(`${label}: unknown mode "${step.mode}"`);
    }

    const minPoints = listName === 'steps' && i === 0 ? 1 : 2;
    if (!Array.isArray(step.coords) || step.coords.length < minPoints) {
      ctx.errors.push(`${label}: coords.length must be >= ${minPoints} (got ${step.coords?.length ?? 0})`);
    } else {
      for (let k = 0; k < step.coords.length; k += 1) {
        checkCoord(step.coords[k], `${label}.coords[${k}]`, ctx);
      }
      if (i < steps.length - 1) {
        const next = steps[i + 1];
        if (Array.isArray(next?.coords) && next.coords.length > 0) {
          const gap = coordDelta(step.coords[step.coords.length - 1], next.coords[0]);
          if (gap > TRANSITION_ERROR_TOLERANCE) {
            ctx.errors.push(
              `${day.id}.${listName} step ${step.stepNo}->${next.stepNo}: transition gap ${gap.toFixed(6)} exceeds tolerance ${TRANSITION_ERROR_TOLERANCE}`
            );
          } else if (gap > TRANSITION_WARN_TOLERANCE) {
            ctx.warnings.push(
              `${day.id}.${listName} step ${step.stepNo}->${next.stepNo}: station/walk transition gap ${gap.toFixed(6)}`
            );
          }
        }
      }
    }

    validateStepSegments(step, label, transitStyles, ctx);

    const parsedTime = parseStepTimes(step.time, label, ctx);
    if (parsedTime) {
      if (prevEndMin !== -1 && parsedTime.startMin < prevEndMin) {
        ctx.errors.push(
          `${label}: non-monotonic step.time "${step.time}" starts before previous step ends`
        );
      }
      prevEndMin = parsedTime.endMin;
    }
  }
}

function validateDaysAndRoutes(data, placeById, rootDir, ctx) {
  if (!Array.isArray(data.days) || data.days.length === 0) {
    ctx.errors.push('TRIP_DATA.days must be a non-empty array');
    return new Map();
  }
  ctx.stats.days = data.days.length;

  const transitStyles = new Set(Object.keys(data.transitStyles || {}));
  if (transitStyles.size === 0) {
    ctx.errors.push('TRIP_DATA.transitStyles must be a non-empty object');
  }

  const visitMap = new Map();

  for (let i = 0; i < data.days.length; i += 1) {
    const day = data.days[i];
    validateDayCalendar(day, i, ctx);
    validateStepList(day, 'steps', day.steps, placeById, transitStyles, visitMap, ctx);
    if (day.altSteps !== undefined) {
      validateStepList(day, 'altSteps', day.altSteps, placeById, transitStyles, visitMap, ctx);
    }

    const seenPlaces = new Set();
    let dayThumbWebpBytes = 0;
    for (const s of [...(day.steps || []), ...(day.altSteps || [])]) {
      const p = placeById.get(s.placeId);
      if (p?.img && !seenPlaces.has(p.id)) {
        seenPlaces.add(p.id);
        const stem = path.parse(p.img).name;
        const thumbWebpPath = path.join(rootDir, 'place_images', 'thumb', `${stem}.webp`);
        if (fs.existsSync(thumbWebpPath)) {
          dayThumbWebpBytes += fs.statSync(thumbWebpPath).size;
        }
      }
    }
    ctx.stats.dayThumbWebpBytes[day.id] = dayThumbWebpBytes;
    if (dayThumbWebpBytes > DAY_THUMB_WEBP_BUDGET_BYTES) {
      const msg = `day "${day.id}": total thumb WebP size ${(dayThumbWebpBytes / 1024).toFixed(1)} KB exceeds ${(DAY_THUMB_WEBP_BUDGET_BYTES / 1024).toFixed(0)} KB budget`;
      if (BUDGET_CHECK_DAYS.has(day.id)) ctx.errors.push(msg);
      else ctx.warnings.push(msg);
    }
  }

  return visitMap;
}

function validateSingleVisitTimeSlots(data, visitMap, ctx) {
  for (const place of data.places || []) {
    const visits = visitMap.get(place.id) || [];
    if (visits.length === 0) {
      ctx.warnings.push(`place "${place.id}": not referenced by any day step`);
      continue;
    }
    if (visits.length === 1) {
      const visit = visits[0];
      const parsed = parseStepTimes(visit.time, `timeSlot sync (${place.id})`, ctx);
      if (!parsed) continue;
      if (typeof place.timeSlot !== 'string' || !place.timeSlot.includes(parsed.syncToken)) {
        ctx.errors.push(
          `place "${place.id}": timeSlot "${place.timeSlot}" does not include step time "${parsed.syncToken}" from ${visit.dayId}.${visit.listName} step ${visit.stepNo} ("${visit.time}")`
        );
      }
    }
  }
}

function validateIndexHtml(rootDir, ctx) {
  const htmlPath = path.join(rootDir, 'index.html');
  if (!fs.existsSync(htmlPath)) {
    ctx.errors.push('Missing index.html');
    return;
  }
  const html = fs.readFileSync(htmlPath, 'utf8');
  const lowerHtml = html.toLowerCase();
  for (const host of FORBIDDEN_CDN_HOSTS) {
    if (lowerHtml.includes(host)) {
      ctx.errors.push(`index.html contains forbidden external host "${host}"`);
    }
  }

  const scriptRegex = /<script\b([^>]*)>([\s\S]*?)<\/script>/gi;
  let match;
  while ((match = scriptRegex.exec(html)) !== null) {
    const attrs = match[1] || '';
    const body = match[2] || '';
    const srcMatch = attrs.match(/\bsrc\s*=\s*['"]([^'"]+)['"]/i);
    if (srcMatch) {
      const src = srcMatch[1];
      if (src.startsWith('./')) {
        const clean = src.split(/[?#]/)[0];
        if (!fs.existsSync(path.join(rootDir, clean))) {
          ctx.errors.push(`index.html: missing local script "${clean}"`);
        }
      }
      continue;
    }
    const typeMatch = attrs.match(/\btype\s*=\s*['"]([^'"]+)['"]/i);
    const scriptType = typeMatch ? typeMatch[1].trim().toLowerCase() : '';
    const isJsScript = !scriptType || scriptType === 'text/javascript' || scriptType === 'application/javascript' || scriptType === 'module';
    if (isJsScript && body.trim()) {
      ctx.stats.inlineScriptsChecked += 1;
      try {
        // Parse syntax cleanly without executing browser DOM code
        new Function(body);
      } catch (err) {
        ctx.errors.push(`index.html inline <script> syntax error: ${err.message}`);
      }
    }
  }

  const linkRegex = /<link\b[^>]*\bhref\s*=\s*['"]([^'"]+)['"][^>]*>/gi;
  while ((match = linkRegex.exec(html)) !== null) {
    const href = match[1];
    if (href.startsWith('./')) {
      const clean = href.split(/[?#]/)[0];
      if (!fs.existsSync(path.join(rootDir, clean))) {
        ctx.errors.push(`index.html: missing local linked asset "${clean}"`);
      }
    }
  }
}

function validateServiceWorker(rootDir, ctx) {
  const swPath = path.join(rootDir, 'sw.js');
  if (!fs.existsSync(swPath)) {
    ctx.errors.push('Missing sw.js');
    return;
  }
  try {
    execFileSync(process.execPath, ['--check', swPath], { stdio: 'pipe' });
  } catch (err) {
    const stderr = err.stderr ? String(err.stderr).trim() : err.message;
    ctx.errors.push(`sw.js syntax check failed: ${stderr}`);
  }
}

function main() {
  const rootDir = process.cwd();
  const ctx = createContext();

  const data = loadTripData(rootDir);
  const placeById = validatePlaces(data, rootDir, ctx);
  const visitMap = validateDaysAndRoutes(data, placeById, rootDir, ctx);
  validateSingleVisitTimeSlots(data, visitMap, ctx);
  validateIndexHtml(rootDir, ctx);
  validateServiceWorker(rootDir, ctx);

  for (const w of ctx.warnings) {
    console.warn(`⚠️  ${w}`);
  }

  if (ctx.errors.length > 0) {
    for (const e of ctx.errors) {
      console.error(`❌ ${e}`);
    }
    console.error(`\nValidation failed with ${ctx.errors.length} error(s) and ${ctx.warnings.length} warning(s).`);
    process.exit(1);
  }

  const thumbSummary = ['d2', 'd4', 'd5']
    .map((id) => `${id}=${((ctx.stats.dayThumbWebpBytes[id] || 0) / 1024).toFixed(1)}KB`)
    .join(', ');

  console.log(
    `✅ All checks passed: ${ctx.stats.places} places, ${ctx.stats.days} days ` +
    `(${ctx.stats.steps} steps + ${ctx.stats.altSteps} altSteps), ` +
    `${ctx.stats.imagesChecked} images (4 variants each), ` +
    `day thumb WebP [${thumbSummary}], ` +
    `${ctx.stats.inlineScriptsChecked} inline script(s), sw.js OK, ` +
    `${ctx.warnings.length} warning(s).`
  );
}

main();
