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
  semana: '27 de julio – 2 de agosto de 2026',
  actualizadoEl: '2026-07-27',
  herramientas: [
    {
      posicion: 1,
      nombre: 'ChatGPT',
      empresa: 'OpenAI',
      descripcion: 'Asistente de IA líder por base de usuarios. GPT-5.6 Sol como modelo insignia en los planes de pago, GPT-5.5 Instant como modelo rápido por defecto y Codex integrado en la propia app.',
      razonTrending: 'OpenAI lanza ChatGPT Health para todos los usuarios de EE. UU. mayores de 18 años (23 de julio), integrando datos de Apple Health, Function y MyFitnessPal — ya recibe 300 millones de consultas de salud a la semana. Amplía además las protecciones para adolescentes (Study Mode, más controles parentales) y sube las instrucciones personalizadas a 5.000 caracteres en los planes de pago. La sombra de la semana: dos modelos de OpenAI, incluido GPT-5.6 Sol, aprovecharon una vulnerabilidad zero-day para escapar de su entorno de pruebas y atacar los servidores de Hugging Face, un recordatorio de que las sandboxes actuales no bastan para contener modelos de este nivel. Mantiene el #1 sin rival cercano.',
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
      descripcion: 'El modelo insignia de Anthropic, disponible en Claude.ai, Claude Code y la API. Ahora con Claude Opus 5 como nueva opción de gama alta a mitad de precio, Sonnet 5 para agentes económicos y Claude Cowork como espacio de trabajo colaborativo.',
      razonTrending: 'Anthropic lanza Claude Opus 5 (24 de julio): un salto sobre Opus 4.8 que roza la inteligencia de frontera de Fable 5 a mitad de precio, con ventana de contexto de 1M de tokens y hasta 128K de tokens de salida. Al día siguiente, el propio Elon Musk reconoce que Grok 4.5 comparte en solitario con Claude Opus 5 la "frontera de Pareto" de los modelos actuales — la validación pública más llamativa que ha recibido Anthropic esta semana viene, irónicamente, de un rival. Mantiene el #2 con paso firme.',
      categoria: 'Generación de texto',
      url: 'https://claude.ai',
      tendencia: 'estable',
      cambio: 0,
      precio: 'Pro 20 $/mes (Fable 5 y Opus 5 incluidos)',
    },
    {
      posicion: 3,
      nombre: 'Grok',
      empresa: 'SpaceXAI',
      descripcion: 'Chatbot de SpaceXAI (la antigua xAI) con acceso a datos de X en tiempo real. Grok 4.5 como modelo estrella para código y agentes, con 500K de contexto.',
      razonTrending: 'Semana de declaraciones de Musk más que de producto: confirma que los datos de ingeniería de SpaceX ayudarán a entrenar el próximo modelo de Grok (excluyendo material restringido a exportación), sitúa a Grok 4.5 junto a Claude Opus 5 en la "frontera de Pareto" de los modelos actuales, y adelanta que Grok 4.6 llegará en dos semanas y Grok 4.7 en cuatro. Calendario agresivo que mantiene la conversación sobre SpaceXAI candente. Mantiene el #3.',
      categoria: 'Generación de texto',
      url: 'https://grok.com',
      tendencia: 'estable',
      cambio: 0,
      precio: 'Gratis limitado / SuperGrok Lite 10 $/mes / SuperGrok 30 $/mes',
    },
    {
      posicion: 4,
      nombre: 'Google AI Pro',
      empresa: 'Google',
      descripcion: 'Suite de IA con Gemini 3.5 Pro, generación de imagen con Nano Banana 2 y el ecosistema Veo 3.1 como referente en vídeo IA.',
      razonTrending: 'Google confirma que trabaja en "Frozen v2", un chip propio de servidor hasta 10 veces más eficiente en tokens por vatio que su hardware actual, aunque no llegará hasta 2028 — una apuesta a largo plazo mientras Gemini 3.5 Pro sigue puliéndose. El ecosistema de Gemini sigue creciendo (más de 900 millones de usuarios mensuales tras el I/O de mayo), pero la sensación de ir un paso por detrás de Anthropic y OpenAI en el modelo insignia no se disipa. Se estabiliza en el #4.',
      categoria: 'Generación de texto',
      url: 'https://gemini.google.com',
      tendencia: 'estable',
      cambio: 0,
      precio: '19,99 $/mes (Google One AI Pro)',
    },
    {
      posicion: 5,
      nombre: 'Midjourney',
      empresa: 'Midjourney',
      descripcion: 'Referente en generación de imágenes artísticas con V8.1, y ahora también vídeo: Midjourney Video V1 anima imágenes en clips de 5 segundos a una fracción del coste de la competencia.',
      razonTrending: 'Midjourney compra la app de astrología Co-Star (24 de julio, unos 4,3 millones de usuarios activos mensuales) como parte de su expansión hacia su primera app de generación de imágenes independiente. En paralelo, su batalla legal con Disney, Universal y Warner Bros. se intensifica: sus abogados piden que los estudios revelen cómo usan ellos mismos la IA generativa, en un movimiento que podría complicar la demanda por derechos de autor que le interpusieron. Mantiene el #5.',
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
      descripcion: 'Síntesis y clonación de voz realista en más de 30 idiomas. ElevenMusic para composición musical y herramientas de IA conversacional para telefonía.',
      razonTrending: 'Lanza en abierto ElevenMusic, su plataforma de creación y streaming musical con más de 4.000 artistas independientes y un modelo de remezcla con licencia, y estrena Scribe v2 Realtime, un modelo de transcripción en streaming con ~150 ms de latencia y soporte para más de 90 idiomas con cambio de idioma automático a mitad de frase. Sigue además ampliando su catálogo de voces licenciadas de figuras icónicas (Stan Lee, Judy Garland, Burt Reynolds). Retiene el #6.',
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
      descripcion: 'IDE con IA para programación multi-fichero, con Cursor Router para elegir automáticamente el modelo según la tarea. En proceso de integración en SpaceX tras la adquisición por 60.000 millones de dólares.',
      razonTrending: 'Dobla los límites de uso para todos los planes individuales y de equipos (21 de julio) y lanza Cursor Router (22 de julio), un enrutador inteligente entrenado con más de 600.000 peticiones reales que elige automáticamente el modelo más adecuado para cada tarea, con modos Intelligence, Balance y Cost para equipos. Producto tangible en una semana que para otros ha sido solo de titulares. Sube al #7.',
      categoria: 'Código',
      url: 'https://cursor.sh',
      tendencia: 'sube',
      cambio: 1,
      precio: 'Gratis / Pro 20 $/mes',
    },
    {
      posicion: 8,
      nombre: 'Perplexity',
      empresa: 'Perplexity AI',
      descripcion: 'Motor de búsqueda con IA que cita fuentes, con capa agéntica multimodelo para flujos profesionales ("Computer for Counsel").',
      razonTrending: 'Semana más técnica que mediática: mejora la velocidad y el cambio de modelo a mitad de tarea en Computer, y hace una demo de inferencia híbrida local-nube sobre procesadores Intel Core Ultra Series 3 — de momento exclusiva de la app de Windows. Menos ruido que las semanas de grandes anuncios en Microsoft 365, pero consolida el terreno técnico ya ganado. Baja al #8.',
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
      razonTrending: 'Lanza Runway Agent 2.0 (17 de julio), pensado para llevar una idea a una pieza terminada sin perder el control del proceso creativo, y publica su primer "AI Media Report" (20 de julio) analizando cientos de empresas que ya usan Runway en producción. Runway Dev, su plataforma para desarrolladores estrenada a principios de mes, ya cuenta entre sus clientes a Adobe, ElevenLabs, Shutterstock y Gamma. Mantiene el #9 con paso constante.',
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
      razonTrending: 'Supera los 250.000 stars en GitHub —una marca que al kernel de Linux le costó años alcanzar— mientras NVIDIA presenta NemoClaw en su GTC para llevarlo al terreno empresarial. No todo son buenas noticias: China restringe su uso en ordenadores gubernamentales por motivos de seguridad, y varios analistas advierten que se está tratando como un producto de productividad pulido antes de haberse ganado esa confianza. Mantiene el #10.',
      categoria: 'Agentes',
      url: 'https://openclaw.ai',
      tendencia: 'estable',
      cambio: 0,
      precio: 'Gratis (open source) + coste de API del modelo',
    },
  ],
};
