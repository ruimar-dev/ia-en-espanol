# IA en Español

Blog de reviews y comparativas de herramientas de inteligencia artificial en español. Construido con Astro 4 y Tailwind CSS.

## Inicio rápido

```bash
npm install
cp .env.example .env
npm run dev
```

La app arranca en `http://localhost:4321`.

## Variables de entorno

| Variable   | Descripción                          | Ejemplo                      |
|------------|--------------------------------------|------------------------------|
| `SITE_URL` | URL pública del sitio (para SEO/OG)  | `https://iaenespanol.com`    |

## Añadir un artículo nuevo

1. Crea un fichero `.mdx` en `src/content/blog/`:

```
src/content/blog/mi-nuevo-articulo.mdx
```

2. Añade el frontmatter obligatorio:

```yaml
---
title: "Título del artículo"
description: "Descripción para SEO y tarjetas (150–160 caracteres)."
date: 2024-12-01
category: generacion-texto
herramientas: ["ChatGPT", "Claude"]
afiliado: "https://enlace-afiliado.com"   # Opcional
imagen: "/images/mi-imagen.jpg"           # Opcional (1200×630 recomendado)
draft: false
---
```

**Categorías disponibles:**

| Valor                | Label                  |
|----------------------|------------------------|
| `generacion-texto`   | Generación de texto    |
| `generacion-imagen`  | Generación de imagen   |
| `codigo`             | Código                 |
| `audio`              | Audio                  |
| `video`              | Video                  |
| `productividad`      | Productividad          |

3. Escribe el contenido en Markdown/MDX.

## Usar TablaComparativa en un artículo

Importa el componente al inicio del fichero `.mdx`:

```mdx
import TablaComparativa from '../../components/TablaComparativa.astro';
```

Luego úsalo en el cuerpo:

```mdx
<TablaComparativa
  titulo="Comparativa de modelos LLM"
  herramientas={[
    {
      nombre: "Claude 3.5 Sonnet",
      precio: "$20/mes",
      puntuacion: 4.8,
      idealPara: "Escritura y análisis",
      enlaceAfiliado: "https://claude.ai"
    },
    {
      nombre: "ChatGPT-4o",
      precio: "$20/mes",
      puntuacion: 4.7,
      idealPara: "Uso general",
      enlaceAfiliado: "https://chatgpt.com"
    }
  ]}
/>
```

**Props de `TablaComparativa`:**

| Prop          | Tipo          | Requerido | Descripción                    |
|---------------|---------------|-----------|--------------------------------|
| `herramientas`| `Herramienta[]` | Sí      | Array de herramientas          |
| `titulo`      | `string`      | No        | Título encima de la tabla      |

**Tipo `Herramienta`:**

| Campo           | Tipo     | Requerido | Descripción                    |
|-----------------|----------|-----------|--------------------------------|
| `nombre`        | `string` | Sí        | Nombre de la herramienta       |
| `precio`        | `string` | Sí        | Precio (texto libre)           |
| `puntuacion`    | `number` | Sí        | Puntuación 0–5                 |
| `idealPara`     | `string` | Sí        | Caso de uso principal          |
| `enlaceAfiliado`| `string` | No        | URL del enlace de afiliado     |

## Usar BannerAfiliado

```mdx
import BannerAfiliado from '../../components/BannerAfiliado.astro';

<BannerAfiliado
  titulo="Prueba Claude gratis"
  descripcion="El plan gratuito incluye acceso al modelo más avanzado."
  cta="Empezar gratis"
  url="https://claude.ai"
  badge="Recomendado"
/>
```

## Estructura del proyecto

```
src/
├── components/
│   ├── ArticuloCard.astro      # Tarjeta de artículo en listados
│   ├── BannerAfiliado.astro    # CTA para insertar en artículos
│   ├── Footer.astro
│   ├── Header.astro            # Navegación + ThemeToggle
│   ├── SEO.astro               # Meta tags, OG, JSON-LD
│   ├── TablaComparativa.astro  # Tabla responsive de comparativa
│   ├── TarjetaHerramienta.astro # Card de herramienta con rating
│   └── ThemeToggle.astro       # Toggle dark/light mode
├── content/
│   ├── config.ts               # Schema de Content Collections
│   └── blog/                   # Artículos (.mdx)
├── layouts/
│   ├── ArticuloLayout.astro    # Layout para páginas de artículo
│   └── Layout.astro            # Layout base
└── pages/
    ├── index.astro             # Home
    ├── blog/
    │   ├── index.astro         # Listado con filtro por categoría
    │   └── [slug].astro        # Artículo individual
    ├── comparativas/
    │   └── index.astro         # Listado de comparativas
    ├── herramientas/
    │   └── index.astro         # Directorio de herramientas
    └── sobre-mi.astro          # Página estática
```

## Scripts disponibles

| Comando          | Acción                                  |
|------------------|-----------------------------------------|
| `npm run dev`    | Servidor de desarrollo en puerto 4321   |
| `npm run build`  | Genera el sitio estático en `dist/`     |
| `npm run preview`| Previsualiza el build de producción     |
