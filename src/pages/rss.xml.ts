import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import type { APIContext } from 'astro';
import { CATEGORIA_LABELS } from '../content/config';

export async function GET(context: APIContext) {
  const articulos = await getCollection('blog', ({ data }) => !data.draft);

  articulos.sort((a, b) => b.data.date.getTime() - a.data.date.getTime());

  return rss({
    title: 'IA en Español',
    description: 'Reviews, comparativas y guías prácticas sobre herramientas de inteligencia artificial. Todo en español, sin anglicismos.',
    site: context.site!,
    items: articulos.map((articulo) => ({
      title: articulo.data.title,
      description: articulo.data.description,
      pubDate: articulo.data.date,
      link: `/blog/${articulo.slug}/`,
      categories: [CATEGORIA_LABELS[articulo.data.category]],
    })),
    customData: `<language>es</language>`,
  });
}
