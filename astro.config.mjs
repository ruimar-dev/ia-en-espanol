import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';
import mdx from '@astrojs/mdx';
import vercel from '@astrojs/vercel/serverless';

export default defineConfig({
  site: 'https://ia-en-espanol.vercel.app',
  output: 'hybrid',
  adapter: vercel(),
  integrations: [
    mdx(),
    tailwind(),
    sitemap(),
  ],
});
