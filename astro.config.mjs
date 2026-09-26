import { defineConfig } from 'astro/config';

import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://www.pablocornejo.cl',
  base: '/',
  // GitHub Pages serves /page/ directly and 301-redirects /page, so keep
  // every internal URL in the trailing-slash form.
  trailingSlash: 'always',
  integrations: [sitemap()],
});