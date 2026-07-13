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
  semana: '13 – 19 de julio de 2026',
  actualizadoEl: '2026-07-13',
  herramientas: [
    {
      posicion: 1,
      nombre: 'ChatGPT',
      empresa: 'OpenAI',
      descripcion: 'Asistente de IA líder por base de usuarios. GPT-5.6 como modelo insignia en los planes de pago, GPT-5.5 Instant como modelo rápido por defecto y Codex integrado en la propia app.',
      razonTrending: 'Semana cargada: GPT-5.6 llega a ChatGPT el 9 de julio como nuevo modelo insignia para Plus, Pro y Business; Codex y ChatGPT se fusionan en una sola super app; y se lanza ChatGPT Work para empresas (el mismo día que el Cowork de Anthropic). Afianza el #1 con la semana de producto más fuerte en meses.',
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
      descripcion: 'El modelo insignia de Anthropic, disponible en Claude.ai, Claude Code y la API. Sonnet 5 como opción más barata para agentes y Claude Cowork como espacio de trabajo colaborativo.',
      razonTrending: 'Anthropic encadena otra semana sólida: Claude Cowork llega a web y móvil el 9 de julio (compitiendo frontalmente con ChatGPT Work), firma un contrato de centros de datos de 19.000 millones de dólares con TeraWulf y trasciende que su facturación anualizada ya supera a la de OpenAI. Mantiene el #2.',
      categoria: 'Generación de texto',
      url: 'https://claude.ai',
      tendencia: 'estable',
      cambio: 0,
      precio: 'Pro 20 $/mes (Fable 5 incluido)',
    },
    {
      posicion: 3,
      nombre: 'Google AI Pro',
      empresa: 'Google',
      descripcion: 'Suite de IA con Gemini 3.5 Pro, generación de imagen con Nano Banana 2 y el ecosistema Veo 3.1 como referente en vídeo IA.',
      razonTrending: 'Semana discreta: sin lanzamientos de peso mientras OpenAI (GPT-5.6) y SpaceXAI (Grok 4.5) acaparan titulares. El ecosistema Gemini + Nano Banana 2 + Veo 3.1 sigue siendo el más completo del mercado y eso le basta para retener el #3, pero necesita un golpe de producto pronto.',
      categoria: 'Generación de texto',
      url: 'https://gemini.google.com',
      tendencia: 'estable',
      cambio: 0,
      precio: '19,99 $/mes (Google One AI Pro)',
    },
    {
      posicion: 4,
      nombre: 'Grok',
      empresa: 'SpaceXAI',
      descripcion: 'Chatbot de SpaceXAI (la antigua xAI) con acceso a datos de X en tiempo real. Grok 4.5 como nuevo modelo estrella para código y agentes, con 500K de contexto.',
      razonTrending: 'El lanzamiento de la semana: Grok 4.5 llega el 8 de julio con ambición de "clase Opus" en código y agentes, 500K de contexto y API a 2$/6$ por millón de tokens. La letra pequeña importa: en consumo solo está en SuperGrok Heavy (300 $/mes) y de momento no está disponible en la UE. Aun así, sube al #4.',
      categoria: 'Generación de texto',
      url: 'https://grok.com',
      tendencia: 'sube',
      cambio: 1,
      precio: 'Gratis limitado / SuperGrok Lite 10 $/mes / SuperGrok 30 $/mes',
    },
    {
      posicion: 5,
      nombre: 'Midjourney',
      empresa: 'Midjourney',
      descripcion: 'Referente en generación de imágenes artísticas con V8.1, y ahora también vídeo: Midjourney Video V1 anima imágenes en clips de 5 segundos a una fracción del coste de la competencia.',
      razonTrending: 'Enseña la V8.2 en acceso anticipado (flag --preview): más nitidez, mejor adherencia al prompt y un acabado más cinematográfico. Buena señal de producto, pero el huracán Grok 4.5 le quita una posición esta semana. Baja al #5.',
      categoria: 'Generación de imagen',
      url: 'https://midjourney.com',
      tendencia: 'baja',
      cambio: 1,
      precio: 'Desde 10 $/mes',
    },
    {
      posicion: 6,
      nombre: 'ElevenLabs',
      empresa: 'ElevenLabs',
      descripcion: 'Síntesis y clonación de voz realista en más de 30 idiomas. Music v2 para composición musical y herramientas de IA conversacional para telefonía.',
      razonTrending: 'Otra semana sin anuncios propios, pero su dominio en síntesis de voz profesional sigue sin rival directo. En un mercado donde todos los focos apuntan a los LLM, ElevenLabs retiene el #6 por pura solidez de categoría.',
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
      razonTrending: 'El lanzamiento de Grok 4.5 añade presión a la gran pregunta post-adquisición: con SpaceXAI teniendo ahora su propio modelo "clase Opus" para código, ¿seguirá Cursor ofreciendo Claude y GPT en igualdad de condiciones? Sin respuesta oficial todavía. Mantiene el #7 a la espera de señales.',
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
      razonTrending: 'Tercera semana consecutiva sin novedades para el usuario general, con Google apretando en búsqueda y ChatGPT absorbiendo casos de uso con GPT-5.6. El foco B2B legal sigue sin mover el producto de consumo. Mantiene el #8, pero la inercia empieza a pesar.',
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
      razonTrending: 'Sin anuncios esta semana, pero la combinación Gen-4.5 + Veo 3.1 sigue siendo la oferta más completa del vídeo profesional y continúa absorbiendo a los usuarios huérfanos de Sora. Mantiene el #9, con la V8.2 de Midjourney como amenaza a vigilar en la frontera imagen-vídeo.',
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
      razonTrending: 'Segunda semana en el ranking y las apps móviles (30 de junio) siguen tirando de la adopción: manejar tus agentes desde el bolsillo era la pieza que le faltaba al fenómeno open source del año. La comunidad mantiene el ritmo de skills y conectores nuevos. Consolida el #10.',
      categoria: 'Agentes',
      url: 'https://openclaw.ai',
      tendencia: 'estable',
      cambio: 0,
      precio: 'Gratis (open source) + coste de API del modelo',
    },
  ],
};
