# Brief de Diseño — Round 2
## Pablo Cornejo · Software & IA — Refinamiento

Round 1 dejó la estructura, paleta y tipografía funcionando en producción
(https://pcornejov.github.io/Sitio-pablo/). Este Round 2 no cambia la base: la
refina. Cuatro focos: (1) una escala de espaciado formal en vez de valores
sueltos en rem, (2) estados de interacción completos —incluyendo `:focus-visible`,
ausente en Round 1 y crítico para accesibilidad de teclado—, (3) confirmación/ajuste
del set de íconos, (4) una decisión concreta sobre navegación mobile, y (5) copy
final en español para todas las secciones.

---

## 1. Escala de espaciado

Se introduce una escala de 9 pasos en `tokens.css`, base 4px, para reemplazar los
valores de `rem` sueltos que hoy conviven sin sistema (`0.6rem`, `0.85rem`, `2.5rem`,
etc.). Todo espaciado fijo (no ligado a tipografía fluida) debe usar uno de estos
tokens.

| Token | Valor | Uso previsto |
|---|---|---|
| `--space-1` | 4px | Gaps mínimos (punto del `icon-dot`, separación ícono-texto muy ajustada) |
| `--space-2` | 8px | Gap `.brand` (logo + badge), gap ícono-texto en botones y eyebrow |
| `--space-3` | 12px | Gap interno `.section-head`, gap `.contact-links` (mobile), padding vertical de botones |
| `--space-4` | 16px | Gap `.hero-ctas`, gap interno de `.service-card`, gap `.footer-inner`, `.header-actions`, padding vertical de `.contact-link` |
| `--space-5` | 24px | Gap `.hero-inner`, gap `.footer-links`, padding horizontal de `.contact-link` |
| `--space-6` | 32px | Padding de `.service-card`, gap de `.services-grid`, padding vertical `.site-footer`, mínimo de padding de `.contact-card`, gap `.nav-links` |
| `--space-7` | 48px | Margen inferior de `.section-head` (sube de 40px a 48px — más aire antes del grid de cards), máximo de padding de `.contact-card` |
| `--space-8` | 64px | Padding vertical mínimo de `.hero` en mobile (referencia; el valor real sigue en `clamp()`) |
| `--space-9` | 96px | Referencia para el tope superior del `clamp()` de `.hero` en desktop |

Reglas:
- Los `clamp()` fluidos de tipografía y de padding de sección (`.hero`, `section`,
  `.contact-card`) **se mantienen** — no se reemplazan por tokens fijos porque su
  gracia es escalar con el viewport. Los tokens de espaciado son para gaps y
  paddings de componentes internos que hoy son valores fijos.
- Ningún componente debe declarar un valor de espaciado fuera de esta escala
  salvo los `clamp()` ya documentados en Round 1.
- Cambios de valor concretos respecto a Round 1 (ajustes menores de redondeo,
  ver mockup): `.service-card` padding 28px→32px; `.section-head` margin-bottom
  40px→48px; `.contact-links` gap 13.6px→12px; `.contact-link` padding
  13.6px/20px→16px/24px. Visualmente casi imperceptibles, pero alinean todo a la
  grilla de 4px.

---

## 2. Estados: hover, focus-visible, elevación

### 2.1 Botones
- **`.btn-primary` hover** (confirmado de Round 1): `translateY(-2px)` +
  `box-shadow: 0 10px 30px -10px rgba(139,92,246,0.55)`. Se agrega **estado
  `:active`**: `translateY(0)` y sombra reducida a `0 4px 14px -6px rgba(139,92,246,0.5)`
  para dar feedback táctil de "presionado" (ausente en Round 1).
- **`.btn-secondary` hover** (refinado): fondo `--bg-elevated` + borde
  `rgba(34,211,238,0.35)` (antes borde blanco neutro `rgba(255,255,255,0.16)`).
  Se cambia a cian para conectar visualmente con el acento de marca en vez de un
  gris genérico. `:active`: `translateY(0)`.

### 2.2 Service cards
Confirmado de Round 1, con un refuerzo: `translateY(-4px)` + `border-color:
rgba(139,92,246,0.4)` **+ `box-shadow: 0 20px 40px -24px rgba(139,92,246,0.35)`**
(nuevo — da sensación real de elevación, no solo cambio de borde). Transición
`transform 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease`.

### 2.3 Enlaces de contacto
Confirmado: borde pasa a `rgba(34,211,238,0.45)` + `translateY(-2px)`. Se agrega
`background: var(--bg-surface)` en hover (parte de `--bg-elevated` actual, sube un
punto más de brillo) para reforzar el feedback.

### 2.4 Enlaces de navegación (header, footer)
Confirmado el cambio de color a `--text-primary` en hover. Se agrega un
subrayado animado sutil: `border-bottom: 2px solid transparent` en reposo →
`border-bottom-color: var(--accent-cyan)` en hover/focus, con
`transition: color 0.15s ease, border-color 0.15s ease`. Esto da una señal
adicional más allá del color (mejor para daltonismo).

### 2.5 `:focus-visible` (nuevo — crítico, faltaba en Round 1)
Regla global en `global.css`:

```css
a:focus-visible,
button:focus-visible,
.btn:focus-visible {
  outline: 2px solid var(--accent-cyan);
  outline-offset: 3px;
  border-radius: 4px;
}
```

- Se usa `:focus-visible` (no `:focus`) para que el anillo solo aparezca en
  navegación por teclado, no al hacer click con mouse.
- No se remueve el `outline` por defecto en ningún selector sin reemplazarlo por
  esta regla — Round 1 no tocaba `outline` así que el navegador ya lo mostraba
  de forma inconsistente entre elementos; esta regla lo unifica.
- Para `.service-card` (no es interactivo como link/botón, pero si en el futuro
  se envuelve en `<a>`, aplicar el mismo outline con `outline-offset: 2px`).

---

## 3. Set de íconos (4 service cards)

Revisión de los 4 SVG inline de Round 1: contenedor 48×48px, ícono 24×24px,
`stroke-width: 2`, `stroke-linecap/linejoin: round`, `fill: none`, color heredado
(`currentColor` = `#05070D` sobre el fondo con gradiente). **Regla de estilo para
cualquier ícono futuro**: mismo viewBox `0 0 24 24`, mismo stroke-width 2,
mismo contenedor 48px con `border-radius: var(--radius-sm)` y fondo
`--gradient-ai`.

Confirmación/ajuste por card:

| Card | Ícono Round 1 | Decisión Round 2 |
|---|---|---|
| Desarrollo de Software a Medida | `<>` corchetes de código | **Confirmado**, es el más directo para "código a medida" |
| Automatización e Integración con IA | flecha circular tipo reloj/refresh | **Confirmado**, comunica bien "ciclo automatizado" |
| Modernización de Sistemas Legacy | grilla de 4 cuadrados | **Ajustado** — una grilla lee como "módulos/dashboard", no como "migración a la nube". Se reemplaza por un ícono de **nube con flecha hacia arriba** (cloud-upload), que comunica directamente "migración a AWS" sin ambigüedad. Ver path en mockup. |
| Consultoría Tecnológica y Prototipado Rápido | engranaje (settings) | **Confirmado**, "engranaje" es universalmente leído como configuración/consultoría técnica |

---

## 4. Navegación mobile — decisión

**Contexto:** Round 1 oculta `.nav-links` bajo 641px, dejando solo logo + botón
"Contáctame" en el header mobile. Esto significa que un usuario en mobile **no
tiene ninguna forma de saltar a "Servicios"** salvo hacer scroll manual — el único
CTA visible lleva directo a Contacto.

**Decisión: no usar hamburguesa/overlay** (es una landing de una sola página con
2 anchors; una hamburguesa sería sobre-ingeniería para 2 links). En su lugar, se
agrega una **barra secundaria compacta solo-mobile** debajo del header:

- Nuevo bloque `.mobile-quicklinks`, hijo directo de `<body>` inmediatamente
  después de `.site-header` (no es `sticky`, fluye con la página — no compite
  con el header al hacer scroll).
- Contenido: los mismos 2 anchors (`Servicios`, `Contacto`) en una fila
  horizontal centrada, separados por un punto medio `·`, `font-size: 0.8125rem`,
  color `--text-secondary`, altura ~40px, borde inferior sutil
  (`--border-subtle`) para separarlo visualmente del hero.
- Visible solo `< 641px` (`display: none` desde 641px en adelante, donde el nav
  completo ya aparece dentro del header mismo).
- Justificación: resuelve el hueco de usabilidad real (no hay forma de llegar a
  Servicios en mobile sin este cambio) sin la complejidad de un menú hamburguesa,
  y desaparece automáticamente en tablet/desktop sin lógica JS adicional —
  puro CSS, consistente con el enfoque "sitio estático simple" del proyecto.

---

## 5. Copy final (español)

Un ajuste de voz transversal: el sitio es de **un desarrollador independiente**
(no un equipo/agencia), pero el copy de Round 1 usaba plural ("Construimos",
"Integramos", "Migramos"). Round 2 pasa a **primera persona singular**
("Construyo", "Integro", "Migro", "Te ayudo") para que la voz sea consistente
con "developer independiente" del brief de Round 1 — más auténtico y coherente
con el resto del tono cercano/directo. El resto del tono (tú, directo, enfocado
en resultados) se mantiene igual que Round 1.

### Header
- Logo: `Pablo Cornejo` + badge `Software & IA` (sin cambios)
- Nav: `Servicios` · `Contacto`
- CTA: `Contáctame`

### Hero
- Eyebrow: **Desarrollo de software impulsado por Inteligencia Artificial**
- H1: **Software a medida, entregado más rápido gracias a la IA**
- Subheadline: **Diseño y desarrollo soluciones de software para tu negocio,
  combinando ingeniería sólida con inteligencia artificial de última
  generación: entregas más rápidas, menos errores y productos que evolucionan
  contigo.**
- CTA primario: **Agenda una consultoría gratuita**
- CTA secundario: **Ver servicios**
- Trust line: **+12 años de experiencia · Banca, gobierno y fintech (SBPay,
  Previred, Contraloría General de la República)**

### Servicios
H2: `Servicios` (sin cambios). Intro: **Soluciones de software pensadas para
crecer con tu negocio, desde el primer prototipo hasta sistemas críticos en
producción.** (sin cambios, ya es concisa y clara)

1. **Desarrollo de Software a Medida**
   Construyo aplicaciones y microservicios a medida con Node.js, NestJS, Java y
   Angular, diseñados en torno a los procesos reales de tu negocio.

2. **Automatización e Integración con IA**
   Integro modelos de IA en tus flujos de trabajo y conecto sistemas —incluyendo
   integraciones bancarias y gubernamentales— para automatizar tareas y reducir
   errores manuales.

3. **Modernización de Sistemas Legacy**
   Migro aplicaciones Java y Angular hacia arquitecturas modernas en la nube
   (AWS, Docker), mejorando rendimiento, seguridad y facilidad de mantenimiento.

4. **Consultoría Tecnológica y Prototipado Rápido**
   Te ayudo a validar ideas rápido: arquitectura, elección de stack y
   prototipos funcionales apoyados en IA para llegar antes al mercado.

### Contacto
- H2: `Hablemos de tu proyecto` (sin cambios)
- Copy: **Cuéntame qué necesitas y conversemos, sin costo, sobre cómo la IA y
  una ingeniería sólida pueden acelerar tu próximo proyecto de software.**
- 3 métodos de contacto (el builder implementa los `href` reales; aquí se
  especifica el texto visible):

| Método | Texto visible | Href real |
|---|---|---|
| Email | `pablo.cornejo.v@gmail.com` | `mailto:pablo.cornejo.v@gmail.com` |
| WhatsApp | `+56 9 5759 1164` (con etiqueta pequeña "WhatsApp" encima o al lado del ícono) | `https://wa.me/56957591164` |
| LinkedIn | `LinkedIn — Pablo Cornejo Villarroel` | `https://www.linkedin.com/in/pablo-cornejo-villarroel-43973a59/` con `target="_blank" rel="noopener"` |

Nota sobre formato del teléfono: mostrar siempre con espacios legibles
`+56 9 5759 1164` (nunca el string plano `56957591164`), y usar ese mismo string
sin espacios ni `+` para el deep-link de WhatsApp (`wa.me/56957591164`).

### Footer
- Links secundarios: mismos 3 métodos que Contacto, mismo texto visible
  (`pablo.cornejo.v@gmail.com`, `+56 9 5759 1164`, `LinkedIn`) — en footer puede
  usarse la versión corta `LinkedIn` sin el nombre completo, por espacio.
- Copyright: **© {año} Pablo Cornejo · Software & IA. Todos los derechos
  reservados.** (sin cambios, el año se calcula dinámicamente en `Footer.astro`)

---

## 6. Resumen para el builder

- Agregar tokens `--space-1` … `--space-9` a `tokens.css` y migrar los gaps/paddings
  fijos listados en la sección 1 (no tocar los `clamp()` existentes).
- Agregar bloque `:focus-visible` global en `global.css` (sección 2.5).
- Reforzar hover de `.service-card` con `box-shadow` adicional; cambiar borde de
  hover de `.btn-secondary` a tono cian; agregar subrayado hover/focus en links
  de nav; agregar `:active` state a `.btn-primary`/`.btn-secondary`.
- Reemplazar el ícono SVG de la card "Modernización de Sistemas Legacy" por el
  ícono cloud-upload (path en `round-2-mockup.html`).
- Implementar `.mobile-quicklinks` (barra solo mobile, sección 4) en
  `Header.astro` o como bloque hermano en el layout principal.
- Reemplazar todo el copy de Hero, Servicios, Contacto y Footer por el texto de
  la sección 5, incluyendo los `href` reales de contacto.
