// Skeleton validator — Phase 4 will populate full schema, coordinate, timing, and budget rules.
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';

const rootDir = process.cwd();
const tripDataPath = path.join(rootDir, 'data', 'trip_data.js');

function main() {
  const code = fs.readFileSync(tripDataPath, 'utf8');
  const ctx = { window: {} };
  vm.runInNewContext(code, ctx);
  const data = ctx.window.TRIP_DATA;
  if (!data) {
    console.error('❌ window.TRIP_DATA not found');
    process.exit(1);
  }
  console.log(
    `✅ Skeleton check passed: ${data.places.length} places, ${data.days.length} days, ${Object.keys(data.zones).length} zones`
  );
  // TODO (Phase 4):
  // - Unique place IDs & valid step.placeId references
  // - coords >= 2 pts, step n end == step n+1 start, monotonic time
  // - mode in transitStyles, lat/lng inside China bbox
  // - timeSlot sync with steps.time, image existence & size budgets
  // - calendar day/date alignment (Dec 6, 2026 = Sunday)
  // - index.html dependency check (no google/unpkg domains)
}

main();
