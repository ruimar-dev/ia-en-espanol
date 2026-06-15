import { defineCollection, z } from 'astro:content';

export const CATEGORIAS = [
  'generacion-texto',
  'generacion-imagen',
  'codigo',
  'audio',
  'video',
  'productividad',
] as const;

export type Categoria = (typeof CATEGORIAS)[number];

export const CATEGORIA_LABELS: Record<Categoria, string> = {
  'generacion-texto': 'Generación de texto',
  'generacion-imagen': 'Generación de imagen',
  codigo: 'Código',
  audio: 'Audio',
  video: 'Video',
  productividad: 'Productividad',
};

const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.coerce.date(),
    category: z.enum(CATEGORIAS),
    herramientas: z.array(z.string()).default([]),
    afiliado: z.string().url().optional(),
    imagen: z.string().optional(),
    dateModified: z.coerce.date().optional(),
    faqs: z.array(z.object({
      pregunta: z.string(),
      respuesta: z.string(),
    })).optional(),
    draft: z.boolean().default(false),
  }),
});

export const collections = { blog };
