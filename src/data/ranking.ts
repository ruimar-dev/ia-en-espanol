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
  semana: '22 – 28 de junio de 2026',
  actualizadoEl: '2026-06-22',
  herramientas: [
    {
      posicion: 1,
      nombre: 'ChatGPT',
      empresa: 'OpenAI',
      descripcion: 'Asistente de IA líder. GPT-5.6, recién lanzado, incorpora razonamiento agéntico avanzado y un modo UltraFast de baja latencia para programación.',
      razonTrending: 'GPT-5.6 ya está disponible con razonamiento en contexto largo y UltraFast para código. La directiva de control de exportaciones que suspende Claude Fable 5 beneficia a ChatGPT como alternativa premium de referencia esta semana.',
      categoria: 'Generación de texto',
      url: 'https://chatgpt.com',
      tendencia: 'sube',
      cambio: 1,
      precio: 'Gratis / Plus 20 $/mes / Go 8 $/mes',
    },
    {
      posicion: 2,
      nombre: 'Claude Opus 4.8',
      empresa: 'Anthropic',
      descripcion: 'El modelo más potente de Anthropic disponible. Referencia en razonamiento, análisis de documentos y escritura de calidad.',
      razonTrending: 'Semana complicada para Anthropic: una directiva del gobierno de EE.UU. obliga a suspender el acceso a Claude Fable 5 y Mythos 5. Opus 4.8 sigue disponible y es la opción recomendada, pero la incertidumbre sobre el modelo flagship pesa en el ranking.',
      categoria: 'Generación de texto',
      url: 'https://claude.ai',
      tendencia: 'baja',
      cambio: 1,
      precio: 'Pro 20 $/mes / API desde 15 $/M tokens',
    },
    {
      posicion: 3,
      nombre: 'Google AI Pro',
      empresa: 'Google',
      descripcion: 'Suite de IA con Gemini 3.5 Flash recién lanzado: inteligencia de frontera con capacidades agénticas y 4× más velocidad de generación que la competencia.',
      razonTrending: 'Gemini 3.5 Flash se estrena esta semana con 284 tokens/segundo y puntuación de 55 en el Intelligence Index. Google Antigravity, su plataforma agent-first, abre al público general.',
      categoria: 'Generación de texto',
      url: 'https://gemini.google.com',
      tendencia: 'sube',
      cambio: 1,
      precio: '19,99 $/mes (Google One AI Pro)',
    },
    {
      posicion: 4,
      nombre: 'Cursor',
      empresa: 'Anysphere',
      descripcion: 'IDE con IA para programación multi-fichero, refactorizaciones y generación de código complejo.',
      razonTrending: 'Sin grandes novedades propias esta semana. Mantiene el liderazgo en IDEs con IA, aunque el modo UltraFast de GPT-5.6 y Grok Build aumentan la presión competitiva.',
      categoria: 'Código',
      url: 'https://cursor.sh',
      tendencia: 'baja',
      cambio: 1,
      precio: 'Gratis / Pro 20 $/mes',
    },
    {
      posicion: 5,
      nombre: 'Midjourney v8',
      empresa: 'Midjourney',
      descripcion: 'Generador de imágenes artísticas de referencia. V8.1 mantiene el estándar de calidad frente a competidores open source.',
      razonTrending: 'La sorpresa de la semana es Midjourney Medical, un escáner corporal ultrasónico 10× más barato que una resonancia presentado en San Francisco. La apuesta por hardware médico no afecta al producto de imagen, que sigue siendo el referente.',
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
      descripcion: 'Síntesis y clonación de voz realista en más de 30 idiomas. Music v2 API disponible con composición por chunks para mayor control creativo.',
      razonTrending: 'Music v2 llega a la API con planes de composición por fragmentos y nuevas herramientas de evaluación de conversación. ElevenLabs se consolida como la suite de audio IA más completa del mercado.',
      categoria: 'Audio',
      url: 'https://try.elevenlabs.io/5pqit62qinao',
      tendencia: 'estable',
      cambio: 0,
      precio: 'Gratis / Starter 5 $/mes',
    },
    {
      posicion: 7,
      nombre: 'Perplexity',
      empresa: 'Perplexity AI',
      descripcion: 'Motor de búsqueda con IA que cita fuentes. Integra generación de vídeo con Sora 2 en los planes Pro y Max.',
      razonTrending: 'Sin novedades propias esta semana. Mantiene su posición como mejor buscador con IA, aunque la llegada de Gemini Spark como agente diario en Google aumenta la competencia en su nicho.',
      categoria: 'Generación de texto',
      url: 'https://perplexity.ai',
      tendencia: 'estable',
      cambio: 0,
      precio: 'Gratis / Pro 20 $/mes / Max 200 $/mes',
    },
    {
      posicion: 8,
      nombre: 'Grok',
      empresa: 'xAI',
      descripcion: 'Chatbot de xAI con acceso a datos de X en tiempo real. Grok 4.3 disponible en Amazon Bedrock con ventana de contexto de 1M de tokens.',
      razonTrending: 'Gran semana para xAI: Grok 4.3 llega a Amazon Bedrock con 1M de tokens, se lanza el add-in gratuito para Microsoft Word y PowerPoint, y Grok Imagine Video 1.5 sale de beta. Entra por primera vez en el top 10.',
      categoria: 'Generación de texto',
      url: 'https://grok.com',
      tendencia: 'nueva',
      cambio: 0,
      precio: 'Incluido en X Premium (~8-12 €/mes en web)',
    },
    {
      posicion: 9,
      nombre: 'Sora 2',
      empresa: 'OpenAI',
      descripcion: 'Generador de vídeo de OpenAI integrado en Perplexity Max y ChatGPT Pro.',
      razonTrending: 'Sin novedades propias: GPT-5.6 concentra toda la atención de OpenAI esta semana. Sora 2 mantiene presencia vía Perplexity Max pero pierde una posición.',
      categoria: 'Video',
      url: 'https://sora.com',
      tendencia: 'baja',
      cambio: 1,
      precio: 'Vía Perplexity Max (200 $/mes) o ChatGPT Pro',
    },
    {
      posicion: 10,
      nombre: 'RunwayML',
      empresa: 'Runway',
      descripcion: 'Suite profesional de generación y edición de vídeo con IA. Integración MCP disponible para flujos de producción automatizada.',
      razonTrending: 'Se mantiene en el top 10 por su madurez como herramienta profesional de vídeo. La integración MCP gana tracción en flujos de contenido automatizado.',
      categoria: 'Video',
      url: 'https://runwayml.com',
      tendencia: 'baja',
      cambio: 1,
      precio: 'Desde 15 $/mes',
    },
  ],
};
