import { defineConfig } from 'astro/config';

import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://pcornejov.github.io',
  base: '/Sitio-pablo',
  integrations: [sitemap()],
});