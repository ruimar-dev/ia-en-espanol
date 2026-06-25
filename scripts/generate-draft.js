// @ts-check
'use strict';

const fs = require('fs');
const path = require('path');
const Anthropic = require('@anthropic-ai/sdk');

const BLOG_DIR = path.join(__dirname, '..', 'src', 'content', 'blog');
const PUBLIC_IMAGES_DIR = path.join(__dirname, '..', 'public', 'images');
const TOPICS_FILE = path.join(__dirname, 'topics.json');
const EXHAUSTED_FILE = path.join(__dirname, 'temas-agotados.txt');
const DRAFT_TOPIC_FILE = path.join(__dirname, '.draft-topic');

// Color gradients per category — matches the design system vars
const CATEGORY_COLORS = {
  'generacion-texto':  ['#7C3AED', '#4C1D95'],
  'generacion-imagen': ['#2563EB', '#1E40AF'],
  'codigo':            ['#16A34A', '#14532D'],
  'audio':             ['#EA580C', '#7C2D12'],
  'video':             ['#DC2626', '#7F1D1D'],
  'productividad':     ['#0D9488', '#064E3B'],
};

// Herramientas con programa de afiliados verificado
const AFFILIATE_LINKS = {
  'elevenlabs':    'https://try.elevenlabs.io/5pqit62qinao',
  'murf':          'https://murf.ai',
  'murf.ai':       'https://murf.ai',
  'adobe firefly': 'https://www.adobe.com/es/products/firefly.html',
  'firefly':       'https://www.adobe.com/es/products/firefly.html',
  'jasper':        'https://www.jasper.ai',
  'writesonic':    'https://writesonic.com?fp_ref=sergio20',
  'leonardo.ai':   'https://leonardo.ai',
  'leonardo':      'https://leonardo.ai',
  'notion':        'https://notion.so',
  'notion ai':     'https://notion.so',
  'otter.ai':      'https://otter.ai',
  'otter':         'https://otter.ai',
  'neuronwriter':  'https://app.neuronwriter.com/ar/6809702873b807e3a94ed0c0661d7298',
};

// ─── Classification ───────────────────────────────────────────────────────────

function classifyTopic(tema) {
  const lower = tema.toLowerCase();
  if (/\breview\b/.test(lower)) return 'review';
  if (/\bvs\b/.test(lower)) return 'comparativa';
  return 'guia';
}

// ─── SVG image generation (replaces Unsplash) ────────────────────────────────

function escapeXml(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function generateLocalSvg(slug, title, herramientas, category, tipo) {
  const [colorStart, colorEnd] = CATEGORY_COLORS[category] || ['#7C3AED', '#4C1D95'];
  const toolsStrip = herramientas.slice(0, 4).join(' · ');

  // Split title at ':' when present — gives natural main + subtitle structure
  const colonIdx = title.indexOf(':');
  let mainLine, secondLine;

  if (colonIdx > 3 && colonIdx < title.length - 2) {
    mainLine = title.slice(0, colonIdx).trim();
    const sub = title.slice(colonIdx + 1).trim();
    secondLine = sub.length > 44 ? sub.slice(0, 41) + '…' : sub;
  } else {
    // No colon: split long titles at nearest space to the midpoint
    if (title.length <= 36) {
      mainLine = title;
      secondLine = null;
    } else {
      const mid = Math.floor(title.length / 2);
      let splitAt = -1;
      for (let d = 0; d <= 14; d++) {
        if (title[mid + d] === ' ') { splitAt = mid + d; break; }
        if (d > 0 && title[mid - d] === ' ') { splitAt = mid - d; break; }
      }
      if (splitAt > 0) {
        mainLine = title.slice(0, splitAt).trim();
        const rest = title.slice(splitAt + 1).trim();
        secondLine = rest.length > 44 ? rest.slice(0, 41) + '…' : rest;
      } else {
        mainLine = title.slice(0, 36) + '…';
        secondLine = null;
      }
    }
  }

  // Font size adapts to main line length
  const mainFontSize = mainLine.length > 30 ? 60 : mainLine.length > 22 ? 68 : 76;

  // Y-coordinate layout
  let textElements = '';
  if (secondLine) {
    // Colon split or two-line title
    const y1 = 185;
    const y2 = y1 + mainFontSize + 14;
    const secondFontSize = colonIdx > 0 ? 34 : mainFontSize; // subtitle is lighter if from colon
    const secondOpacity = colonIdx > 0 ? '0.82' : '1';
    const yTools = y2 + secondFontSize + 55;
    const yDomain = yTools + (toolsStrip ? 68 : 0) + 10;

    textElements = `
  <text x="600" y="${y1}" font-family="system-ui,sans-serif" font-size="${mainFontSize}" font-weight="bold" fill="white" text-anchor="middle">${escapeXml(mainLine)}</text>
  <text x="600" y="${y2}" font-family="system-ui,sans-serif" font-size="${secondFontSize}" font-weight="${colonIdx > 0 ? '400' : 'bold'}" fill="white" fill-opacity="${secondOpacity}" text-anchor="middle">${escapeXml(secondLine)}</text>
${toolsStrip ? `  <text x="600" y="${yTools}" font-family="system-ui,sans-serif" font-size="27" fill="white" fill-opacity="0.65" text-anchor="middle">${escapeXml(toolsStrip)}</text>` : ''}
  <text x="600" y="${yDomain + (toolsStrip ? 68 : 0)}" font-family="system-ui,sans-serif" font-size="24" fill="white" fill-opacity="0.5" text-anchor="middle">iaenespanol.es</text>`;
  } else {
    // Single-line title
    const yTitle = 210;
    const yTools = yTitle + mainFontSize + 55;
    const yDomain = yTools + (toolsStrip ? 70 : 0);

    textElements = `
  <text x="600" y="${yTitle}" font-family="system-ui,sans-serif" font-size="${mainFontSize}" font-weight="bold" fill="white" text-anchor="middle">${escapeXml(mainLine)}</text>
${toolsStrip ? `  <text x="600" y="${yTools}" font-family="system-ui,sans-serif" font-size="27" fill="white" fill-opacity="0.65" text-anchor="middle">${escapeXml(toolsStrip)}</text>` : ''}
  <text x="600" y="${yDomain}" font-family="system-ui,sans-serif" font-size="24" fill="white" fill-opacity="0.5" text-anchor="middle">iaenespanol.es</text>`;
  }

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>
    <linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:${colorStart};stop-opacity:1" />
      <stop offset="100%" style="stop-color:${colorEnd};stop-opacity:1" />
    </linearGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#g)"/>
  <circle cx="1080" cy="90" r="300" fill="white" fill-opacity="0.09"/>
  <circle cx="120" cy="560" r="220" fill="white" fill-opacity="0.09"/>
${textElements}
</svg>`;

  if (!fs.existsSync(PUBLIC_IMAGES_DIR)) fs.mkdirSync(PUBLIC_IMAGES_DIR, { recursive: true });
  const svgPath = path.join(PUBLIC_IMAGES_DIR, `${slug}.svg`);
  fs.writeFileSync(svgPath, svg, 'utf-8');
  console.log(`🎨 SVG generado: public/images/${slug}.svg`);
  return `/images/${slug}.svg`;
}

// ─── File helpers ─────────────────────────────────────────────────────────────

function slugify(text) {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}

function extractFrontmatterTitle(content) {
  const match = content.match(/^---[\s\S]*?^title:\s*["']?(.+?)["']?\s*$/m);
  return match ? match[1].trim() : null;
}

function getExistingTitles() {
  if (!fs.existsSync(BLOG_DIR)) return [];
  const files = fs.readdirSync(BLOG_DIR).filter(f => f.endsWith('.mdx') || f.endsWith('.md'));
  const titles = [];
  for (const file of files) {
    const content = fs.readFileSync(path.join(BLOG_DIR, file), 'utf-8');
    const title = extractFrontmatterTitle(content);
    if (title) titles.push(title);
  }
  return titles;
}

function getExistingArticles() {
  if (!fs.existsSync(BLOG_DIR)) return [];
  const files = fs.readdirSync(BLOG_DIR).filter(f => f.endsWith('.mdx') || f.endsWith('.md'));
  const articles = [];
  for (const file of files) {
    const content = fs.readFileSync(path.join(BLOG_DIR, file), 'utf-8');
    const titleMatch = content.match(/^---[\s\S]*?^title:\s*["']?(.+?)["']?\s*$/m);
    const descMatch = content.match(/^---[\s\S]*?^description:\s*["']?(.+?)["']?\s*$/m);
    const draftMatch = content.match(/^draft:\s*(.+)$/m);
    const title = titleMatch ? titleMatch[1].trim() : null;
    const description = descMatch ? descMatch[1].trim() : '';
    const draft = draftMatch ? draftMatch[1].trim() === 'true' : false;
    const slug = file.replace(/\.mdx?$/, '');
    if (title && !draft) articles.push({ title, description, slug });
  }
  return articles;
}

function getCurrentDate() {
  return new Date().toISOString().split('T')[0];
}

// ─── Body cleaning ────────────────────────────────────────────────────────────

function cleanBody(body) {
  // Remove leading H1 — ArticuloLayout already renders the title as <h1>
  body = body.replace(/^\s*#\s+[^\n]+\n+/, '');

  // Strip invented domains from internal blog links — normalize to relative paths
  body = body.replace(/\(https?:\/\/[^)]*\/blog\/([^)]+)\)/g, '(/blog/$1)');

  // Normalize 3+ consecutive blank lines to 2
  body = body.replace(/\n{3,}/g, '\n\n');

  return body.trim();
}

// ─── Internal link validation ─────────────────────────────────────────────────

function validateInternalLinks(body, existingArticles) {
  const validSlugs = new Set(existingArticles.map(a => a.slug));
  let removed = 0;
  const cleaned = body.replace(/\[([^\]]+)\]\(\/blog\/([^)\s]+)\)/g, (match, text, slug) => {
    // Strip anchors (#section) before checking
    const baseSlug = slug.split('#')[0];
    if (validSlugs.has(baseSlug)) return match;
    removed++;
    console.log(`⚠️  Enlace interno inválido → texto plano: /blog/${slug}`);
    return text;
  });
  if (removed > 0) console.log(`🔧 ${removed} enlace(s) interno(s) inválido(s) corregido(s)`);
  return cleaned;
}

// ─── FAQ handling ─────────────────────────────────────────────────────────────

function parseFaqs(body) {
  const faqs = [];
  const sectionMatch = body.match(/## Preguntas frecuentes[^\n]*\n+([\s\S]*?)(?=\n## |$)/);
  if (!sectionMatch) return faqs;

  const section = sectionMatch[1];
  const regex = /\*\*(¿[^*]+\?)\*\*\n+([\s\S]*?)(?=\n+\*\*¿|$)/g;
  let match;
  while ((match = regex.exec(section)) !== null) {
    const pregunta = match[1].trim();
    const respuesta = match[2]
      .trim()
      .replace(/\n+/g, ' ')
      .replace(/\s*---\s*$/, '')   // remove trailing --- artifacts
      .replace(/\s{2,}/g, ' ')
      .trim();
    if (pregunta && respuesta) faqs.push({ pregunta, respuesta });
  }
  return faqs;
}

function serializeFaqsYaml(faqs) {
  if (!faqs || faqs.length === 0) return '';
  const lines = ['faqs:'];
  for (const { pregunta, respuesta } of faqs) {
    const cleanRespuesta = respuesta
      .replace(/\s*---\s*$/, '')
      .trim();
    const p = pregunta.replace(/\\/g, '\\\\').replace(/"/g, '\\"');
    const r = cleanRespuesta.replace(/\\/g, '\\\\').replace(/"/g, '\\"');
    lines.push(`  - pregunta: "${p}"`);
    lines.push(`    respuesta: "${r}"`);
  }
  return '\n' + lines.join('\n');
}

// ─── Ratings ──────────────────────────────────────────────────────────────────

async function generateRatings(client, body) {
  const excerpt = body.slice(0, 4000);
  const response = await client.messages.create({
    model: 'claude-haiku-4-5-20251001',
    max_tokens: 300,
    messages: [{
      role: 'user',
      content: `Basándote en este extracto de una review de herramienta IA, genera entre 4 y 5 criterios de evaluación con su puntuación del 1 al 10 (usa un decimal, ej: 8.4). Los criterios deben ser los más relevantes para la herramienta analizada (ejemplos útiles: "Calidad de outputs", "Facilidad de uso", "Relación calidad-precio", "Velocidad", "Soporte en español", "Integraciones").

Extracto:
${excerpt}

Responde SOLO con JSON válido, sin texto adicional:
[
  {"label": "...", "score": X.X},
  {"label": "...", "score": X.X},
  {"label": "...", "score": X.X},
  {"label": "...", "score": X.X}
]`,
    }],
  });
  try {
    const text = response.content[0].text.trim();
    const json = text.match(/\[[\s\S]*\]/)?.[0];
    if (!json) return null;
    const ratings = JSON.parse(json);
    if (!Array.isArray(ratings) || ratings.length === 0) return null;
    return ratings;
  } catch {
    return null;
  }
}

function serializeRatingsYaml(ratings) {
  if (!ratings || ratings.length === 0) return '';
  const lines = ['ratings:'];
  for (const { label, score } of ratings) {
    const l = label.replace(/\\/g, '\\\\').replace(/"/g, '\\"');
    lines.push(`  - label: "${l}"`);
    lines.push(`    score: ${score}`);
  }
  return '\n' + lines.join('\n');
}

// ─── Affiliate handling ───────────────────────────────────────────────────────

function findAffiliateLink(herramientas, topic) {
  const candidates = [
    ...herramientas.map(h => h.toLowerCase()),
    topic.toLowerCase(),
  ];
  for (const candidate of candidates) {
    if (AFFILIATE_LINKS[candidate]) return AFFILIATE_LINKS[candidate];
    for (const [key, url] of Object.entries(AFFILIATE_LINKS)) {
      if (candidate.includes(key) || key.includes(candidate)) return url;
    }
  }
  return null;
}

function injectAffiliateUrl(body, affiliateUrl) {
  if (!affiliateUrl) return body;
  return body.replace(
    /(<BannerAfiliado\b[\s\S]*?\burl=")([^"]*?)(")/,
    `$1${affiliateUrl}$3`
  );
}

// ─── Internal links ───────────────────────────────────────────────────────────

function splitMdxFile(content) {
  const fmClose = content.indexOf('\n---\n', 4) + 5;
  let i = fmClose;
  while (i < content.length) {
    const lineEnd = content.indexOf('\n', i);
    const line = lineEnd === -1 ? content.slice(i) : content.slice(i, lineEnd);
    if (line.trim() === '' || /^import\s/.test(line.trim())) {
      i = lineEnd === -1 ? content.length : lineEnd + 1;
    } else {
      break;
    }
  }
  return { header: content.slice(0, i), body: content.slice(i) };
}

async function addInternalLinks(client, body, currentSlug, relatedArticles) {
  if (relatedArticles.length === 0) return body;

  const articlesList = relatedArticles
    .map(a => `- Título: "${a.title}" | URL: /blog/${a.slug}${a.description ? ` | Sobre: ${a.description}` : ''}`)
    .join('\n');

  const response = await client.messages.create({
    model: 'claude-haiku-4-5-20251001',
    max_tokens: 8192,
    messages: [{
      role: 'user',
      content: `Tienes el siguiente artículo de blog:\n\n---\n${body}\n---\n\nEstos son otros artículos publicados en el mismo blog:\n${articlesList}\n\nTu tarea: identifica 2-3 artículos de la lista con relación temática real al artículo actual. Para cada uno, inserta UN enlace interno en el punto del texto donde encaje de la forma más natural posible — dentro de una frase existente o como transición orgánica. Nunca como "ver también" ni en listas separadas.\n\nReglas estrictas:\n- Formato Markdown: [texto anchor descriptivo](/blog/slug)\n- El anchor text debe describir el contenido del enlace, no ser genérico ("haz clic aquí", "este artículo")\n- Usa ÚNICAMENTE los slugs exactos de la lista anterior. NUNCA inventes slugs.\n- No añadas secciones nuevas ni cambies ningún contenido existente\n- Si ningún artículo tiene relación temática real, devuelve el cuerpo exactamente igual sin cambios\n\nDevuelve únicamente el cuerpo del artículo modificado, sin explicaciones ni comentarios.`,
    }],
  });

  return response.content[0].text.trim();
}

async function addReverseLinks(client, newSlug, newTitle, newDescription, existingArticles) {
  if (existingArticles.length === 0) return;

  const articlesList = existingArticles
    .map(a => `- slug: ${a.slug} | título: "${a.title}"${a.description ? ` | sobre: ${a.description}` : ''}`)
    .join('\n');

  const selectionRes = await client.messages.create({
    model: 'claude-haiku-4-5-20251001',
    max_tokens: 100,
    messages: [{
      role: 'user',
      content: `Nuevo artículo publicado:\nTítulo: "${newTitle}"\nDescripción: "${newDescription}"\nURL: /blog/${newSlug}\n\nArtículos existentes:\n${articlesList}\n\nIdentifica máximo 2 slugs de artículos que se beneficiarían de enlazar al nuevo artículo por tener relación temática real. Devuelve SOLO los slugs separados por coma. Si ninguno es relevante, devuelve vacío.`,
    }],
  });

  const slugsRaw = selectionRes.content[0].text.trim();
  if (!slugsRaw) return;

  const targetSlugs = slugsRaw.split(',').map(s => s.trim()).filter(Boolean).slice(0, 2);

  for (const targetSlug of targetSlugs) {
    const article = existingArticles.find(a => a.slug === targetSlug);
    if (!article) continue;

    const filePath = path.join(BLOG_DIR, `${targetSlug}.mdx`);
    if (!fs.existsSync(filePath)) continue;

    const content = fs.readFileSync(filePath, 'utf-8');
    const { header, body: existingBody } = splitMdxFile(content);

    const linkRes = await client.messages.create({
      model: 'claude-haiku-4-5-20251001',
      max_tokens: 8192,
      messages: [{
        role: 'user',
        content: `Tienes el siguiente artículo de blog:\n\n---\n${existingBody}\n---\n\nInserta UN enlace natural hacia este nuevo artículo relacionado:\nTítulo: "${newTitle}"\nURL: /blog/${newSlug}\nDescripción: "${newDescription}"\n\nReglas:\n- Inserta el enlace dentro de una frase existente de forma orgánica\n- El anchor text debe describir el contenido enlazado\n- No añadas secciones nuevas ni cambies otro contenido\n- Si no hay lugar natural, devuelve el texto exactamente igual\n\nDevuelve únicamente el cuerpo modificado, sin explicaciones.`,
      }],
    });

    const updatedBody = linkRes.content[0].text.trim();
    fs.writeFileSync(filePath, header + updatedBody + '\n', 'utf-8');
    console.log(`🔗 Enlace inverso añadido en: src/content/blog/${targetSlug}.mdx`);
  }
}

// ─── Research ─────────────────────────────────────────────────────────────────

async function researchTool(client, topic) {
  console.log(`🔍 Investigando información actualizada sobre: "${topic}"...`);
  try {
    const response = await client.messages.create({
      model: 'claude-sonnet-4-6',
      max_tokens: 3000,
      tools: [{
        type: 'web_search_20250305',
        name: 'web_search',
        max_uses: 6,
      }],
      messages: [{
        role: 'user',
        content: `Investiga la herramienta de IA "${topic}" para escribir un artículo de blog actualizado. Necesito datos VERIFICADOS y actuales (busca fuentes de 2025-2026):

1. Precio exacto actual: planes disponibles, precios en USD/EUR, si hay versión gratuita y sus límites
2. Funcionalidades principales disponibles hoy
3. Cambios o actualizaciones importantes en los últimos 6 meses
4. Principales competidores directos con sus precios aproximados
5. Limitaciones conocidas y quejas frecuentes de usuarios reales
6. Disponibilidad en España y Latinoamérica si aplica

Para cada dato de precio o funcionalidad, indica la URL fuente. Si no encuentras información fiable sobre algún punto, dilo explícitamente en lugar de inventar. Prioriza páginas oficiales del producto y reseñas técnicas recientes.`,
      }],
      betas: ['web-search-2025-03-05'],
    });

    const textContent = response.content
      .filter(block => block.type === 'text')
      .map(block => block.text)
      .join('\n');

    console.log('✅ Investigación web completada');
    return textContent;
  } catch (err) {
    console.log(`⚠️  Investigación web no disponible: ${err.message}. El artículo usará solo conocimiento base.`);
    return null;
  }
}

// ─── Body structure validation ────────────────────────────────────────────────

function validateBodyStructure(body, tipo) {
  const warnings = [];
  if (!body.includes('## Preguntas frecuentes')) warnings.push('Falta sección ## Preguntas frecuentes');
  if (!/## Conclusi[oó]n/.test(body)) warnings.push('Falta sección ## Conclusión');
  if (tipo === 'review' && !body.includes('<TablaComparativa')) warnings.push('Review sin <TablaComparativa>');
  const wordCount = body.trim().split(/\s+/).length;
  if (wordCount < 1500) warnings.push(`Contenido corto: ~${wordCount} palabras (mínimo recomendado: 1800)`);
  for (const w of warnings) console.log(`⚠️  ${w}`);
}

// ─── Prompt builder ───────────────────────────────────────────────────────────

function buildStructureBlock(tipo) {
  const tablaJsx = `   Usa exactamente este formato JSX:
   \`\`\`
   <TablaComparativa
     titulo="..."
     herramientas={[
       { nombre: "...", precio: "...", puntuacion: 4.X, idealPara: "..." },
       { nombre: "...", precio: "...", puntuacion: 4.X, idealPara: "..." },
       { nombre: "...", precio: "...", puntuacion: 4.X, idealPara: "..." },
       { nombre: "...", precio: "...", puntuacion: 4.X, idealPara: "..." },
     ]}
   />
   \`\`\``;

  const bannerJsx = `   Usa exactamente este formato JSX:
   \`\`\`
   <BannerAfiliado
     titulo="..."
     descripcion="..."
     cta="..."
     url="https://..."
   />
   \`\`\``;

  const faqsSection = (n) => `${n}. **## Preguntas frecuentes sobre [herramienta/tema]**
   - Exactamente 5 preguntas con respuestas de 2-4 líneas cada una
   - Las preguntas deben ser las que alguien buscaría en Google (long-tail: precio, comparación, si vale la pena, diferencia con competidor, disponibilidad en España)
   - Formato: **¿Pregunta?** seguido de la respuesta en párrafo
   - CRÍTICO: termina cada respuesta con punto. NUNCA pongas "---" ni separadores al final de una respuesta`;

  if (tipo === 'review') {
    return `ESTRUCTURA OBLIGATORIA (en este orden exacto):

1. **Introducción** (sin encabezado H1 — el framework del blog ya muestra el título de la página; empezar directamente con párrafos)
   - 2-3 párrafos: gancho, contexto del problema que resuelve la herramienta, y un spoiler honesto de tu veredicto
   - La keyword principal debe aparecer de forma natural en las primeras 100 palabras
   - Tono: como alguien que ha usado la herramienta de verdad, no un vendedor

2. **## ¿Qué es [herramienta] y cuánto cuesta?**
   - Aclara nombres confusos o versiones (mucha gente busca nombres incorrectos — explícalo)
   - Planes y precios actuales en euros donde aplique
   - Lista de lo que incluye cada plan relevante

3. **\`<TablaComparativa>\` — insertar el componente aquí con 4 competidores reales**
${tablaJsx}

4. **## [Fortaleza principal — título en forma de pregunta o resultado]** (ej: "¿Qué hace mejor [herramienta] que sus rivales?")
   - Usa ### para subsecciones si hay 3 o más aspectos distintos
   - Incluye al menos UN ejemplo concreto en primera persona con detalles específicos (números, tiempo, resultado)

5. **## [Segunda fortaleza o caso de uso diferenciador]**
   - Mismo nivel de detalle y ejemplos concretos

6. **## Limitaciones y puntos débiles de [herramienta]**
   - Sé honesto: qué hace mal, dónde pierde frente a competidores, qué le falta todavía

7. **## ¿Vale la pena pagar por [herramienta] en 2026?**
   - Criterios claros: "Sí vale la pena si..." y "Probablemente no vale la pena si..." en listas
   - Recomendación directa y sin ambigüedades

8. **\`<BannerAfiliado>\` — insertar el componente aquí**
${bannerJsx}

${faqsSection(9)}

10. **## Conclusión**
    - 2-3 párrafos: resumen del veredicto, para quién es ideal, frase de cierre con perspectiva`;
  }

  if (tipo === 'comparativa') {
    return `ESTRUCTURA OBLIGATORIA (en este orden exacto):

1. **Introducción** (sin encabezado H1 — el framework del blog ya muestra el título de la página; empezar directamente con párrafos)
   - 2-3 párrafos: gancho, por qué esta comparativa importa, spoiler breve del veredicto
   - La keyword principal debe aparecer en las primeras 100 palabras
   - Tono: como alguien que ha probado ambas herramientas de verdad

2. **## ¿En qué se parecen y en qué difieren [herramienta A] y [herramienta B]?**
   - Aclara el propósito de cada una y para qué tipo de usuario están pensadas
   - Planes y precios actuales de ambas en euros donde aplique

3. **\`<TablaComparativa>\` — comparación lado a lado con alternativas**
${tablaJsx}

4. **## Rendimiento y calidad de resultados: ¿cuál genera mejores outputs?**
   - Compara ambas con ejemplos concretos y resultados reales en primera persona

5. **## Precio y relación calidad-precio: ¿cuál da más por tu dinero?**
   - Análisis de qué obtienes por tu dinero en cada una

6. **## Casos de uso: ¿para quién es mejor cada una?**
   - Para quién es mejor cada una y dónde falla cada una

7. **## ¿Cuál elegir? Recomendación directa**
   - Criterios claros: "Elige [A] si..." y "Elige [B] si..." en listas
   - Una recomendación final sin ambigüedades

${faqsSection(8)}

9. **## Conclusión**
   - 2-3 párrafos: veredicto final, para quién es cada una, frase de cierre`;
  }

  // guia / TOFU
  return `ESTRUCTURA OBLIGATORIA (en este orden exacto):

1. **Introducción** (sin encabezado H1 — el framework del blog ya muestra el título de la página; empezar directamente con párrafos)
   - 2-3 párrafos: gancho con el problema real del lector, contexto y spoiler de lo que va a aprender
   - La keyword principal debe aparecer en las primeras 100 palabras
   - Tono: como alguien que ha aplicado esto en su trabajo real, no un divulgador genérico

2. **## [Primer H2 en forma de pregunta que la gente busca en Google]** (ej: "¿Qué es [tema] y para qué sirve realmente?")
   - Desarrolla el primer concepto con ejemplos concretos
   - Si comparas varias herramientas o alternativas, puedes insertar una \`<TablaComparativa>\` aquí
${tablaJsx}

3. **## [Segundo H2 orientado a un beneficio o caso de uso]**
   - Mismo nivel de detalle y ejemplos en primera persona

4. **## [Tercer H2 — limitaciones, comparativa o aspecto diferenciador]**
   - Puede ser limitaciones, casos de uso específicos o profundidad técnica

5. **## ¿Cuándo tiene sentido usar [tema/herramienta/s] y cuándo no?**
   - Criterios claros: "Sí tiene sentido si..." y "Probablemente no si..." en listas
   - Recomendación directa y sin ambigüedades

${faqsSection(6)}

7. **## Conclusión**
   - 2-3 párrafos: resumen práctico, para quién aplica, frase de cierre con perspectiva`;
}

// ─── Main ─────────────────────────────────────────────────────────────────────

async function generateDraft() {
  if (!fs.existsSync(TOPICS_FILE)) {
    console.error(`❌ No se encontró ${TOPICS_FILE}`);
    process.exit(1);
  }
  const topics = JSON.parse(fs.readFileSync(TOPICS_FILE, 'utf-8'));
  const nextTopic = topics.find(t => !t.usado);

  if (!nextTopic) {
    const msg = `Todos los temas han sido utilizados.\nFecha: ${new Date().toISOString()}\nAñade nuevos temas a scripts/topics.json para continuar generando borradores.\n`;
    fs.writeFileSync(EXHAUSTED_FILE, msg, 'utf-8');
    console.log('⚠️  Todos los temas agotados. Aviso escrito en scripts/temas-agotados.txt');
    process.exit(0);
  }

  const tipo = classifyTopic(nextTopic.tema);
  console.log(`📑 Tipo de artículo: ${tipo}`);

  const client = new Anthropic();

  // Step 1: Research
  const research = await researchTool(client, nextTopic.tema);

  // Existing articles — used both for prompt context and link validation
  const existingArticles = getExistingArticles();
  const existingTitles = getExistingTitles();

  // Format existing articles list with slugs so the model can build correct internal links
  const existingList = existingArticles.length > 0
    ? existingArticles.map(a => `- "${a.title}" → /blog/${a.slug}`).join('\n')
    : getExistingTitles().map(t => `- "${t}"`).join('\n') || '(ninguno todavía)';

  const systemPrompt = `Eres un redactor experto en herramientas de inteligencia artificial que escribe en español para un blog técnico hispanohablante orientado a profesionales.

Tu voz es cercana, directa y honesta. Nunca usas lenguaje corporativo vacío ni frases de relleno ("en el vertiginoso mundo de la IA", "revolucionario", "disruptivo", "cambia el juego"). Tienes experiencia real usando las herramientas de las que escribes y lo transmites con ejemplos concretos en primera persona ("Lo probé con...", "En mi flujo de trabajo...", "Después de X semanas usando...").

Conoces el ecosistema de IA a fondo. Los modelos principales de Anthropic en 2026 son Claude Fable 5, Claude Opus 4.8, Claude Sonnet 4.6 y Claude Haiku 4.5. De OpenAI: GPT-4o y la familia o3. De Google: Gemini 2.5 Pro. También existen modelos open source relevantes como Llama y Mistral. Nunca presentes versiones antiguas como actuales.

REGLA CRÍTICA SOBRE PRECIOS Y DATOS: Si el usuario te proporciona información de investigación web, esos datos tienen PRIORIDAD ABSOLUTA sobre tu conocimiento de entrenamiento. Nunca inventes precios, planes ni funcionalidades. Si no tienes datos verificados sobre algo, dilo explícitamente en lugar de inventar.

PRINCIPIOS E-E-A-T que deben reflejarse en cada artículo:
- Experiencia: menciona casos de uso reales con contexto y detalles ("tardé X tiempo", "obtuve Y resultado")
- Pericia: análisis técnico que demuestre conocimiento profundo, no solo descripción de features
- Autoridad: comparaciones honestas con competidores por nombre, incluyendo cuándo la alternativa es mejor
- Confianza: admite puntos débiles reales, advierte sobre limitaciones, no infles virtudes

REGLAS SEO que debes cumplir sin excepción:
- La keyword principal debe aparecer en las primeras 100 palabras de forma natural
- Los H2 deben formularse como preguntas o beneficios que la gente busca en Google — NUNCA "Características", "Pros y contras", "Introducción"
- Usa variaciones semánticas de la keyword a lo largo del texto (sinónimos, long-tail relacionados)
- La sección de Preguntas frecuentes debe contener preguntas long-tail con intención de búsqueda real

REGLA CRÍTICA SOBRE FAQs: Las respuestas de las FAQs NUNCA deben terminar con "---" ni ningún separador. Termina siempre con punto.

Tu audiencia son profesionales hispanohablantes (España y Latinoamérica) que usan IA para trabajo, creatividad y productividad. Les interesa saber si deben pagar, qué obtienen exactamente y cómo encaja en su flujo de trabajo real.`;

  const researchSection = research
    ? `\nINFORMACIÓN ACTUALIZADA VERIFICADA (usa estos datos con prioridad sobre tu conocimiento de entrenamiento):\n${research}\n`
    : '\n⚠️ No hay datos de investigación web disponibles. Sé conservador con precios y funcionalidades: solo incluye datos que conozcas con certeza, e indica claramente cuando algo puede estar desactualizado.\n';

  const userPrompt = `Ya existen estos artículos en el blog (la URL exacta de cada uno está después de →). Usa esas URLs exactas si necesitas enlazar internamente — NUNCA inventes slugs:
${existingList}
${researchSection}
Genera un artículo completo y optimizado para SEO sobre "${nextTopic.tema}".

---

${buildStructureBlock(tipo)}

---

REQUISITOS DE CALIDAD:
- Mínimo 1800 palabras en el cuerpo (apunta a 2000-2500)
- NO escribas un H1 al principio del cuerpo — el framework del blog ya muestra el título como <h1>
- La sección de preguntas frecuentes debe contener EXACTAMENTE 5 preguntas, no más ni menos
- Usa **negrita** para conceptos clave y datos importantes
- Menciona competidores por nombre con comparaciones honestas
- Al menos 2 ejemplos en primera persona con detalles concretos (cifras, tiempo, resultado)
- Precios en euros para España cuando sea posible; dólares si solo existe en USD
- Los modelos de IA actuales en 2026 son: Claude Fable 5, Claude Opus 4.8, Claude Sonnet 4.6 (Anthropic); GPT-4o y familia o3 (OpenAI); Gemini 2.5 Pro (Google) — nunca menciones versiones anteriores como actuales
- Para precios y funcionalidades, usa SIEMPRE los datos de "INFORMACIÓN ACTUALIZADA VERIFICADA" si están disponibles
- ENLACES INTERNOS: usa ÚNICAMENTE los slugs exactos que aparecen en la lista de artículos existentes. Formato: [texto descriptivo del destino](/blog/slug-exacto). NUNCA inventes slugs ni uses dominios ficticios

---

Responde EXACTAMENTE en este formato, con los dos delimitadores tal cual:

<<<METADATA>>>
title: título del artículo (50-80 caracteres, incluye año si es relevante para el CTR)
description: descripción SEO (130-160 caracteres, incluye keyword principal, natural, orientada a búsqueda)
slug: URL slug — REGLAS: (1) máximo 5 palabras y 50 caracteres; (2) solo nombre de herramienta + 1-2 palabras de acción (review, vs, guia, mejores, como); (3) SIN preposiciones, artículos ni adjetivos vacíos; (4) todo minúsculo separado por guiones. CORRECTO: "cursor-review", "chatgpt-vs-claude", "mejores-ia-imagen-2026". INCORRECTO: "cursor-ide-review-completa-programa-con-ia-de-verdad"
category: una de estas exactamente: generacion-texto | generacion-imagen | codigo | audio | video | productividad
herramientas: Herramienta1, Herramienta2
<<<BODY>>>
[Cuerpo completo del artículo siguiendo la estructura obligatoria de arriba. Los componentes TablaComparativa y BannerAfiliado ya están importados en el archivo, úsalos directamente sin añadir imports.]`;

  console.log(`\n📝 Generando borrador: "${nextTopic.tema}"...`);

  const message = await client.messages.create({
    model: 'claude-sonnet-4-6',
    max_tokens: 8192,
    system: systemPrompt,
    messages: [{ role: 'user', content: userPrompt }],
  });

  const raw = message.content[0].text.trim();

  const metaMatch = raw.match(/<<<METADATA>>>\n([\s\S]*?)\n<<<BODY>>>/);
  const bodyMatch = raw.match(/<<<BODY>>>\n([\s\S]*)/);

  if (!metaMatch || !bodyMatch) {
    throw new Error(`La API no devolvió el formato esperado.\nRespuesta recibida:\n${raw.slice(0, 500)}`);
  }

  const metaBlock = metaMatch[1];
  let body = bodyMatch[1].trim();

  function parseLine(block, key) {
    const match = block.match(new RegExp(`^${key}:\\s*(.+)$`, 'm'));
    return match ? match[1].trim() : '';
  }

  const title = parseLine(metaBlock, 'title');
  const description = parseLine(metaBlock, 'description');
  const slugRaw = parseLine(metaBlock, 'slug');
  const category = parseLine(metaBlock, 'category');
  const herramientasRaw = parseLine(metaBlock, 'herramientas');
  const herramientas = herramientasRaw ? herramientasRaw.split(',').map(h => h.trim()).filter(Boolean) : [];

  if (!title || !description || !category || !body) {
    throw new Error(`Respuesta incompleta. Campos recibidos: title="${title}", description="${description}", category="${category}", body=${body.length} chars`);
  }

  const validCategories = ['generacion-texto', 'generacion-imagen', 'codigo', 'audio', 'video', 'productividad'];
  if (!validCategories.includes(category)) {
    throw new Error(`Categoría no válida: "${category}". Debe ser una de: ${validCategories.join(', ')}`);
  }

  // Validate and sanitize slug
  let slug = slugRaw;
  if (!slug || !/^[a-z0-9-]+$/.test(slug)) {
    slug = slugify(nextTopic.tema);
    console.log(`⚠️  Slug no válido ("${slugRaw}"), usando fallback: "${slug}"`);
  } else if (slug.length > 50) {
    const truncated = slug.slice(0, 50).replace(/-[^-]*$/, '');
    console.log(`⚠️  Slug demasiado largo (${slug.length} chars), truncado a: "${truncated}"`);
    slug = truncated;
  }

  const date = getCurrentDate();
  const filename = `${slug}.mdx`;
  const outputPath = path.join(BLOG_DIR, filename);

  // Step 2: Clean body
  body = cleanBody(body);

  // Step 3: Affiliate handling
  const herramientasArr = Array.isArray(herramientas) ? herramientas : [];
  const affiliateUrl = findAffiliateLink(herramientasArr, nextTopic.tema);
  if (affiliateUrl) {
    body = injectAffiliateUrl(body, affiliateUrl);
    console.log(`💰 Enlace de afiliado inyectado: ${affiliateUrl}`);
  } else {
    const before = body.length;
    body = body.replace(/<BannerAfiliado[\s\S]*?\/>/g, '').replace(/\n{3,}/g, '\n\n').trim();
    if (body.length < before) console.log('ℹ️  Sin afiliado — BannerAfiliado eliminado del cuerpo');
  }

  // Step 4: Internal links (only published articles, exclude current slug)
  const articlesForLinking = existingArticles.filter(a => a.slug !== slug);
  if (articlesForLinking.length > 0) {
    console.log('🔗 Insertando enlaces internos relacionados...');
    body = await addInternalLinks(client, body, slug, articlesForLinking);
    body = validateInternalLinks(body, articlesForLinking);
    console.log('✅ Enlaces internos añadidos y validados');
  }

  // Step 5: Ratings (reviews only)
  let ratings = null;
  if (tipo === 'review') {
    console.log('⭐ Generando ratings...');
    ratings = await generateRatings(client, body);
    if (ratings) console.log(`✅ Ratings generados: ${ratings.length} criterios`);
    else console.log('⚠️  No se pudieron generar ratings');
  }

  // Step 6: Generate local SVG (replaces Unsplash)
  console.log('🎨 Generando imagen SVG...');
  const imagePath = generateLocalSvg(slug, title, herramientasArr, category, tipo);

  // Step 7: Extract FAQs from body for frontmatter JSON-LD
  const faqs = parseFaqs(body);
  if (faqs.length > 0) console.log(`✅ FAQs extraídas: ${faqs.length} preguntas`);
  else console.log('⚠️  No se encontraron FAQs en el cuerpo');

  // Step 8: Validate body structure
  validateBodyStructure(body, tipo);

  // Escape YAML values
  const safeTitle = title.replace(/"/g, '\\"');
  const safeDescription = description.replace(/"/g, '\\"');

  const herramientasYaml = herramientasArr.map(h => `"${h}"`).join(', ');
  const afiliadoLine = affiliateUrl ? `\nafiliado: "${affiliateUrl}"` : '';
  const faqsYaml = serializeFaqsYaml(faqs);
  const ratingsYaml = serializeRatingsYaml(ratings);
  const bannerImport = affiliateUrl ? `\nimport BannerAfiliado from '../../components/BannerAfiliado.astro';` : '';

  const fileContent = `---
title: "${safeTitle}"
description: "${safeDescription}"
date: ${date}
category: ${category}
herramientas: [${herramientasYaml}]
imagen: "${imagePath}"${afiliadoLine}${ratingsYaml}${faqsYaml}
draft: true
---

import TablaComparativa from '../../components/TablaComparativa.astro';${bannerImport}

${body.trim()}
`;

  fs.writeFileSync(outputPath, fileContent, 'utf-8');
  console.log(`✅ Borrador guardado en: src/content/blog/${filename}`);

  // Mark topic as used
  nextTopic.usado = true;
  fs.writeFileSync(TOPICS_FILE, JSON.stringify(topics, null, 2) + '\n', 'utf-8');
  console.log(`✅ Tema marcado como usado: "${nextTopic.tema}"`);

  fs.writeFileSync(DRAFT_TOPIC_FILE, nextTopic.tema, 'utf-8');

  // Step 9: Reverse links in existing articles
  if (articlesForLinking.length > 0) {
    console.log('↩️  Insertando enlaces inversos en artículos existentes...');
    await addReverseLinks(client, slug, title, description, articlesForLinking);
  }
}

generateDraft().catch(err => {
  console.error(`\n❌ Error generando borrador: ${err.message}`);
  process.exit(1);
});
