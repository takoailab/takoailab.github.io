// @ts-check
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import { generateThumbnails } from './scripts/gen-thumbnails.mjs';

// Generates talk thumbnails (first slide / video) before every dev + build, and
// regenerates them live when a slides PDF or talks.yaml changes during dev — so
// a newly-added slide shows its thumbnail without restarting the server.
function talkThumbnails() {
  return {
    name: 'talk-thumbnails',
    hooks: {
      'astro:config:setup': async () => {
        await generateThumbnails();
      },
      'astro:server:setup': ({ server }) => {
        const rerun = async (file) => {
          if (/talks\.yaml$/.test(file) || /[\\/]public[\\/]talks[\\/]slides[\\/]/.test(file)) {
            await generateThumbnails();
          }
        };
        server.watcher.on('add', rerun);
        server.watcher.on('change', rerun);
      },
    },
  };
}

// ⛔ You normally do NOT need to edit this file for content updates.
//    Edit the YAML files in `src/data/` and the values in `src/config.ts`.
//
// Before deploying, set `site` (and `base` if this is a GitHub *project*
// page served from a sub-path). See README.md for details.
export default defineConfig({
  // Org page (repo named <owner>.github.io) → served at the root, no `base`.
  site: 'https://takoailab.github.io',
  build: { format: 'directory' },
  // Keep readable, line-broken HTML in the build output (default is minified).
  compressHTML: false,
  integrations: [talkThumbnails(), tailwind({ applyBaseStyles: false })],
});
