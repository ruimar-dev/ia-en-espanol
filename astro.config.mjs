import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';
import mdx from '@astrojs/mdx';

export default defineConfig({
  site: process.env.SITE_URL || 'https://iaenespanol.com',
  integrations: [
    mdx(),
    tailwind(),
    sitemap(),
  ],
});
