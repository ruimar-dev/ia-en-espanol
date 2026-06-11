import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';
import mdx from '@astrojs/mdx';
import vercel from '@astrojs/vercel/serverless';

export default defineConfig({
  site: 'https://iaenespanol.es',
  output: 'hybrid',
  adapter: vercel(),
  integrations: [
    mdx(),
    tailwind(),
    sitemap(),
  ],
});
