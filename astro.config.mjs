import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';
import mdx from '@astrojs/mdx';
import vercel from '@astrojs/vercel/serverless';

export default defineConfig({
  site: 'https://iaenespanol.es',
  output: 'hybrid',
  adapter: vercel(),
  markdown: {
    shikiConfig: {
      themes: {
        light: 'github-light',
        dark:  'github-dark',
      },
    },
  },
  integrations: [
    mdx(),
    tailwind(),
    sitemap(),
  ],
  redirects: {
    '/blog/chatgpt-vs-claude-2024': {
      status: 301,
      destination: '/blog/chatgpt-vs-claude-2026',
    },
    '/blog/mejores-ia-generacion-imagen-2024': {
      status: 301,
      destination: '/blog/mejores-ia-generacion-imagen-2026',
    },
    '/blog/claude-fable-5-review-el-modelo-mas-potente-de-anthropic-disponible-al-publico': {
      status: 301,
      destination: '/blog/claude-fable-5-review',
    },
  },
});
