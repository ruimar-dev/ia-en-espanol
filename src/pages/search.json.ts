import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';

export const GET: APIRoute = async () => {
  const articulos = await getCollection('blog', ({ data }) => !data.draft);

  const index = articulos.map((a) => ({
    title: a.data.title,
    description: a.data.description,
    category: a.data.category,
    herramientas: a.data.herramientas,
    slug: a.slug,
    imagen: a.data.imagen ?? null,
    date: a.data.date.toISOString(),
    // Strip MDX imports, JSX tags and markdown symbols for plain-text search
    body: a.body
      .replace(/^import\s.+$/gm, '')
      .replace(/<[^>]+>/g, ' ')
      .replace(/[#*`_~\[\](){}|!>]/g, ' ')
      .replace(/\s{2,}/g, ' ')
      .trim()
      .slice(0, 2000),
  }));

  return new Response(JSON.stringify(index), {
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
  });
};
