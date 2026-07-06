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
  semana: '6 – 12 de julio de 2026',
  actualizadoEl: '2026-07-06',
  herramientas: [
    {
      posicion: 1,
      nombre: 'ChatGPT',
      empresa: 'OpenAI',
      descripcion: 'Asistente de IA líder por base de usuarios. GPT-5.5 Instant para el público general y Codex Remote en todos los planes para programación asíncrona.',
      razonTrending: 'Semana sin lanzamientos: los titulares de OpenAI fueron políticos (propuesta de donar el 5% de su capital a un fondo soberano de EE.UU.) y un primer vistazo al hardware dedicado de Codex. Mantiene el #1 por inercia de uso, pero el foco de la semana se lo llevó la competencia.',
      categoria: 'Generación de texto',
      url: 'https://chatgpt.com',
      tendencia: 'estable',
      cambio: 0,
      precio: 'Gratis / Plus 20 $/mes / Go 8 $/mes',
    },
    {
      posicion: 2,
      nombre: 'Claude Fable 5',
      empresa: 'Anthropic',
      descripcion: 'El nuevo modelo insignia de Anthropic, de vuelta tras semanas suspendido por controles de exportación. Disponible en Claude.ai, Claude Code y la API, con nuevo clasificador de seguridad anti-jailbreak.',
      razonTrending: 'La semana es de Anthropic: el Gobierno de EE.UU. levanta las restricciones sobre Fable 5 y Mythos 5 (30 de junio) y el modelo vuelve a estar disponible globalmente desde el 1 de julio. Además, Sonnet 5 se lanza como opción más barata para agentes y se negocia un chip propio con Samsung. Única nota negativa: Alibaba prohíbe a sus empleados usar Claude Code. Sube al #2.',
      categoria: 'Generación de texto',
      url: 'https://claude.ai',
      tendencia: 'sube',
      cambio: 1,
      precio: 'Pro 20 $/mes (Fable 5 incluido)',
    },
    {
      posicion: 3,
      nombre: 'Google AI Pro',
      empresa: 'Google',
      descripcion: 'Suite de IA con Gemini 3.5 Pro, generación de imagen con Nano Banana 2 y el ecosistema Veo 3.1 como referente en vídeo IA.',
      razonTrending: 'Buena semana de producto: Nano Banana 2 Lite llega como generador de imágenes más rápido y barato, Gemini Spark (el asistente agéntico) aterriza en Mac y NotebookLM estrena resúmenes en vídeo estilo TikTok. Aun así, el regreso de Fable 5 eclipsa el momento de Google y cede el #2.',
      categoria: 'Generación de texto',
      url: 'https://gemini.google.com',
      tendencia: 'baja',
      cambio: 1,
      precio: '19,99 $/mes (Google One AI Pro)',
    },
    {
      posicion: 4,
      nombre: 'Midjourney',
      empresa: 'Midjourney',
      descripcion: 'Referente en generación de imágenes artísticas con V8.1, y ahora también vídeo: Midjourney Video V1 anima imágenes en clips de 5 segundos a una fracción del coste de la competencia.',
      razonTrending: 'Sin producto nuevo esta semana, pero con protagonismo: Midjourney exige a los estudios de Hollywood transparencia sobre su uso de IA en pleno litigio por derechos de autor. El gancho de Video V1 (25× más barato que la competencia) sigue atrayendo suscriptores. Mantiene el #4.',
      categoria: 'Generación de imagen',
      url: 'https://midjourney.com',
      tendencia: 'estable',
      cambio: 0,
      precio: 'Desde 10 $/mes',
    },
    {
      posicion: 5,
      nombre: 'Grok',
      empresa: 'xAI',
      descripcion: 'Chatbot de xAI con acceso a datos de X en tiempo real. Grok 4.3 disponible en Amazon Bedrock, add-in gratuito para Microsoft 365 y Grok Imagine Video 1.5 global.',
      razonTrending: 'Semana de consolidación tras la expansión de la anterior (Bedrock, Microsoft 365, Video 1.5). Sin anuncios propios, xAI mantiene el #5 mientras digiere su despliegue empresarial más agresivo hasta la fecha.',
      categoria: 'Generación de texto',
      url: 'https://grok.com',
      tendencia: 'estable',
      cambio: 0,
      precio: 'Incluido en X Premium (~8-12 €/mes en web)',
    },
    {
      posicion: 6,
      nombre: 'ElevenLabs',
      empresa: 'ElevenLabs',
      descripcion: 'Síntesis y clonación de voz realista en más de 30 idiomas. Music v2 para composición musical y herramientas de IA conversacional para telefonía.',
      razonTrending: 'Semana tranquila sin anuncios, pero sin rival directo de peso en síntesis de voz profesional. La posición se sostiene por dominio de categoría más que por novedades.',
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
      descripcion: 'IDE con IA para programación multi-fichero, potenciado por Claude y GPT-5.5. En proceso de integración en SpaceX tras la adquisición por 60.000 millones de dólares.',
      razonTrending: 'La digestión de la compra por SpaceX continúa, y esta semana se filtra que SpaceX prepara un dispositivo de IA propio con aspecto de teléfono — más señales de que Cursor será pieza de un ecosistema mayor. La incertidumbre sobre la neutralidad de modelos sigue sin resolverse. Mantiene el #7.',
      categoria: 'Código',
      url: 'https://cursor.sh',
      tendencia: 'estable',
      cambio: 0,
      precio: 'Gratis / Pro 20 $/mes',
    },
    {
      posicion: 8,
      nombre: 'Perplexity',
      empresa: 'Perplexity AI',
      descripcion: 'Motor de búsqueda con IA que cita fuentes, con capa agéntica multimodelo para flujos profesionales ("Computer for Counsel").',
      razonTrending: 'Segunda semana consecutiva sin novedades para el usuario general, mientras Google refuerza AI Mode en búsqueda. El foco B2B legal es prometedor pero no mueve el producto de consumo. Mantiene el #8 por poco.',
      categoria: 'Generación de texto',
      url: 'https://perplexity.ai',
      tendencia: 'estable',
      cambio: 0,
      precio: 'Gratis / Pro 20 $/mes / Max 200 $/mes',
    },
    {
      posicion: 9,
      nombre: 'RunwayML',
      empresa: 'Runway',
      descripcion: 'Suite profesional de vídeo IA con Gen-4.5 propio y acceso integrado a Veo 3 y Veo 3.1 de Google directamente en la plataforma.',
      razonTrending: 'Sigue absorbiendo a los usuarios huérfanos de Sora gracias a la combinación Gen-4.5 + Veo 3.1, la más completa del mercado profesional. Sin anuncios esta semana, mantiene el #9.',
      categoria: 'Video',
      url: 'https://runwayml.com',
      tendencia: 'estable',
      cambio: 0,
      precio: 'Desde 15 $/mes',
    },
    {
      posicion: 10,
      nombre: 'OpenClaw',
      empresa: 'Comunidad open source',
      descripcion: 'El agente de IA personal open source que arrasó en internet este año. Se conecta a tus apps y herramientas vía OpenClaw Gateway y ejecuta tareas por ti; ahora también desde el móvil.',
      razonTrending: 'Entra en el ranking tras lanzar sus apps oficiales para Android e iOS (30 de junio), que permiten manejar tus agentes desde el bolsillo emparejando el móvil con el Gateway. El fenómeno viral del año en agentes personales da el salto definitivo al gran público — hay quien ya lo usa hasta para ligar.',
      categoria: 'Agentes',
      url: 'https://openclaw.ai',
      tendencia: 'nueva',
      cambio: 0,
      precio: 'Gratis (open source) + coste de API del modelo',
    },
  ],
};
