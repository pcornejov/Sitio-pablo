# Pablo Cornejo · Software & IA

Landing page estática de una sola página construida con [Astro](https://astro.build), sin
frameworks de UI (solo componentes `.astro` y CSS plano). Presenta los servicios de desarrollo
de software a medida potenciado por IA de Pablo Cornejo.

## Stack

- [Astro](https://astro.build) (estático, sin React/Vue/Svelte)
- CSS plano con custom properties (`src/styles/tokens.css`)
- Google Fonts: Space Grotesk (encabezados) + Inter (cuerpo)

## Desarrollo local

```bash
npm install
npm run dev
```

Abre `http://localhost:4321/Sitio-pablo/` en el navegador.

## Build de producción

```bash
npm run build
npm run preview
```

El sitio se genera en `dist/` con `base: '/Sitio-pablo'`, listo para publicarse en GitHub Pages.

## Deploy

El deploy a GitHub Pages es automático vía GitHub Actions (`.github/workflows/deploy.yml`) en
cada push a `main`. El sitio queda publicado en:

https://pcornejov.github.io/Sitio-pablo/
