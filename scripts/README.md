# Scripts — Generación automática de borradores

## Cómo funciona

`generate-draft.js` lee `topics.json`, coge el primer tema con `"usado": false`, llama a la API de Anthropic y guarda el artículo generado en `src/content/blog/` con `draft: true`.

El workflow `daily-draft.yml` ejecuta este script cada día a las 8:00 AM UTC y hace commit automático del resultado.

## Requisitos

- Node.js 18+
- SDK de Anthropic instalado (`npm install`)
- Variable de entorno `ANTHROPIC_API_KEY`

## Añadir temas nuevos

Abre `scripts/topics.json` y añade objetos al final del array:

```json
{ "tema": "Nombre descriptivo del tema", "usado": false }
```

El tema puede ser tan descriptivo como quieras — Claude lo usará como punto de partida y generará el título final del artículo.

## Ejecutar manualmente

```bash
# Requiere la variable de entorno configurada
export ANTHROPIC_API_KEY=sk-ant-...

node scripts/generate-draft.js
```

En Windows (PowerShell):

```powershell
$env:ANTHROPIC_API_KEY = "sk-ant-..."
node scripts/generate-draft.js
```

## Publicar un borrador

Los artículos se generan con `draft: true`. Para publicarlos:

1. Abre el archivo en `src/content/blog/`
2. Revisa el contenido y edita lo que necesites
3. Cambia `draft: true` a `draft: false` en el frontmatter
4. Haz commit y push

```yaml
---
title: "Título del artículo"
description: "Descripción SEO"
date: 2026-06-09
category: generacion-texto
herramientas: ["Herramienta1"]
draft: false   # <-- cambiar esto
---
```

## GitHub Actions — configuración

El workflow necesita el secret `ANTHROPIC_API_KEY` en tu repositorio:

1. Ve a **Settings → Secrets and variables → Actions**
2. Añade un nuevo secret llamado `ANTHROPIC_API_KEY` con tu clave de API

El permiso `contents: write` ya está configurado en el workflow para que pueda hacer push automático.

## Cuando se agotan los temas

Si todos los temas tienen `"usado": true`, el script escribe un aviso en `scripts/temas-agotados.txt` y no genera ningún artículo. Añade temas nuevos al JSON para retomar la generación.
