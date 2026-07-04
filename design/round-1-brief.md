# Brief de Diseño — Round 1
## Pablo Cornejo · Software & IA

Landing page en español, de una sola página, para un desarrollador de software independiente
con 12+ años de experiencia (SBPay, Contraloría General de la República de Chile, Previred),
especializado en desarrollo de software potenciado por IA. Sitio estático (Astro), CSS plano,
mobile-first. Deploy en GitHub Pages bajo `/Sitio-pablo/` (rutas relativas).

---

## 1. Paleta de colores

Fondo oscuro navy/índigo con acentos en gradiente violeta→cian para transmitir "IA" y tecnología
de vanguardia, sin perder seriedad/confianza (cliente enterprise: banca, gobierno).

| Uso | Token | Hex |
|---|---|---|
| Fondo principal | `--bg-base` | `#0B1120` |
| Fondo secundario (cards, contacto) | `--bg-surface` | `#111A2E` |
| Fondo elevado (hover, nav sticky) | `--bg-elevated` | `#161F38` |
| Borde sutil | `--border-subtle` | `rgba(255,255,255,0.08)` |
| Texto principal | `--text-primary` | `#F5F7FA` |
| Texto secundario | `--text-secondary` | `#94A3B8` |
| Texto terciario / meta | `--text-tertiary` | `#64748B` |
| Acento violeta | `--accent-violet` | `#8B5CF6` |
| Acento cian | `--accent-cyan` | `#22D3EE` |
| Gradiente IA (CTAs, íconos, bordes destacados) | `--gradient-ai` | `linear-gradient(135deg, #8B5CF6 0%, #22D3EE 100%)` |
| Éxito/confirmación (uso puntual) | `--accent-mint` | `#34D399` |

Reglas de uso:
- El gradiente `--gradient-ai` se reserva para: CTA primario (fondo), íconos de las 4 service
  cards (fondo del ícono), el borde superior de 2px del header al hacer scroll, y el borde de la
  tarjeta de contacto. No usar el gradiente en bloques grandes de texto ni en fondos completos de
  sección — es un acento, no un fondo.
- Texto sobre el gradiente siempre `#0B1120` (oscuro) o blanco puro `#FFFFFF`, nunca `--text-secondary`.
- Contraste verificado: `--text-primary` sobre `--bg-base` y `--bg-surface` cumple WCAG AA holgado;
  `--text-secondary` (#94A3B8) sobre `--bg-base` cumple AA para texto normal.

---

## 2. Tipografía

- **Encabezados:** `"Space Grotesk"` (Google Fonts) — geométrica, moderna, técnica. Pesos 500/700.
- **Cuerpo:** `"Inter"` (Google Fonts) — pesos 400/500/600. Alta legibilidad en párrafos largos.
- Fallback: `system-ui, -apple-system, sans-serif` en ambos.

Escala tipográfica (mobile → desktop, clamp fluido):

| Elemento | Tamaño | Peso | Line-height |
|---|---|---|---|
| H1 (hero) | `clamp(2rem, 5vw + 1rem, 3.25rem)` | 700 | 1.1 |
| H2 (título de sección) | `clamp(1.5rem, 3vw + 1rem, 2.25rem)` | 700 | 1.2 |
| H3 (título de card) | `1.25rem` | 600 | 1.3 |
| Eyebrow (kicker) | `0.875rem`, uppercase, letter-spacing 0.08em | 600 | 1.4 |
| Body / párrafo | `1rem` (`1.0625rem` en subheadline hero) | 400 | 1.6 |
| Small / meta / footer | `0.875rem` | 400 | 1.5 |
| Botón / CTA | `1rem` | 600 | 1 |

---

## 3. Layout por sección

### Header (sticky)
- Altura ~72px, `position: sticky; top:0`, fondo `--bg-base` con leve transparencia + blur al hacer
  scroll (`backdrop-filter: blur(8px)`), borde inferior sutil.
- Izquierda: logotipo textual "Pablo Cornejo" + badge pequeño "Software & IA".
- Derecha: nav simple (Servicios, Contacto) + botón CTA pequeño ("Contáctame") con gradiente.
- Mobile (<640px): nav de texto se oculta; queda logo + único botón CTA compacto (sin hamburguesa
  compleja para este round — página de una sola sección, scroll simple con anchors).

### Hero
- Centrado, `min-height: ~90vh` en desktop, padding vertical generoso.
- Orden vertical: eyebrow → H1 → subheadline (max-width ~640px) → fila de 2 CTAs (primario relleno
  con gradiente, secundario outline/ghost) → línea de métricas de confianza pequeña (ej. "+12 años
  de experiencia · Sector banca y gobierno").
- Fondo con glow decorativo sutil (radial-gradient violeta/cian muy tenue detrás del H1) para dar
  sensación "IA" sin saturar.

### Servicios (grid de 4 cards)
- H2 "Servicios" + copy corto de sección.
- Grid de 4 `ServiceCard`: ícono con fondo en gradiente (círculo/rounded-square 48px), H3, párrafo
  descriptivo 1-2 líneas.
- Cards: fondo `--bg-surface`, borde `--border-subtle`, radius 16px, hover con leve elevación
  (translateY -4px) y borde que pasa a usar el gradiente.

### Contacto
- Tarjeta central (max-width ~720px, margin auto), fondo `--bg-surface`, borde superior de 3px con
  `--gradient-ai`, radius 20px, padding generoso.
- H2 "Hablemos de tu proyecto" + copy invitando a escribir + 3 enlaces/botones (Email, WhatsApp,
  LinkedIn) dispuestos en fila (desktop) / columna (mobile), cada uno con ícono simple.

### Footer
- Minimal, una línea: © año + nombre, links secundarios pequeños (mismos de contacto), separador
  sutil arriba. Fondo `--bg-base`, texto `--text-tertiary`.

---

## 4. Breakpoints (mobile-first)

| Rango | Comportamiento |
|---|---|
| `< 640px` | 1 columna en todo; nav reducida; Servicios en columna única; contacto en columna. |
| `641px – 1024px` | Servicios en grid de 2 columnas; hero y contacto mantienen ancho centrado; nav completa aparece. |
| `> 1024px` | Servicios en grid de 4 columnas; contenedor máximo `max-width: 1200px` centrado con padding lateral fluido. |

Contenedor global: `.container { max-width: 1200px; margin-inline: auto; padding-inline: clamp(1.25rem, 4vw, 2.5rem); }`

---

## 5. Tono / voz

Cercano pero experto. Se dirige de tú al lector (dueño de negocio o líder técnico), evita
jerga innecesaria, pone el foco en resultados (rapidez de entrega, menos errores, escalabilidad)
y respalda con experiencia real (bancos, gobierno) sin sonar corporativo-frío. Frases cortas,
directas, con un llamado a la acción claro en cada sección clave.

---

## 6. Component breakdown (para el builder → Astro)

| Componente Astro | Contenido |
|---|---|
| `Header.astro` | Logo/marca, nav (Servicios, Contacto), CTA "Contáctame", sticky + blur on scroll |
| `Hero.astro` | Eyebrow, H1, subheadline, 2 CTAs, línea de métricas/confianza |
| `ServiceCard.astro` | Prop-driven: icon (slot/svg), title, description — reutilizado 4 veces |
| `Servicios.astro` | H2 + intro + grid que renderiza 4× `ServiceCard` |
| `Contacto.astro` | Tarjeta central, H2, copy, 3 links (email/WhatsApp/LinkedIn) |
| `Footer.astro` | Copyright, links secundarios |

Variables de diseño (colores, tipografía, spacing, radius) deben vivir en un archivo CSS global
(`:root` custom properties) para que todos los componentes las compartan — ver mockup adjunto
(`round-1-mockup.html`) como referencia exacta de valores e implementación visual.
