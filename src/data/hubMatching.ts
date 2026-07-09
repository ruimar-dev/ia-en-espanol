// Coincidencia entre un tag de herramienta de un artículo y una herramienta del catálogo.
// Compartida por /herramientas/[slug] (getStaticPaths) y /herramientas (índice), de modo
// que "qué herramientas tienen hub" se calcula igual en ambos sitios.
//
// Acepta: nombre exacto, variantes de marca (Google Gemini → Gemini, Perplexity AI →
// Perplexity), versiones numéricas (Stable Diffusion 3 → Stable Diffusion) y nombres
// más largos del producto (Runway ⊂ RunwayML).
// Rechaza: sub-modelos con tier (Gemini 2.5 Pro, Claude Sonnet 4.6), que son menciones
// de pasada del motor, no del producto que da nombre al hub.
import { herramientas } from './herramientas';

const TIER_WORDS = new Set(['pro', 'sonnet', 'opus', 'haiku', 'flash', 'mini', 'turbo', 'max', 'ultra', 'plus', 'nano', 'lite', 'thinking', 'instant', 'preview', 'reasoner']);
const BRAND_WORDS = new Set(['google', 'openai', 'microsoft', 'anthropic', 'adobe', 'meta', 'ai', 'the']);

const norm = (s: string) => s.toLowerCase().trim().replace(/\s+/g, ' ');
const allNombres = new Set(herramientas.map((h) => norm(h.nombre)));

const subseqIndex = (hay: string[], needle: string[]): number => {
  if (needle.length === 0 || needle.length > hay.length) return -1;
  for (let i = 0; i + needle.length <= hay.length; i++) {
    if (needle.every((tok, j) => hay[i + j] === tok)) return i;
  }
  return -1;
};

export const tagMatchesTool = (tag: string, tool: string): boolean => {
  const h = norm(tag);
  const n = norm(tool);
  if (h === n) return true;
  const ht = h.split(' ');
  const nt = n.split(' ');
  const idx = subseqIndex(ht, nt);
  if (idx !== -1) {
    // El nombre de la herramienta aparece dentro del tag: solo es válido si los tokens
    // sobrantes son de marca/"ai" o versiones numéricas — nunca un tier de sub-modelo.
    const extra = ht.filter((_, i) => i < idx || i >= idx + nt.length);
    return extra.every((t) => !TIER_WORDS.has(t) && (BRAND_WORDS.has(t) || /\d/.test(t)));
  }
  // Si el tag coincide exactamente con el nombre de OTRA herramienta del catálogo, es un
  // producto distinto (p. ej. "Claude" vs "Claude Code") y no debe caer en el caso inverso.
  if (allNombres.has(h)) return false;
  // Caso inverso: el nombre de la herramienta contiene el tag (Runway ⊂ RunwayML).
  return h.length >= 4 && n.includes(h);
};
