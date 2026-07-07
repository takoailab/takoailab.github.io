// Tiny YAML loader used by pages at build time (static site generation).
// Pages call e.g. `loadData('news')` to read `src/data/news.yaml`.
import fs from 'node:fs';
import path from 'node:path';
import yaml from 'js-yaml';

const dataDir = path.resolve('src/data');

export function loadData<T = any>(name: string): T {
  const file = path.join(dataDir, `${name}.yaml`);
  const raw = fs.readFileSync(file, 'utf-8');
  return (yaml.load(raw) ?? []) as T;
}

const MONTHS: Record<string, number> = {
  jan: 0,
  feb: 1,
  mar: 2,
  apr: 3,
  may: 4,
  jun: 5,
  jul: 6,
  aug: 7,
  sep: 8,
  oct: 9,
  nov: 10,
  dec: 11,
};

// Turn a talk `date` like "Jun 2026" (or just "2026") into a sortable number.
// Unparseable / missing dates sort to the end.
function talkSortKey(date: unknown): number {
  if (typeof date !== 'string') return -Infinity;
  const m = date.trim().match(/^([A-Za-z]+)?\s*(\d{4})$/);
  if (!m) return -Infinity;
  const month = m[1] ? (MONTHS[m[1].slice(0, 3).toLowerCase()] ?? 0) : 0;
  return parseInt(m[2], 10) * 12 + month;
}

// Load talks sorted newest-first by `date`. Ties keep their YAML order.
export function loadTalks(): any[] {
  return loadData<any[]>('talks').sort((a, b) => talkSortKey(b.date) - talkSortKey(a.date));
}

// Load publications sorted newest-first by `year`. Ties keep their YAML order.
export function loadPublications(): any[] {
  return loadData<any[]>('publications').sort((a, b) => (b.year ?? 0) - (a.year ?? 0));
}

// Load news sorted newest-first by `date` (e.g. "May 2025"). Ties keep YAML order.
export function loadNews(): any[] {
  return loadData<any[]>('news').sort((a, b) => talkSortKey(b.date) - talkSortKey(a.date));
}
