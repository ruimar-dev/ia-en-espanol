import type { Categoria } from '../content/config';

export interface Herramienta {
  slug: string;
  nombre: string;
  descripcion: string;
  categoria: Categoria;
  rating: number;
  logo?: string;
  url?: string;
  afiliado?: string;
}

export const herramientas: Herramienta[] = [
  // Generación de texto
  { slug: 'writesonic', nombre: 'Writesonic', descripcion: 'Plataforma de copywriting con IA para artículos SEO, anuncios y contenido de marketing. Genera borradores largos en segundos.', categoria: 'generacion-texto', rating: 4.2, logo: '/images/logos/writesonic.svg', url: 'https://writesonic.com?fp_ref=sergio20', afiliado: 'https://writesonic.com?fp_ref=sergio20' },
  { slug: 'chatgpt', nombre: 'ChatGPT', descripcion: 'El chatbot de IA más popular. Ideal para escritura, análisis y programación en lenguaje natural.', categoria: 'generacion-texto', rating: 4.7, logo: '/images/logos/chatgpt.svg', url: 'https://chatgpt.com' },
  { slug: 'claude', nombre: 'Claude', descripcion: 'Asistente de Anthropic con excelente razonamiento, contexto largo hasta 1M tokens y seguimiento de instrucciones.', categoria: 'generacion-texto', rating: 4.8, logo: '/images/logos/claude.svg', url: 'https://claude.ai' },
  { slug: 'gemini', nombre: 'Gemini', descripcion: 'Modelo de IA de Google con integración nativa en Gmail, Docs y el buscador.', categoria: 'generacion-texto', rating: 4.4, logo: '/images/logos/gemini.svg', url: 'https://gemini.google.com' },
  { slug: 'perplexity', nombre: 'Perplexity', descripcion: 'Motor de búsqueda con IA que cita fuentes. Perfecto para investigación y verificación de datos.', categoria: 'generacion-texto', rating: 4.5, logo: '/images/logos/perplexity.svg', url: 'https://perplexity.ai' },
  { slug: 'grok', nombre: 'Grok', descripcion: 'IA de xAI integrada en X (Twitter) con acceso a publicaciones en tiempo real. Incluido en X Premium.', categoria: 'generacion-texto', rating: 4.3, logo: '/images/logos/grok.svg', url: 'https://grok.com' },
  { slug: 'deepseek-r1', nombre: 'DeepSeek R1', descripcion: 'Modelo open source chino que rivaliza con GPT-4o en razonamiento y código a una fracción del coste. Ejecutable localmente.', categoria: 'generacion-texto', rating: 4.5, logo: '/images/logos/deepseek.svg', url: 'https://chat.deepseek.com' },
  // Generación de imagen
  { slug: 'midjourney', nombre: 'Midjourney', descripcion: 'El mejor generador de imágenes artísticas. Calidad excepcional con consistencia de personajes en v7.', categoria: 'generacion-imagen', rating: 4.9, logo: '/images/logos/midjourney.svg', url: 'https://midjourney.com' },
  { slug: 'dall-e-3', nombre: 'DALL-E 3', descripcion: 'Generador de imágenes de OpenAI integrado en ChatGPT. Muy bueno siguiendo instrucciones precisas.', categoria: 'generacion-imagen', rating: 4.5, logo: '/images/logos/dalle3.svg', url: 'https://openai.com' },
  { slug: 'adobe-firefly', nombre: 'Adobe Firefly', descripcion: 'IA de imágenes de Adobe entrenada con contenido con licencia. Integración directa en Photoshop e Illustrator.', categoria: 'generacion-imagen', rating: 4.4, logo: '/images/logos/adobe-firefly.svg', url: 'https://firefly.adobe.com' },
  { slug: 'flux', nombre: 'Flux', descripcion: 'Modelo open source de Black Forest Labs. Calidad comparable a Midjourney, ejecutable localmente sin coste.', categoria: 'generacion-imagen', rating: 4.6, logo: '/images/logos/flux.svg', url: 'https://fal.ai/models/fal-ai/flux' },
  { slug: 'ideogram', nombre: 'Ideogram', descripcion: 'Especializado en generar texto dentro de imágenes. Excelente para miniaturas, logotipos y pósters.', categoria: 'generacion-imagen', rating: 4.5, logo: '/images/logos/ideogram.svg', url: 'https://ideogram.ai' },
  { slug: 'leonardoai', nombre: 'Leonardo.ai', descripcion: 'Plataforma de generación de imágenes muy usada en concept art, videojuegos y diseño de personajes.', categoria: 'generacion-imagen', rating: 4.5, logo: '/images/logos/leonardo.svg', url: 'https://leonardo.ai' },
  { slug: 'stable-diffusion', nombre: 'Stable Diffusion', descripcion: 'Modelo open source para generación de imágenes. Corre localmente, sin costes ni censura.', categoria: 'generacion-imagen', rating: 4.3, logo: '/images/logos/stable-diffusion.svg' },
  // Código
  { slug: 'cursor', nombre: 'Cursor', descripcion: 'IDE basado en VS Code reconstruido para IA. El mejor para ediciones multi-fichero y refactorizaciones.', categoria: 'codigo', rating: 4.8, logo: '/images/logos/cursor.svg', url: 'https://cursor.sh' },
  { slug: 'github-copilot', nombre: 'GitHub Copilot', descripcion: 'Plugin de programación para VS Code y JetBrains. Estándar en empresas por su integración con GitHub.', categoria: 'codigo', rating: 4.6, logo: '/images/logos/copilot.svg', url: 'https://github.com/features/copilot' },
  { slug: 'windsurf', nombre: 'Windsurf', descripcion: 'IDE con IA de Codeium con flujo en cascada. La IA entiende el contexto completo del proyecto y actúa de forma autónoma.', categoria: 'codigo', rating: 4.6, logo: '/images/logos/windsurf.svg', url: 'https://windsurf.ai' },
  { slug: 'boltnew', nombre: 'Bolt.new', descripcion: 'Construye aplicaciones web completas escribiendo solo texto. Ideal para no programadores que quieren crear productos.', categoria: 'codigo', rating: 4.4, logo: '/images/logos/bolt-new.svg', url: 'https://bolt.new' },
  { slug: 'codeium', nombre: 'Codeium', descripcion: 'Alternativa gratuita a Copilot. Buena calidad para completado de código en múltiples lenguajes.', categoria: 'codigo', rating: 4.2, logo: '/images/logos/codeium.svg', url: 'https://codeium.com' },
  // Audio
  { slug: 'elevenlabs', nombre: 'ElevenLabs', descripcion: 'La mejor IA de síntesis de voz. Clonación realista, múltiples idiomas y API de voz en tiempo real.', categoria: 'audio', rating: 4.8, logo: '/images/logos/elevenlabs.svg', url: 'https://try.elevenlabs.io/5pqit62qinao', afiliado: 'https://try.elevenlabs.io/5pqit62qinao' },
  { slug: 'suno', nombre: 'Suno', descripcion: 'Genera música completa (letra, melodía, producción) a partir de un prompt de texto. Canciones de hasta 4 minutos.', categoria: 'audio', rating: 4.5, logo: '/images/logos/suno.svg', url: 'https://suno.com' },
  { slug: 'udio', nombre: 'Udio', descripcion: 'Alternativa a Suno con diferente estilo y calidad de generación musical.', categoria: 'audio', rating: 4.4, logo: '/images/logos/udio.svg', url: 'https://udio.com' },
  // Vídeo
  { slug: 'runwayml', nombre: 'RunwayML', descripcion: 'Suite de generación y edición de vídeo con IA. Referencia profesional para texto-a-vídeo e imagen-a-vídeo.', categoria: 'video', rating: 4.6, logo: '/images/logos/runwayml.svg', url: 'https://runwayml.com' },
  { slug: 'kling', nombre: 'Kling', descripcion: 'Generador de vídeo con hasta 3 minutos de duración y movimiento físico muy realista. Precio competitivo.', categoria: 'video', rating: 4.5, logo: '/images/logos/kling.svg', url: 'https://kling.kuaishou.com' },
  { slug: 'sora', nombre: 'Sora', descripcion: 'Generador de vídeo de OpenAI. Clips de hasta 20 segundos con física realista y coherencia visual alta.', categoria: 'video', rating: 4.3, logo: '/images/logos/sora.svg', url: 'https://sora.com' },
  { slug: 'heygen', nombre: 'HeyGen', descripcion: 'Crea vídeos con avatares IA realistas. Ideal para doblaje automático, presentaciones corporativas y marketing.', categoria: 'video', rating: 4.5, logo: '/images/logos/heygen.svg', url: 'https://heygen.com' },
  { slug: 'pika', nombre: 'Pika', descripcion: 'Generador de vídeo accesible con herramientas de edición IA. Convierte imágenes en vídeo y añade efectos.', categoria: 'video', rating: 4.2, logo: '/images/logos/pika.svg', url: 'https://pika.art' },
  // Productividad
  { slug: 'notebooklm', nombre: 'NotebookLM', descripcion: 'Asistente de investigación de Google que analiza tus documentos y genera podcasts de audio automáticamente. Gratis.', categoria: 'productividad', rating: 4.6, logo: '/images/logos/notebooklm.svg', url: 'https://notebooklm.google.com' },
  { slug: 'notion-ai', nombre: 'Notion AI', descripcion: 'IA integrada en Notion para resumir, generar y editar contenido en tus documentos y bases de datos.', categoria: 'productividad', rating: 4.3, logo: '/images/logos/notion.svg', url: 'https://notion.so' },
  { slug: 'gamma', nombre: 'Gamma', descripcion: 'Crea presentaciones, documentos y páginas web con IA en segundos. Alternativa a PowerPoint impulsada por IA.', categoria: 'productividad', rating: 4.4, logo: '/images/logos/gamma.svg', url: 'https://gamma.app' },
  { slug: 'otterai', nombre: 'Otter.ai', descripcion: 'Transcripción automática de reuniones con resúmenes, puntos clave y búsqueda.', categoria: 'productividad', rating: 4.4, logo: '/images/logos/otter.svg', url: 'https://otter.ai' },
];
