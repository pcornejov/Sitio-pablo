# Checklist Round 3 — Pulido final (a11y, SEO, performance)
## Pablo Cornejo · Software & IA

Round 3 no cambia visual ni copy (eso ya cerró en Round 1-2). Este documento es
una checklist de implementación directa para el builder: accesibilidad, SEO y
performance. Cada ítem indica archivo, cambio exacto y, cuando aplica, el
snippet listo para pegar.

---

## 1. Accesibilidad (a11y)

### 1.1 Contraste de color — verificado con fórmula WCAG (luminancia relativa)

Ratios calculados sobre los fondos reales del sitio:

| Par | Ratio | Umbral AA | Resultado |
|---|---|---|---|
| `--text-primary` (#F5F7FA) / `--bg-base` (#0B1120) | 17.54:1 | 4.5:1 (texto normal) | ✅ Holgado |
| `--text-primary` / `--bg-surface` (#111A2E) | 16.16:1 | 4.5:1 | ✅ Holgado |
| `--text-secondary` (#94A3B8) / `--bg-base` | 7.34:1 | 4.5:1 | ✅ Cumple |
| `--text-secondary` / `--bg-surface` | 6.76:1 | 4.5:1 | ✅ Cumple |
| `--text-tertiary` (#64748B) / `--bg-base` | **3.96:1** | 4.5:1 | ❌ **No cumple para texto normal** |
| `--text-tertiary` / `--bg-surface` | **3.64:1** | 4.5:1 | ❌ **No cumple para texto normal** |
| `--accent-cyan` (#22D3EE) / `--bg-base` (eyebrow, focus ring) | 10.42:1 | 3:1 (uso decorativo/UI) | ✅ Cumple |
| Texto `#05070D` sobre `--gradient-ai` (extremo violeta) | 4.76:1 | 4.5:1 | ✅ Cumple (por poco) |
| Texto `#05070D` sobre `--gradient-ai` (extremo cian) | 11.14:1 | 4.5:1 | ✅ Holgado |

**Hallazgo accionable:** `--text-tertiary` solo cumple AA para texto grande
(≥18.66px negrita o ≥24px regular, umbral 3:1), pero hoy se usa en texto de
14px/13px en tres lugares concretos:

- `Footer.astro` → `.footer-inner p` (copyright, 0.875rem = 14px)
- `Hero.astro` → `.hero-trust` (0.875rem = 14px)
- `Contacto.astro` → `.contact-link .label-sub` (0.8125rem = 13px)

**Fix recomendado (sin cambiar layout/composición, solo el token de color):**
cambiar esas tres reglas de `color: var(--text-tertiary)` a
`color: var(--text-secondary)`. Es el único ajuste de color de este round;
no toca nada visual estructural, solo sube el contraste de meta-texto a un
nivel conforme. `--text-tertiary` puede conservarse para usos futuros no
textuales (bordes, iconografía decorativa) pero no debe usarse en texto
&lt;18px.

### 1.2 Landmarks y jerarquía de encabezados — confirmado, sin cambios necesarios

- `<header>` (Header.astro), `<main>` (index.astro envuelve Hero/Servicios/Contacto),
  `<footer>` (Footer.astro): ✅ presentes y correctos.
- Jerarquía: `h1` (Hero, único por página) → `h2` Servicios → `h3` ×4 ServiceCard
  → `h2` Contacto. Sin saltos de nivel. ✅ Confirmado, no requiere cambios.

### 1.3 Skip-to-content link — FALTA, implementar

Agregar en `src/layouts/BaseLayout.astro`, como primer elemento hijo de
`<body>` (antes de `<slot />`):

```html
<a href="#main-content" class="skip-link">Saltar al contenido principal</a>
```

CSS (agregar a `src/styles/global.css`):

```css
.skip-link {
  position: absolute;
  top: -100%;
  left: var(--space-4);
  z-index: 100;
  background: var(--bg-elevated);
  color: var(--text-primary);
  padding: var(--space-3) var(--space-5);
  border-radius: var(--radius-sm);
  border: 1px solid var(--accent-cyan);
  font-weight: 600;
  transition: top 0.15s ease;
}

.skip-link:focus-visible {
  top: var(--space-4);
}
```

Y en `src/pages/index.astro`, agregar el id al `<main>`:

```html
<main id="main-content">
```

### 1.4 `aria-label`s

- `Header.astro` → `<nav class="nav-links">` necesita
  `aria-label="Navegación principal"`.
- `Header.astro` → `<nav class="mobile-quicklinks">` necesita
  `aria-label="Navegación rápida"`.
- Iconos decorativos: `ServiceCard.astro` (`.service-icon` con
  `aria-hidden="true"`) y `Contacto.astro` (`.icon-dot` con
  `aria-hidden="true"`) → ✅ **ya implementado correctamente**, confirmado, sin
  cambios.
- Enlaces que abren en nueva pestaña (WhatsApp y LinkedIn, presentes en
  `Contacto.astro` y `Footer.astro`, ambos con `target="_blank" rel="noopener"`):
  agregar texto visualmente oculto para lectores de pantalla. Usar una clase
  utilitaria `.visually-hidden` (agregar a `global.css` si no existe):

```css
.visually-hidden {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}
```

  Y en cada enlace con `target="_blank"` (WhatsApp y LinkedIn, en ambos
  componentes), agregar al final del contenido del link:

```html
<span class="visually-hidden">(se abre en una nueva pestaña)</span>
```

  (El link de Email no lleva `target="_blank"`, no necesita este texto.)

### 1.5 `lang="es"` — confirmado

`src/layouts/BaseLayout.astro` línea 16: `<html lang="es">`. ✅ Ya está, sin
cambios.

### 1.6 `prefers-reduced-motion` — FALTA, implementar

Agregar a `src/styles/global.css` (al final del archivo). Cubre: scroll suave
global, hover con `translateY` en `.btn-primary`/`.btn-secondary`,
`.service-card`, `.contact-link`, y las transiciones de borde/color en nav:

```css
@media (prefers-reduced-motion: reduce) {
  html {
    scroll-behavior: auto;
  }

  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }

  .btn-primary:hover,
  .btn-secondary:hover,
  .btn-primary:active,
  .service-card:hover,
  .contact-link:hover,
  .contact-link:focus-visible {
    transform: none;
  }
}
```

La regla universal (`*, *::before, *::after`) neutraliza duración de
transiciones/animaciones para cualquier caso futuro; el bloque de `transform:
none` es el refuerzo explícito para los hovers con elevación que existen hoy
(botones, service cards, contact links), ya que algunos navegadores no anulan
`transform` solo con `transition-duration: 0`.

---

## 2. SEO

### 2.1 `<title>` — texto final exacto

```
Pablo Cornejo · Desarrollo de Software a Medida con IA
```

(54 caracteres — dentro del límite recomendado ~60. Una sola página, no se
necesita plantilla de título por subpágina.) Ya se pasa como prop `title` a
`BaseLayout` desde `src/pages/index.astro`; solo actualizar el valor del
`<BaseLayout title="...">` en esa línea (hoy dice `"Pablo Cornejo · Software &
IA"`).

### 2.2 Meta description — texto final exacto

```
Desarrollo de software a medida e Inteligencia Artificial para banca, gobierno y fintech. +12 años de experiencia en Chile y LATAM. Consultoría gratuita.
```

(153 caracteres — dentro del rango ideal ~150-160.) Actualizar el default de
`description` en `BaseLayout.astro` (línea 11) a este texto, o pasarlo
explícito como prop desde `index.astro`.

### 2.3 Open Graph — agregar en `<head>` de `BaseLayout.astro`

```html
<meta property="og:type" content="website" />
<meta property="og:url" content="https://pcornejov.github.io/Sitio-pablo/" />
<meta property="og:title" content="Pablo Cornejo · Desarrollo de Software a Medida con IA" />
<meta property="og:description" content="Desarrollo de software a medida e Inteligencia Artificial para banca, gobierno y fintech. +12 años de experiencia en Chile y LATAM. Consultoría gratuita." />
<meta property="og:image" content="https://pcornejov.github.io/Sitio-pablo/og-image.png" />
<meta property="og:locale" content="es_CL" />
```

**Imagen OG:** no hay foto real del autor, así que se recomienda generar una
imagen de marca simple (1200×630px, formato **PNG** — los crawlers de
Facebook/LinkedIn/Twitter no garantizan renderizar SVG como preview, PNG/JPG
es lo seguro), reutilizando la paleta y el gradiente ya definidos: fondo
`--bg-base`, el `--gradient-ai` como acento (por ejemplo un bloque o texto con
gradiente), texto "Pablo Cornejo" + "Desarrollo de Software con IA" en
`--font-heading`. Guardar como `public/og-image.png`. Esto es trabajo de
implementación del builder (generar el PNG), no requiere un mockup HTML
adicional de este round.

### 2.4 Twitter Card — agregar junto a los tags OG

```html
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="Pablo Cornejo · Desarrollo de Software a Medida con IA" />
<meta name="twitter:description" content="Desarrollo de software a medida e Inteligencia Artificial para banca, gobierno y fintech. +12 años de experiencia en Chile y LATAM. Consultoría gratuita." />
<meta name="twitter:image" content="https://pcornejov.github.io/Sitio-pablo/og-image.png" />
```

### 2.5 Canonical link

```html
<link rel="canonical" href="https://pcornejov.github.io/Sitio-pablo/" />
```

### 2.6 `theme-color`

```html
<meta name="theme-color" content="#0B1120" />
```

(Coincide con `--bg-base`.)

### 2.7 Sitemap

- Agregar el paquete `@astrojs/sitemap`:
  ```
  npx astro add sitemap
  ```
  o instalar manualmente y registrar en `astro.config.mjs`:
  ```js
  import { defineConfig } from 'astro/config';
  import sitemap from '@astrojs/sitemap';

  export default defineConfig({
    site: 'https://pcornejov.github.io',
    base: '/Sitio-pablo',
    integrations: [sitemap()],
  });
  ```
- `site` ya está configurado (requisito de la integración) — sin cambios ahí.
- Genera `sitemap-index.xml` automáticamente en el build, no requiere mockup.

### 2.8 `robots.txt` — actualizar

`public/robots.txt` actual es solo:
```
User-agent: *
Allow: /
```

Reemplazar por:
```
User-agent: *
Allow: /

Sitemap: https://pcornejov.github.io/Sitio-pablo/sitemap-index.xml
```

### 2.9 Favicon / iconos

- `public/favicon.svg` ya existe y cubre navegadores modernos + pestañas.
  ✅ Sin cambios.
- **Única adición recomendada:** `public/apple-touch-icon.png` (180×180px),
  para el ícono al agregar el sitio a la pantalla de inicio en iOS (Safari no
  usa el SVG favicon para esto). Referenciar en `BaseLayout.astro`:
  ```html
  <link rel="apple-touch-icon" sizes="180x180" href={`${import.meta.env.BASE_URL.replace(/\/$/, "")}/apple-touch-icon.png`} />
  ```
- No se recomienda generar el set completo de 8-10 tamaños (16/32/48/192/512,
  manifest.json, etc.) — fuera de alcance para este sitio simple; el SVG +
  apple-touch-icon cubren el caso real de uso en 2026.

---

## 3. Performance

### 3.1 Fuentes (Google Fonts)

- `BaseLayout.astro` ya usa `rel="preconnect"` a `fonts.googleapis.com` y
  `fonts.gstatic.com`, y el link de stylesheet ya incluye `&display=swap`.
  ✅ Confirmado, sin cambios. No se recomienda self-host de fuentes para este
  alcance (una sola página, carga ya optimizada con preconnect + swap).

### 3.2 Imágenes

- No hay imágenes raster en el contenido (todo son SVG inline + gradientes
  CSS) → no hay trabajo de optimización de imágenes pendiente, más allá del
  archivo `og-image.png` nuevo del punto 2.3 (ese archivo no se renderiza en
  la página, solo lo leen los crawlers de redes sociales, así que no afecta
  performance de carga del sitio).

### 3.3 Layout shift (CLS)

- Sin imágenes en el área de contenido no hay riesgo de CLS por
  `width`/`height` faltantes. ✅ Confirmado, sin acción requerida.

---

## 4. Resumen de archivos a tocar (para el builder)

| Archivo | Cambios |
|---|---|
| `src/layouts/BaseLayout.astro` | skip-link, `aria-label`s de nav (vía componentes), meta OG/Twitter/canonical/theme-color, título/descripción actualizados, `apple-touch-icon` link |
| `src/pages/index.astro` | `id="main-content"` en `<main>`, `title` prop actualizado |
| `src/styles/global.css` | `.skip-link`, `.visually-hidden`, bloque `prefers-reduced-motion` |
| `src/components/Header.astro` | `aria-label` en `.nav-links` y `.mobile-quicklinks` |
| `src/components/Contacto.astro` | `color: var(--text-secondary)` en `.label-sub`; texto oculto "(se abre en una nueva pestaña)" en WhatsApp/LinkedIn |
| `src/components/Footer.astro` | `color: var(--text-secondary)` en el párrafo de copyright; texto oculto en WhatsApp/LinkedIn |
| `src/components/Hero.astro` | `color: var(--text-secondary)` en `.hero-trust` |
| `astro.config.mjs` | agregar integración `@astrojs/sitemap` |
| `public/robots.txt` | agregar línea `Sitemap:` |
| `public/og-image.png` | nuevo archivo, 1200×630px |
| `public/apple-touch-icon.png` | nuevo archivo, 180×180px |
