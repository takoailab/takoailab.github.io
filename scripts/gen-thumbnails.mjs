// Auto-generate talk thumbnails at build time.
//
// For every entry in src/data/talks.yaml with no explicit `thumbnail`, this
// creates public/talks/thumbs/<name>.jpg from, in order of preference:
//   1. the first page of a local pdf `slides` file
//   2. the Vimeo `video` thumbnail (via Vimeo's oEmbed API)
// (YouTube thumbnails are referenced directly in TalkGrid.astro — no file needed.)
//
// TalkGrid.astro reads the same rules to point at these files. Runs via the
// `prebuild` / `predev` npm hooks. Errors on a single talk are logged and
// skipped — never fatal.
import fs from 'node:fs';
import path from 'node:path';
import yaml from 'js-yaml';
import { pdf } from 'pdf-to-img';
import sharp from 'sharp';

const PUBLIC = 'public';
const OUT_DIR = path.join(PUBLIC, 'talks', 'thumbs');
const TALKS = 'src/data/talks.yaml';

const isLocalPdf = (s) =>
  typeof s === 'string' && !s.includes('://') && s.toLowerCase().endsWith('.pdf');
const vimeoId = (url) => {
  const m = typeof url === 'string' && url.match(/vimeo\.com\/(?:video\/)?(\d+)/);
  return m ? m[1] : null;
};

const writeThumb = (buffer, outPath) =>
  sharp(buffer).resize({ width: 800 }).jpeg({ quality: 75 }).toFile(outPath);

async function fromPdf(pdfPath, outPath) {
  const doc = await pdf(pdfPath, { scale: 2 });
  let firstPage;
  for await (const page of doc) {
    firstPage = page; // Buffer (PNG) of page 1
    break;
  }
  if (!firstPage) throw new Error('no pages');
  await writeThumb(firstPage, outPath);
}

async function fromVimeo(videoUrl, outPath) {
  const api = `https://vimeo.com/api/oembed.json?url=${encodeURIComponent(videoUrl)}&width=1280`;
  const res = await fetch(api);
  if (!res.ok) throw new Error(`oembed ${res.status}`);
  const data = await res.json();
  if (!data.thumbnail_url) throw new Error('no thumbnail_url');
  const img = await fetch(data.thumbnail_url);
  if (!img.ok) throw new Error(`thumbnail ${img.status}`);
  await writeThumb(Buffer.from(await img.arrayBuffer()), outPath);
}

export async function generateThumbnails() {
  if (!fs.existsSync(TALKS)) return;
  const talks = yaml.load(fs.readFileSync(TALKS, 'utf-8')) ?? [];
  fs.mkdirSync(OUT_DIR, { recursive: true });

  for (const t of talks) {
    try {
      if (!t || t.thumbnail) continue; // explicit thumbnail wins

      if (isLocalPdf(t.slides)) {
        const pdfPath = path.join(PUBLIC, t.slides.replace(/^\//, ''));
        if (!fs.existsSync(pdfPath)) {
          console.warn(`[thumbnails] slides not found, skipping: ${pdfPath}`);
          continue;
        }
        const outPath = path.join(OUT_DIR, `${path.basename(pdfPath).replace(/\.pdf$/i, '')}.jpg`);
        // Skip if the thumbnail is already up to date.
        if (
          fs.existsSync(outPath) &&
          fs.statSync(outPath).mtimeMs >= fs.statSync(pdfPath).mtimeMs
        ) {
          continue;
        }
        await fromPdf(pdfPath, outPath);
        console.log(`[thumbnails] ${pdfPath} → ${outPath}`);
        continue;
      }

      const vid = vimeoId(t.video);
      if (vid) {
        const outPath = path.join(OUT_DIR, `vimeo-${vid}.jpg`);
        if (fs.existsSync(outPath)) continue; // already fetched (delete to refresh)
        await fromVimeo(t.video, outPath);
        console.log(`[thumbnails] vimeo ${vid} → ${outPath}`);
      }
    } catch (err) {
      console.warn(
        `[thumbnails] failed for "${t?.title ?? t?.slides ?? t?.video}": ${err.message}`,
      );
    }
  }
}

// Run when invoked directly (e.g. `node scripts/gen-thumbnails.mjs`).
if (import.meta.url === `file://${process.argv[1]}`) generateThumbnails();
