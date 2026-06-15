export type Tendencia = 'nueva' | 'sube' | 'baja' | 'estable';

export interface HerramientaRanking {
  posicion: number;
  nombre: string;
  empresa: string;
  descripcion: string;
  razonTrending: string;
  categoria: string;
  url: string;
  tendencia: Tendencia;
  cambio: number; // posiciones subidas (+) o bajadas (-); 0 = estable
  precio: string;
}

export interface DatosRanking {
  semana: string;         // "2 – 8 de junio de 2026"
  actualizadoEl: string;  // ISO date "2026-06-08"
  herramientas: HerramientaRanking[];
}

// ─── ACTUALIZAR CADA LUNES ────────────────────────────────────────────────────
export const ranking: DatosRanking = {
  semana: '15 – 21 de junio de 2026',
  actualizadoEl: '2026-06-15',
  herramientas: [
    {
      posicion: 1,
      nombre: 'Claude Opus 4.8',
      empresa: 'Anthropic',
      descripcion: 'El modelo más potente de Anthropic. Referencia en refactoring, debugging y code review con razonamiento extendido.',
      razonTrending: 'Se consolida como el modelo de referencia para programación y razonamiento por segunda semana consecutiva. Disponible en Claude Pro (20 $/mes).',
      categoria: 'Generación de texto',
      url: 'https://claude.ai',
      tendencia: 'estable',
      cambio: 0,
      precio: 'Pro 20 $/mes / API desde 15 $/M tokens',
    },
    {
      posicion: 2,
      nombre: 'ChatGPT',
      empresa: 'OpenAI',
      descripcion: 'Asistente de IA líder con GPT-5.5 por defecto. Memoria mejorada que actualiza contexto en tiempo real.',
      razonTrending: 'La nueva memoria en tiempo real y el anuncio de GPT-5.6 para este mes disparan el interés. OpenAI estrena plan Go (8 $/mes) y dos niveles Pro (100 $ y 200 $/mes).',
      categoria: 'Generación de texto',
      url: 'https://chatgpt.com',
      tendencia: 'sube',
      cambio: 1,
      precio: 'Gratis / Plus 20 $/mes / Go 8 $/mes',
    },
    {
      posicion: 3,
      nombre: 'Cursor',
      empresa: 'Anysphere',
      descripcion: 'IDE con IA para programación multi-fichero, refactorizaciones y generación de código complejo.',
      razonTrending: 'Sigue siendo el IDE con IA de referencia, aunque el lanzamiento de Grok Build (xAI) como competidor directo genera comparativas y debate en la comunidad dev.',
      categoria: 'Código',
      url: 'https://cursor.sh',
      tendencia: 'baja',
      cambio: 1,
      precio: 'Gratis / Pro 20 $/mes',
    },
    {
      posicion: 4,
      nombre: 'Google AI Pro',
      empresa: 'Google',
      descripcion: 'Gemini Advanced renombrado con Gemini 3.1 Pro, 2M tokens de contexto e integración total en Google Workspace.',
      razonTrending: 'El rebranding a "Google AI Pro" con Gemini 3.1 Pro y 2 millones de tokens de contexto a 19,99 $/mes agita el mercado de asistentes premium esta semana.',
      categoria: 'Generación de texto',
      url: 'https://gemini.google.com',
      tendencia: 'sube',
      cambio: 2,
      precio: '19,99 $/mes (Google One AI Pro)',
    },
    {
      posicion: 5,
      nombre: 'Midjourney v8',
      empresa: 'Midjourney',
      descripcion: 'Generador de imágenes artísticas de referencia. La versión 8.1 mejora la coherencia de personajes y prompts complejos.',
      razonTrending: 'Se mantiene como el estándar de calidad en generación de imagen. V8.1 es la versión estable más avanzada y consolida su liderazgo frente a competidores open source.',
      categoria: 'Generación de imagen',
      url: 'https://midjourney.com',
      tendencia: 'estable',
      cambio: 0,
      precio: 'Desde 10 $/mes',
    },
    {
      posicion: 6,
      nombre: 'ElevenLabs',
      empresa: 'ElevenLabs',
      descripcion: 'Síntesis y clonación de voz realista en más de 30 idiomas. Music v2 incluye efectos de sonido embebidos.',
      razonTrending: 'El lanzamiento de Music v2 con efectos de sonido integrados convierte a ElevenLabs en una suite de audio completa, con gran adopción entre podcasters y creadores de contenido.',
      categoria: 'Audio',
      url: 'https://try.elevenlabs.io/5pqit62qinao',
      tendencia: 'sube',
      cambio: 1,
      precio: 'Gratis / Starter 5 $/mes',
    },
    {
      posicion: 7,
      nombre: 'Perplexity',
      empresa: 'Perplexity AI',
      descripcion: 'Motor de búsqueda con IA que cita fuentes. Incorpora generación de vídeo con Sora 2 en los planes Pro y Max.',
      razonTrending: 'El rollout silencioso de generación de vídeo (Sora 2 en Max, acceso limitado en Pro) es la sorpresa de la semana y dispara las búsquedas sobre la plataforma.',
      categoria: 'Generación de texto',
      url: 'https://perplexity.ai',
      tendencia: 'sube',
      cambio: 2,
      precio: 'Gratis / Pro 20 $/mes / Max 200 $/mes',
    },
    {
      posicion: 8,
      nombre: 'Sora 2',
      empresa: 'OpenAI',
      descripcion: 'Sucesor del Sora original (discontinuado en abril). Genera vídeo y audio de mayor calidad e integrado en múltiples plataformas.',
      razonTrending: 'OpenAI discontinuó el Sora original el 26 de abril y lanza Sora 2 integrado en Perplexity Max y ChatGPT Pro. Gran expectación tras meses sin acceso.',
      categoria: 'Video',
      url: 'https://sora.com',
      tendencia: 'nueva',
      cambio: 0,
      precio: 'Vía Perplexity Max (200 $/mes) o ChatGPT Pro',
    },
    {
      posicion: 9,
      nombre: 'RunwayML',
      empresa: 'Runway',
      descripcion: 'Suite profesional de generación y edición de vídeo con IA. Integración MCP para asistentes y flujos automatizados.',
      razonTrending: 'La integración MCP permite a asistentes de IA generar vídeo directamente desde Runway, ampliando casos de uso en producción automatizada de contenido.',
      categoria: 'Video',
      url: 'https://runwayml.com',
      tendencia: 'baja',
      cambio: 1,
      precio: 'Desde 15 $/mes',
    },
    {
      posicion: 10,
      nombre: 'Kling 2.0',
      empresa: 'Kuaishou',
      descripcion: 'Generador de vídeo de alta resolución con hasta 3 minutos de duración y movimiento físico muy realista.',
      razonTrending: 'Se mantiene como alternativa competitiva frente a Runway y el nuevo Sora 2, con mejor relación calidad-precio para producciones de vídeo largas.',
      categoria: 'Video',
      url: 'https://kling.kuaishou.com',
      tendencia: 'estable',
      cambio: 0,
      precio: 'Créditos desde 9.99 $/mes',
    },
  ],
};
