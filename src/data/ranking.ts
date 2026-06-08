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
  semana: '2 – 8 de junio de 2026',
  actualizadoEl: '2026-06-08',
  herramientas: [
    {
      posicion: 1,
      nombre: 'Claude 4 Opus',
      empresa: 'Anthropic',
      descripcion: 'El modelo más potente de Anthropic con razonamiento extendido y ventana de 200k tokens.',
      razonTrending: 'Lanzamiento de Claude 4 Opus con mejoras masivas en programación y razonamiento matemático dispara las búsquedas esta semana.',
      categoria: 'Generación de texto',
      url: 'https://claude.ai',
      tendencia: 'nueva',
      cambio: 0,
      precio: 'Desde 15 $/M tokens',
    },
    {
      posicion: 2,
      nombre: 'Cursor',
      empresa: 'Anysphere',
      descripcion: 'IDE con IA para programación multi-fichero, refactorizaciones y generación de código complejo.',
      razonTrending: 'Nueva versión 0.50 con agente autónomo que completa tareas de programación end-to-end sin supervisión manual.',
      categoria: 'Código',
      url: 'https://cursor.sh',
      tendencia: 'sube',
      cambio: 2,
      precio: 'Gratis / Pro 20 $/mes',
    },
    {
      posicion: 3,
      nombre: 'Midjourney v7',
      empresa: 'Midjourney',
      descripcion: 'Generador de imágenes artísticas de altísima calidad con consistencia de personajes.',
      razonTrending: 'La función de consistencia de personajes en v7 está siendo masivamente adoptada para producción de contenido comercial.',
      categoria: 'Generación de imagen',
      url: 'https://midjourney.com',
      tendencia: 'sube',
      cambio: 1,
      precio: 'Desde 10 $/mes',
    },
    {
      posicion: 4,
      nombre: 'Gemini 2.5 Pro',
      empresa: 'Google',
      descripcion: 'Modelo multimodal de Google con integración en todo el ecosistema de apps de Google.',
      razonTrending: 'Integración profunda con Google Workspace genera un pico de interés entre profesionales y empresas.',
      categoria: 'Generación de texto',
      url: 'https://gemini.google.com',
      tendencia: 'estable',
      cambio: 0,
      precio: 'Gratis / Advanced 21.99 $/mes',
    },
    {
      posicion: 5,
      nombre: 'ElevenLabs',
      empresa: 'ElevenLabs',
      descripcion: 'Síntesis y clonación de voz realista en más de 30 idiomas.',
      razonTrending: 'Nueva API de voz en tiempo real con latencia inferior a 300ms abre casos de uso en llamadas y asistentes de voz.',
      categoria: 'Audio',
      url: 'https://try.elevenlabs.io/5pqit62qinao',
      tendencia: 'sube',
      cambio: 3,
      precio: 'Gratis / Starter 5 $/mes',
    },
    {
      posicion: 6,
      nombre: 'Perplexity',
      empresa: 'Perplexity AI',
      descripcion: 'Motor de búsqueda con IA que cita fuentes y responde con contexto actualizado.',
      razonTrending: 'Función de informes profundos (Deep Research) con exportación a PDF está siendo adoptada masivamente en entornos académicos.',
      categoria: 'Generación de texto',
      url: 'https://perplexity.ai',
      tendencia: 'baja',
      cambio: 1,
      precio: 'Gratis / Pro 20 $/mes',
    },
    {
      posicion: 7,
      nombre: 'Kling 2.0',
      empresa: 'Kuaishou',
      descripcion: 'Generador de video de alta resolución con hasta 3 minutos de duración y movimiento fluido.',
      razonTrending: 'Kling 2.0 supera a Runway en calidad de movimiento físico según varios benchmarks independientes publicados esta semana.',
      categoria: 'Video',
      url: 'https://kling.kuaishou.com',
      tendencia: 'nueva',
      cambio: 0,
      precio: 'Créditos desde 9.99 $/mes',
    },
    {
      posicion: 8,
      nombre: 'Ideogram 3.0',
      empresa: 'Ideogram',
      descripcion: 'Especializado en texto dentro de imágenes: logotipos, carteles y miniaturas con tipografía perfecta.',
      razonTrending: 'La actualización 3.0 añade edición de imagen existente manteniendo el estilo, lo que lo convierte en la opción favorita de diseñadores.',
      categoria: 'Generación de imagen',
      url: 'https://ideogram.ai',
      tendencia: 'sube',
      cambio: 4,
      precio: 'Gratis / Basic 8 $/mes',
    },
    {
      posicion: 9,
      nombre: 'NotebookLM',
      empresa: 'Google',
      descripcion: 'Asistente de investigación que analiza tus propios documentos y genera podcasts de audio.',
      razonTrending: 'La función de podcast generado automáticamente a partir de documentos PDF se vuelve viral en comunidades académicas hispanas.',
      categoria: 'Productividad',
      url: 'https://notebooklm.google.com',
      tendencia: 'sube',
      cambio: 2,
      precio: 'Gratis',
    },
    {
      posicion: 10,
      nombre: 'Suno v4',
      empresa: 'Suno',
      descripcion: 'Generación de música completa (letra, melodía, mezcla) desde un prompt de texto.',
      razonTrending: 'Suno v4 genera canciones de hasta 4 minutos con coherencia musical notablemente superior a versiones anteriores.',
      categoria: 'Audio',
      url: 'https://suno.com',
      tendencia: 'baja',
      cambio: 2,
      precio: 'Gratis / Pro 10 $/mes',
    },
  ],
};
