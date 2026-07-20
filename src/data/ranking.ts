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
  semana: '20 – 26 de julio de 2026',
  actualizadoEl: '2026-07-20',
  herramientas: [
    {
      posicion: 1,
      nombre: 'ChatGPT',
      empresa: 'OpenAI',
      descripcion: 'Asistente de IA líder por base de usuarios. GPT-5.6 como modelo insignia en los planes de pago, GPT-5.5 Instant como modelo rápido por defecto y Codex integrado en la propia app.',
      razonTrending: 'Semana de pulido más que de titulares: búsqueda unificada para chats, proyectos, imágenes y documentos en web, iOS y Android; instrucciones personalizadas ampliadas a 5.000 caracteres en Plus/Business/Enterprise; y GPT-5.5 Instant Mini sustituye a GPT-5.3 como modelo de reserva al agotar el límite. Además se confirma el cierre de Atlas, el navegador con IA, el 9 de agosto, con sus capacidades ya integradas en ChatGPT y Codex. Mantiene el #1 sin rival cercano.',
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
      razonTrending: 'Anthropic apuesta por profundidad de producto: lanza Claude for Teachers con acceso gratuito a profesores verificados de K-12 en EE. UU., rediseña la memoria con entradas individuales categorizadas (adiós al resumen diario) y estrena el dashboard "Reflect" para visualizar tus propios patrones de uso. También suma configuración HIPAA de autoservicio para Enterprise y API. Mantiene el #2 con paso firme.',
      categoria: 'Generación de texto',
      url: 'https://claude.ai',
      tendencia: 'estable',
      cambio: 0,
      precio: 'Pro 20 $/mes (Fable 5 incluido)',
    },
    {
      posicion: 3,
      nombre: 'Grok',
      empresa: 'SpaceXAI',
      descripcion: 'Chatbot de SpaceXAI (la antigua xAI) con acceso a datos de X en tiempo real. Grok 4.5 como nuevo modelo estrella para código y agentes, con 500K de contexto.',
      razonTrending: 'Semana con luces y sombras: investigadores descubren que la CLI Grok Build subía repositorios enteros de usuarios a servidores de SpaceX sin avisar; la respuesta llega rápido, con el código liberado en abierto y la promesa de borrar los datos guardados. Pese al susto de privacidad, el impulso de Grok 4.5 —lanzado la semana pasada— sigue intacto, y el tropiezo de Google le abre hueco para subir al #3.',
      categoria: 'Generación de texto',
      url: 'https://grok.com',
      tendencia: 'sube',
      cambio: 1,
      precio: 'Gratis limitado / SuperGrok Lite 10 $/mes / SuperGrok 30 $/mes',
    },
    {
      posicion: 4,
      nombre: 'Google AI Pro',
      empresa: 'Google',
      descripcion: 'Suite de IA con Gemini 3.5 Pro, generación de imagen con Nano Banana 2 y el ecosistema Veo 3.1 como referente en vídeo IA.',
      razonTrending: 'Bloomberg confirma lo que se temía: Gemini 3.5 Pro, el modelo insignia, llega con retraso porque Google sigue puliendo sus capacidades de código, y crece la preocupación interna de perder la ventaja frente a Anthropic y OpenAI. En paralelo sube el límite de "Rellenar con Gemini" en Sheets para licencias AI Expanded Access desde el 15 de julio, una mejora menor que no compensa el parón del modelo grande. Baja al #4.',
      categoria: 'Generación de texto',
      url: 'https://gemini.google.com',
      tendencia: 'baja',
      cambio: 1,
      precio: '19,99 $/mes (Google One AI Pro)',
    },
    {
      posicion: 5,
      nombre: 'Midjourney',
      empresa: 'Midjourney',
      descripcion: 'Referente en generación de imágenes artísticas con V8.1, y ahora también vídeo: Midjourney Video V1 anima imágenes en clips de 5 segundos a una fracción del coste de la competencia.',
      razonTrending: 'El preview de V8.2 recibe otro retoque y la comunidad da por hecho que el lanzamiento público está a días vista: más nitidez y mejor adherencia al prompt. En paralelo, la batalla legal se calienta: Midjourney pide en los tribunales que Disney, Universal y Warner Bros. desvelen cómo usan ellos mismos la IA generativa, tras la demanda por derechos de autor que le interpusieron. Mantiene el #5.',
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
      descripcion: 'Síntesis y clonación de voz realista en más de 30 idiomas. Music v2 para composición musical y herramientas de IA conversacional para telefonía.',
      razonTrending: 'Bloomberg revela conversaciones para una venta de acciones de empleados que valoraría la compañía en unos 22.000 millones de dólares, casi el doble que en su ronda de febrero. A la vez, firma con Netflix y el legado de Gene Wilder para recrear su voz en un reality temático de Willy Wonka, el tipo de proyecto mediático que demuestra hasta dónde ha llegado su tecnología de voz. Retiene el #6.',
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
      descripcion: 'Motor de búsqueda con IA que cita fuentes, con capa agéntica multimodelo para flujos profesionales ("Computer for Counsel").',
      razonTrending: 'La semana más cargada de producto en meses: lleva su asistente "Computer" a Word, Excel, PowerPoint, Outlook y Teams dentro de Microsoft 365, lanza SPACE (un sandbox de seguridad para que sus agentes operen con plenas capacidades) y convierte su API en una plataforma completa para construir agentes, con módulos de búsqueda, embeddings y ejecución de código. Sube al #7.',
      categoria: 'Generación de texto',
      url: 'https://perplexity.ai',
      tendencia: 'sube',
      cambio: 1,
      precio: 'Gratis / Pro 20 $/mes / Max 200 $/mes',
    },
    {
      posicion: 8,
      nombre: 'Cursor',
      empresa: 'Anysphere',
      descripcion: 'IDE con IA para programación multi-fichero, potenciado por Claude y GPT-5.5. En proceso de integración en SpaceX tras la adquisición por 60.000 millones de dólares.',
      razonTrending: 'Semana tranquila de producto mientras el foco mediático se lo lleva Perplexity: el modelo conjunto con SpaceXAI ya salió la semana pasada —fue, de hecho, el propio Grok 4.5— y ahora toca esperar al cierre formal de la adquisición, previsto para el tercer trimestre. Sin anuncios propios estos días, baja al #8.',
      categoria: 'Código',
      url: 'https://cursor.sh',
      tendencia: 'baja',
      cambio: 1,
      precio: 'Gratis / Pro 20 $/mes',
    },
    {
      posicion: 9,
      nombre: 'RunwayML',
      empresa: 'Runway',
      descripcion: 'Suite profesional de vídeo IA con Gen-4.5 propio y acceso integrado a Veo 3 y Veo 3.1 de Google directamente en la plataforma.',
      razonTrending: 'Mes cargado de anuncios: estrena Runway Dev, una plataforma pensada para desarrolladores y equipos empresariales; abre su primera oficina europea en París con 30 millones de dólares de inversión inicial; firma una alianza creativa con Bertelsmann; y suma Nano Banana 2 Lite y Seedream 5.0 Lite a su catálogo de modelos. Mantiene el #9 con paso constante.',
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
      razonTrending: 'Sigue puliendo la base técnica sin grandes titulares: la beta 2026.7.1 suma nuevos modelos y proveedores —incluido Claude Sonnet 5— con GPT-5.6 como opción por defecto en instalaciones nuevas, y añade dictado por voz desde el Apple Watch. Consolida el #10 con crecimiento silencioso pero sostenido.',
      categoria: 'Agentes',
      url: 'https://openclaw.ai',
      tendencia: 'estable',
      cambio: 0,
      precio: 'Gratis (open source) + coste de API del modelo',
    },
  ],
};
