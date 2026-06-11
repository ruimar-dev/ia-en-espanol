// @ts-check
'use strict';

const fs = require('fs');
const path = require('path');
const Anthropic = require('@anthropic-ai/sdk');

const BLOG_DIR = path.join(__dirname, '..', 'src', 'content', 'blog');
const TOPICS_FILE = path.join(__dirname, 'topics.json');
const EXHAUSTED_FILE = path.join(__dirname, 'temas-agotados.txt');
const DRAFT_TOPIC_FILE = path.join(__dirname, '.draft-topic');

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

async function searchUnsplashImage(query) {
  const accessKey = process.env.UNSPLASH_ACCESS_KEY;
  if (!accessKey) {
    console.log('⚠️  UNSPLASH_ACCESS_KEY no configurada, se omite imagen');
    return null;
  }

  const url = `https://api.unsplash.com/search/photos?query=${encodeURIComponent(query)}&per_page=1&orientation=landscape`;
  let response;
  try {
    response = await fetch(url, {
      headers: { Authorization: `Client-ID ${accessKey}` },
    });
  } catch (err) {
    console.log(`⚠️  No se pudo contactar con Unsplash: ${err.message}`);
    return null;
  }

  if (!response.ok) {
    console.log(`⚠️  Unsplash respondió ${response.status}, se omite imagen`);
    return null;
  }

  const data = await response.json();
  if (!data.results || data.results.length === 0) {
    console.log('⚠️  Unsplash no devolvió resultados para esta búsqueda');
    return null;
  }

  return data.results[0].urls.regular;
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
      content: `Tienes el siguiente artículo de blog:\n\n---\n${body}\n---\n\nEstos son otros artículos publicados en el mismo blog:\n${articlesList}\n\nTu tarea: identifica 2-3 artículos de la lista con relación temática real al artículo actual. Para cada uno, inserta UN enlace interno en el punto del texto donde encaje de la forma más natural posible — dentro de una frase existente o como transición orgánica. Nunca como "ver también" ni en listas separadas.\n\nReglas estrictas:\n- Formato Markdown: [texto anchor descriptivo](/blog/slug)\n- El anchor text debe describir el contenido del enlace, no ser genérico ("haz clic aquí", "este artículo")\n- No añadas secciones nuevas ni cambies ningún contenido existente\n- Si ningún artículo tiene relación temática real, devuelve el cuerpo exactamente igual sin cambios\n\nDevuelve únicamente el cuerpo del artículo modificado, sin explicaciones ni comentarios.`,
    }],
  });

  return response.content[0].text.trim();
}

async function generateImageQuery(client, topic, title) {
  const response = await client.messages.create({
    model: 'claude-haiku-4-5-20251001',
    max_tokens: 30,
    messages: [{
      role: 'user',
      content: `Give me 3 English keywords for an Unsplash photo search that best represents this AI blog article topic visually. Topic: "${topic}". Article title: "${title}". Return ONLY the keywords separated by spaces, nothing else. Example: "artificial intelligence robot technology"`,
    }],
  });
  return response.content[0].text.trim().replace(/^["']|["']$/g, '');
}

function parseFaqs(body) {
  const faqs = [];
  const sectionMatch = body.match(/## Preguntas frecuentes[^\n]*\n([\s\S]*?)(?=\n## |$)/);
  if (!sectionMatch) return faqs;

  const section = sectionMatch[1];
  const regex = /\*\*(¿[^*]+\?)\*\*\n([\s\S]*?)(?=\n\*\*¿|$)/g;
  let match;
  while ((match = regex.exec(section)) !== null) {
    const pregunta = match[1].trim();
    const respuesta = match[2].trim().replace(/\n+/g, ' ');
    if (pregunta && respuesta) faqs.push({ pregunta, respuesta });
  }
  return faqs;
}

function serializeFaqsYaml(faqs) {
  if (!faqs || faqs.length === 0) return '';
  const lines = ['faqs:'];
  for (const { pregunta, respuesta } of faqs) {
    const p = pregunta.replace(/\\/g, '\\\\').replace(/"/g, '\\"');
    const r = respuesta.replace(/\\/g, '\\\\').replace(/"/g, '\\"');
    lines.push(`  - pregunta: "${p}"`);
    lines.push(`    respuesta: "${r}"`);
  }
  return '\n' + lines.join('\n');
}

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

async function generateDraft() {
  // Load topics
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

  const existingTitles = getExistingTitles();
  const existingList = existingTitles.length > 0
    ? existingTitles.map(t => `- ${t}`).join('\n')
    : '(ninguno todavía)';

  const client = new Anthropic();

  const systemPrompt = `Eres un redactor experto en herramientas de inteligencia artificial que escribe en español para un blog técnico hispanohablante orientado a profesionales.

Tu voz es cercana, directa y honesta. Nunca usas lenguaje corporativo vacío ni frases de relleno. Tienes experiencia real usando las herramientas de las que escribes y lo transmites con ejemplos concretos en primera persona ("Lo probé con...", "En mi flujo de trabajo...").

Conoces el ecosistema de IA a fondo: sabes que en 2026 los modelos principales son Gemini 2.5, Claude Sonnet 4 / Opus 4, GPT-4o / o3 y los modelos open source como Llama y Mistral. Nunca refieras versiones antiguas como actuales.

Escribes con los principios E-E-A-T de Google en mente: demuestras Experiencia, Pericia, Autoridad y Confianza en cada artículo. Eso significa: opiniones claras, comparaciones honestas con competidores por nombre, admitir puntos débiles reales, y no inflar artificialmente las virtudes de ninguna herramienta.

Tu audiencia son profesionales hispanohablantes (España y Latinoamérica) que usan IA para trabajo, creatividad y productividad. Les interesa saber si deben pagar, qué obtienen exactamente y cómo encaja en su flujo de trabajo real.`;

  const userPrompt = `Ya existen estos artículos en el blog (no repitas contenido ni enfoque):
${existingList}

Genera un artículo completo y optimizado para SEO sobre "${nextTopic.tema}".

---

ESTRUCTURA OBLIGATORIA (en este orden exacto):

1. **Introducción** (sin encabezado H1 — el framework del blog ya muestra el título de la página; empezar directamente con párrafos)
   - 2-3 párrafos: gancho, contexto del problema que resuelve la herramienta, y un spoiler honesto de tu veredicto
   - Tono: como alguien que ha usado la herramienta de verdad, no un vendedor

2. **## Qué es [herramienta] y cuánto cuesta exactamente**
   - Aclara nombres confusos o versiones (mucha gente busca nombres incorrectos — explícalo)
   - Planes y precios actuales en euros donde aplique
   - Lista de lo que incluye cada plan relevante

3. **\`<TablaComparativa>\` — insertar el componente aquí con 4 competidores reales**
   Usa exactamente este formato JSX:
   \`\`\`
   <TablaComparativa
     titulo="[Herramienta] vs la competencia en 2026"
     herramientas={[
       { nombre: "...", precio: "...", puntuacion: 4.X, idealPara: "..." },
       { nombre: "...", precio: "...", puntuacion: 4.X, idealPara: "..." },
       { nombre: "...", precio: "...", puntuacion: 4.X, idealPara: "..." },
       { nombre: "...", precio: "...", puntuacion: 4.X, idealPara: "..." },
     ]}
   />
   \`\`\`

4. **## [Fortaleza principal de la herramienta]** (título descriptivo, no genérico)
   - Usa ### para subsecciones si hay 3 o más aspectos distintos
   - Incluye al menos UN ejemplo concreto en primera persona con detalles específicos (números, tiempo, resultado)

5. **## [Segunda fortaleza o caso de uso diferenciador]**
   - Mismo nivel de detalle y ejemplos concretos

6. **## [Tercera sección de análisis — puede ser limitaciones o comparación profunda]**
   - Sé honesto: qué hace mal, dónde pierde frente a competidores, qué le falta todavía

7. **## ¿Vale la pena pagar [herramienta]?**
   - Criterios claros: "Sí vale la pena si..." y "Probablemente no vale la pena si..." en listas
   - Recomendación directa y sin ambigüedades

8. **\`<BannerAfiliado>\` — insertar el componente aquí**
   Usa exactamente este formato JSX:
   \`\`\`
   <BannerAfiliado
     titulo="..."
     descripcion="..."
     cta="..."
     url="https://..."
   />
   \`\`\`

9. **## Preguntas frecuentes sobre [herramienta]**
   - Exactamente 5 preguntas con respuestas de 2-4 líneas cada una
   - Las preguntas deben ser las que alguien buscaría realmente en Google (long-tail: precio, comparación, disponibilidad en España, si vale la pena, diferencia con competidor)
   - Formato: **¿Pregunta?** seguido de la respuesta en párrafo

10. **## Conclusión**
    - 2-3 párrafos: resumen del veredicto, para quién es ideal, frase de cierre con perspectiva

---

REQUISITOS DE CALIDAD:
- Mínimo 2000 palabras en el cuerpo
- NO escribas un H1 al principio del cuerpo (el framework ya lo muestra)
- La keyword principal del artículo debe aparecer de forma natural en los primeros 100 palabras de la introducción
- La sección de preguntas frecuentes debe contener EXACTAMENTE 5 preguntas, no más ni menos
- Usa **negrita** para conceptos clave y datos importantes
- Menciona competidores por nombre con comparaciones honestas
- Al menos 2 ejemplos en primera persona con detalles concretos (cifras, tiempo, resultado)
- Precios en euros para España cuando sea posible; dólares si solo existe en USD
- Los modelos de IA actuales en 2026 son: Gemini 2.5 Pro, Claude Sonnet 4 / Opus 4, GPT-4o / o3 — nunca menciones versiones anteriores como actuales
- No escribas frases vacías como "en el vertiginoso mundo de la IA" o "revolucionario" o "disruptivo"

---

Responde EXACTAMENTE en este formato, con los dos delimitadores tal cual:

<<<METADATA>>>
title: título del artículo (50-80 caracteres, incluye año si es relevante)
description: descripción SEO (130-160 caracteres, natural, orientada a búsqueda)
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

  const date = getCurrentDate();
  const slug = slugify(nextTopic.tema);
  const filename = `${slug}.mdx`;
  const outputPath = path.join(BLOG_DIR, filename);

  const herramientasArr = Array.isArray(herramientas) ? herramientas : [];
  const herramientasYaml = herramientasArr.map(h => `"${h}"`).join(', ');

  const existingArticles = getExistingArticles().filter(a => a.slug !== slug);
  if (existingArticles.length > 0) {
    console.log('🔗 Insertando enlaces internos relacionados...');
    body = await addInternalLinks(client, body, slug, existingArticles);
    console.log('✅ Enlaces internos añadidos');
  }

  console.log('🖼️  Generando query de imagen...');
  const imageQuery = await generateImageQuery(client, nextTopic.tema, title);
  console.log(`🔍 Query Unsplash: "${imageQuery}"`);
  const imageUrl = await searchUnsplashImage(imageQuery);
  if (imageUrl) console.log(`✅ Imagen encontrada: ${imageUrl}`);

  const faqs = parseFaqs(body);
  if (faqs.length > 0) console.log(`✅ FAQs extraídas: ${faqs.length} preguntas`);

  // Escape double quotes inside title and description for YAML safety
  const safeTitle = title.replace(/"/g, '\\"');
  const safeDescription = description.replace(/"/g, '\\"');

  const imagenLine = imageUrl ? `\nimagen: "${imageUrl}"` : '';
  const faqsYaml = serializeFaqsYaml(faqs);

  const fileContent = `---
title: "${safeTitle}"
description: "${safeDescription}"
date: ${date}
category: ${category}
herramientas: [${herramientasYaml}]${imagenLine}${faqsYaml}
draft: true
---

import TablaComparativa from '../../components/TablaComparativa.astro';
import BannerAfiliado from '../../components/BannerAfiliado.astro';

${body.trim()}
`;

  fs.writeFileSync(outputPath, fileContent, 'utf-8');
  console.log(`✅ Borrador guardado en: src/content/blog/${filename}`);

  // Mark topic as used
  nextTopic.usado = true;
  fs.writeFileSync(TOPICS_FILE, JSON.stringify(topics, null, 2) + '\n', 'utf-8');
  console.log(`✅ Tema marcado como usado: "${nextTopic.tema}"`);

  // Write topic name for GitHub Actions to pick up
  fs.writeFileSync(DRAFT_TOPIC_FILE, nextTopic.tema, 'utf-8');

  if (existingArticles.length > 0) {
    console.log('↩️  Insertando enlaces inversos en artículos existentes...');
    await addReverseLinks(client, slug, title, description, existingArticles);
  }
}

generateDraft().catch(err => {
  console.error(`\n❌ Error generando borrador: ${err.message}`);
  process.exit(1);
});
