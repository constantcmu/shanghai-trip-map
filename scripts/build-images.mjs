import fs from 'node:fs';
import path from 'node:path';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);

async function loadSharp() {
  try {
    const mod = await import('sharp');
    return mod.default || mod;
  } catch {
    if (process.env.LOCALAPPDATA) {
      const localSharp = path.join(process.env.LOCALAPPDATA, 'shanghai-tools', 'node_modules', 'sharp');
      if (fs.existsSync(localSharp)) {
        return require(localSharp);
      }
    }
    throw new Error('sharp module not found. Install locally with "npm install" or in %LOCALAPPDATA%\\shanghai-tools.');
  }
}

const rootDir = process.cwd();
const imgDir = path.join(rootDir, 'place_images');
const thumbDir = path.join(imgDir, 'thumb');
const fullDir = path.join(imgDir, 'full');
const rawBackupDir = path.join(rootDir, 'backup', 'raw_images');

const THUMB_MAX_BYTES = 25 * 1024;
const FULL_MAX_BYTES = 150 * 1024;

async function encodeUnderBudget(pipelineFactory, format, maxBytes, qualities) {
  let lastBuf = null;
  for (const q of qualities) {
    const p = pipelineFactory();
    const buf = format === 'webp'
      ? await p.webp({ quality: q, effort: 5 }).toBuffer()
      : await p.jpeg({ quality: q, mozjpeg: true, progressive: true }).toBuffer();
    lastBuf = buf;
    if (buf.length <= maxBytes) {
      return { buf, quality: q };
    }
  }
  return { buf: lastBuf, quality: qualities[qualities.length - 1] };
}

async function main() {
  const sharp = await loadSharp();
  fs.mkdirSync(thumbDir, { recursive: true });
  fs.mkdirSync(fullDir, { recursive: true });
  fs.mkdirSync(rawBackupDir, { recursive: true });

  const entries = fs.readdirSync(imgDir, { withFileTypes: true })
    .filter((d) => d.isFile() && /\.(jpe?g|png|webp)$/i.test(d.name))
    .map((d) => d.name)
    .sort();

  let rawTotal = 0;
  let thumbWebpTotal = 0;
  let thumbJpgTotal = 0;
  let fullWebpTotal = 0;
  let fullJpgTotal = 0;

  for (const file of entries) {
    const srcPath = path.join(imgDir, file);
    const rawCopyPath = path.join(rawBackupDir, file);
    if (!fs.existsSync(rawCopyPath)) {
      fs.copyFileSync(srcPath, rawCopyPath);
    }
    const inputPath = fs.existsSync(rawCopyPath) ? rawCopyPath : srcPath;
    const origSize = fs.statSync(inputPath).size;
    rawTotal += origSize;

    const stem = path.parse(file).name;

    // 1. Thumb: 128x128 cover (2x for 64x64 UI thumbs)
    const thumbFactory = () => sharp(inputPath).rotate().resize(128, 128, { fit: 'cover', position: 'centre' });
    const tWebp = await encodeUnderBudget(thumbFactory, 'webp', THUMB_MAX_BYTES, [78, 68, 56]);
    const tJpg = await encodeUnderBudget(thumbFactory, 'jpeg', THUMB_MAX_BYTES, [76, 65, 52]);
    fs.writeFileSync(path.join(thumbDir, `${stem}.webp`), tWebp.buf);
    fs.writeFileSync(path.join(thumbDir, `${stem}.jpg`), tJpg.buf);
    thumbWebpTotal += tWebp.buf.length;
    thumbJpgTotal += tJpg.buf.length;

    // 2. Full (Popup): max width 800px, <= 150 KB
    const fullFactory = () => sharp(inputPath).rotate().resize({ width: 800, withoutEnlargement: true });
    const fWebp = await encodeUnderBudget(fullFactory, 'webp', FULL_MAX_BYTES, [80, 72, 64, 54]);
    const fJpg = await encodeUnderBudget(fullFactory, 'jpeg', FULL_MAX_BYTES, [80, 72, 64, 54, 46]);
    fs.writeFileSync(path.join(fullDir, `${stem}.webp`), fWebp.buf);
    fs.writeFileSync(path.join(fullDir, `${stem}.jpg`), fJpg.buf);
    fullWebpTotal += fWebp.buf.length;
    fullJpgTotal += fJpg.buf.length;

    // Update root fallback jpg in place so repo size & fallback paths stay <= 150 KB
    fs.writeFileSync(path.join(imgDir, `${stem}.jpg`), fJpg.buf);

    console.log(
      `${file.padEnd(28)} orig=${(origSize / 1024).toFixed(1).padStart(7)}KB -> ` +
      `thumb=${(tWebp.buf.length / 1024).toFixed(1)}KB(webp)/${(tJpg.buf.length / 1024).toFixed(1)}KB(jpg) | ` +
      `full=${(fWebp.buf.length / 1024).toFixed(1)}KB(webp)/${(fJpg.buf.length / 1024).toFixed(1)}KB(jpg)`
    );
  }

  console.log('\n=== SUMMARY ===');
  console.log(`Processed ${entries.length} images`);
  console.log(`Raw backup total : ${(rawTotal / 1024 / 1024).toFixed(2)} MiB`);
  console.log(`Thumb WebP total : ${(thumbWebpTotal / 1024).toFixed(1)} KB`);
  console.log(`Thumb JPG total  : ${(thumbJpgTotal / 1024).toFixed(1)} KB`);
  console.log(`Full WebP total  : ${(fullWebpTotal / 1024).toFixed(1)} KB (${(fullWebpTotal / 1024 / 1024).toFixed(2)} MiB)`);
  console.log(`Full JPG total   : ${(fullJpgTotal / 1024).toFixed(1)} KB (${(fullJpgTotal / 1024 / 1024).toFixed(2)} MiB)`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
