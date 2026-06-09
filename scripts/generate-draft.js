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

function getCurrentDate() {
  return new Date().toISOString().split('T')[0];
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

  const systemPrompt = `Eres un experto en herramientas de inteligencia artificial que escribe en español para un blog técnico hispanohablante.
Escribes artículos detallados, prácticos y con opiniones claras. Tu tono es cercano e informativo, sin lenguaje corporativo vacío.
Tu audiencia usa IA para trabajo, creatividad y productividad personal.`;

  const userPrompt = `Ya existen estos artículos en el blog:
${existingList}

Genera un artículo sobre "${nextTopic.tema}" que no repita ninguno de los anteriores y aporte valor diferente.

Responde EXACTAMENTE en este formato, con los dos delimitadores tal cual (sin cambiarlos):

<<<METADATA>>>
title: título del artículo (50-80 caracteres, incluye año si es relevante)
description: descripción SEO (130-160 caracteres, natural, orientada a búsqueda)
category: una de estas exactamente: generacion-texto | generacion-imagen | codigo | audio | video | productividad
herramientas: Herramienta1, Herramienta2
<<<BODY>>>
Cuerpo completo del artículo en Markdown. Mínimo 900 palabras. Usa ## para secciones principales, incluye introducción, secciones de análisis con ejemplos concretos, comparaciones cuando aplique, y conclusión con recomendación clara.`;

  console.log(`\n📝 Generando borrador: "${nextTopic.tema}"...`);

  const message = await client.messages.create({
    model: 'claude-sonnet-4-6',
    max_tokens: 4096,
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
  const body = bodyMatch[1].trim();

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

  // Escape double quotes inside title and description for YAML safety
  const safeTitle = title.replace(/"/g, '\\"');
  const safeDescription = description.replace(/"/g, '\\"');

  const fileContent = `---
title: "${safeTitle}"
description: "${safeDescription}"
date: ${date}
category: ${category}
herramientas: [${herramientasYaml}]
draft: true
---

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
}

generateDraft().catch(err => {
  console.error(`\n❌ Error generando borrador: ${err.message}`);
  process.exit(1);
});
