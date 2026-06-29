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
  semana: '29 de junio – 5 de julio de 2026',
  actualizadoEl: '2026-06-29',
  herramientas: [
    {
      posicion: 1,
      nombre: 'ChatGPT',
      empresa: 'OpenAI',
      descripcion: 'Asistente de IA líder. GPT-5.6 Sol en fase restringida; Codex Remote disponible en todos los planes para programación asíncrona desde móvil.',
      razonTrending: 'GPT-5.6 Sol llega con restricciones: solo disponible para "socios de confianza" aprobados por la administración Trump, dejando fuera al usuario general. GPT-5.5 Instant mejora instrucción y contexto. Codex Remote pasa a disponibilidad general en todos los planes — gran adición para flujos de código desde el móvil.',
      categoria: 'Generación de texto',
      url: 'https://chatgpt.com',
      tendencia: 'estable',
      cambio: 0,
      precio: 'Gratis / Plus 20 $/mes / Go 8 $/mes',
    },
    {
      posicion: 2,
      nombre: 'Google AI Pro',
      empresa: 'Google',
      descripcion: 'Suite de IA con Gemini 3.5 Pro disponible este mes y plataforma agéntica Google Antigravity abierta al público general.',
      razonTrending: 'Google suma dos victorias esta semana: Gemini 3.5 Pro se libera tras anunciarse en Google I/O, y la discontinuación de Sora como producto de consumo refuerza el ecosistema Veo 3 de Google como referente en vídeo IA. Google Antigravity ya es pública para todos los usuarios. Sube al #2.',
      categoria: 'Generación de texto',
      url: 'https://gemini.google.com',
      tendencia: 'sube',
      cambio: 1,
      precio: '19,99 $/mes (Google One AI Pro)',
    },
    {
      posicion: 3,
      nombre: 'Claude Opus 4.8',
      empresa: 'Anthropic',
      descripcion: 'El modelo flagship disponible de Anthropic. Referencia en razonamiento, análisis de documentos y trabajo agéntico de largo horizonte.',
      razonTrending: 'Claude Mythos Preview se retira el 30 de junio, dejando a Opus 4.8 como única opción premium. La restricción de Fable 5 sigue activa. En el lado positivo, Anthropic firma un acuerdo con Amazon por hasta 5 GW de capacidad de cómputo — señal de una apuesta a largo plazo — y en Slack Teams ya se puede mencionar a Claude directamente para delegar tareas.',
      categoria: 'Generación de texto',
      url: 'https://claude.ai',
      tendencia: 'baja',
      cambio: 1,
      precio: 'Pro 20 $/mes / API desde 15 $/M tokens',
    },
    {
      posicion: 4,
      nombre: 'Midjourney',
      empresa: 'Midjourney',
      descripcion: 'Referente en generación de imágenes artísticas. V8.1 lidera en calidad y esta semana estrena Midjourney Video V1: clips de 5 segundos a 25× menos precio que la competencia.',
      razonTrending: 'La sorpresa creativa de la semana: Midjourney lanza su primer modelo de vídeo (V1), que anima imágenes en clips de 5 segundos al mismo coste que un upscale de imagen — 25 veces más barato que los principales competidores. La combinación imagen + vídeo en una sola suscripción lo convierte en la suite creativa más completa. Sube al #4.',
      categoria: 'Generación de imagen',
      url: 'https://midjourney.com',
      tendencia: 'sube',
      cambio: 1,
      precio: 'Desde 10 $/mes',
    },
    {
      posicion: 5,
      nombre: 'Grok',
      empresa: 'xAI',
      descripcion: 'Chatbot de xAI con acceso a datos de X en tiempo real. Grok 4.3 en Amazon Bedrock, add-in gratuito para Microsoft 365 y Video 1.5 disponible globalmente.',
      razonTrending: 'Semana excepcional para xAI: Grok 4.3 llega a Amazon Bedrock con ventana de 1M de tokens y razonamiento configurable; el add-in gratuito para Word, Excel y PowerPoint ya está disponible; y Grok Imagine Video 1.5 sale de beta con mejoras de calidad y nuevos workflows de proyectos. El salto de 3 posiciones refleja la velocidad de expansión de xAI.',
      categoria: 'Generación de texto',
      url: 'https://grok.com',
      tendencia: 'sube',
      cambio: 3,
      precio: 'Incluido en X Premium (~8-12 €/mes en web)',
    },
    {
      posicion: 6,
      nombre: 'ElevenLabs',
      empresa: 'ElevenLabs',
      descripcion: 'Síntesis y clonación de voz realista en más de 30 idiomas. Music v2 API con composición por chunks, evaluación de conversaciones y mejoras en telefonía.',
      razonTrending: 'Music v2 sigue evolucionando con planes de composición más granulares y nuevas herramientas de evaluación de conversaciones. Sin competidores directos de peso en síntesis de voz profesional, ElevenLabs mantiene su posición aunque sin una novedad de primer nivel esta semana.',
      categoria: 'Audio',
      url: 'https://try.elevenlabs.io/5pqit62qinao',
      tendencia: 'estable',
      cambio: 0,
      precio: 'Gratis / Starter 5 $/mes',
    },
    {
      posicion: 7,
      nombre: 'Cursor',
      empresa: 'Anysphere',
      descripcion: 'IDE con IA para programación multi-fichero. Potenciado por Claude y GPT-5.5; en proceso de adquisición por SpaceX por 60.000 millones de dólares.',
      razonTrending: 'SpaceX firma el acuerdo definitivo para adquirir Anysphere (Cursor) por 60.000 M$. El anuncio genera incertidumbre entre el millón de desarrolladores que elegían Cursor por su neutralidad de modelos. La integración bajo el paraguas de Elon Musk plantea dudas sobre si mantendrá acceso simultáneo a Claude y GPT. Cae 3 posiciones.',
      categoria: 'Código',
      url: 'https://cursor.sh',
      tendencia: 'baja',
      cambio: 3,
      precio: 'Gratis / Pro 20 $/mes',
    },
    {
      posicion: 8,
      nombre: 'Perplexity',
      empresa: 'Perplexity AI',
      descripcion: 'Motor de búsqueda con IA que cita fuentes. "Computer for Counsel" introduce una capa agéntica multimodelo para flujos legales profesionales.',
      razonTrending: '"Computer for Counsel" apunta al sector legal con agentes multimodelo — un nicho B2B prometedor. Sin embargo, la ausencia de novedades para el usuario general y la creciente competencia de Google Antigravity y Grok en búsqueda agéntica le cuestan una posición esta semana.',
      categoria: 'Generación de texto',
      url: 'https://perplexity.ai',
      tendencia: 'baja',
      cambio: 1,
      precio: 'Gratis / Pro 20 $/mes / Max 200 $/mes',
    },
    {
      posicion: 9,
      nombre: 'RunwayML',
      empresa: 'Runway',
      descripcion: 'Suite profesional de vídeo IA con Gen-4.5 propio y acceso integrado a Veo 3 y Veo 3.1 de Google directamente en la plataforma.',
      razonTrending: 'La discontinuación de Sora como producto de consumo empuja usuarios hacia RunwayML, que ya integra Veo 3.1 de Google junto a su Gen-4.5 propio — la combinación más potente del mercado profesional. Sube una posición como beneficiario directo de la salida de Sora.',
      categoria: 'Video',
      url: 'https://runwayml.com',
      tendencia: 'sube',
      cambio: 1,
      precio: 'Desde 15 $/mes',
    },
    {
      posicion: 10,
      nombre: 'Kling AI 3.0',
      empresa: 'Kuaishou Technology',
      descripcion: 'Generador de vídeo con secuencias multi-plano, timeline de audio compartido y diálogo nativo en 5 idiomas. Kling 3.0 Omni gana protagonismo tras la salida de Sora.',
      razonTrending: 'Entra en el ranking esta semana como beneficiario directo de la discontinuación de Sora como app de consumo. Kling 3.0 Omni destaca por soporte de secuencias multi-plano con audio compartido y diálogo nativo en 5 idiomas — funciones que lo equiparan a herramientas de producción profesional a un precio accesible.',
      categoria: 'Video',
      url: 'https://klingai.com',
      tendencia: 'nueva',
      cambio: 0,
      precio: 'Gratis / Pro 8 $/mes / Premier 38 $/mes',
    },
  ],
};
