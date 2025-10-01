ROL / MODO EXPERTO
Actúa como un equipo senior integrado de diseño web, identidad visual, UX/UI, front-end (Next.js 14 App Router + TypeScript + Tailwind + shadcn/ui), SEO técnico, analítica (GA4), CRO, accesibilidad (WCAG 2.2) y performance (Core Web Vitals). Tu responsabilidad es diseñar, redactar y programar el sitio oficial de SG Acabados (línea de SG Servicios Generales S.A.C.) enfocado en generar cotizaciones y posicionar la marca en Perú. Entrega el repositorio completo listo para desplegar en Vercel con dominio propio.

ESTILO / ACTITUD
Profesional, ambicioso y realista. Prioriza precisión sobre rapidez. Aplica escepticismo constructivo; marca riesgos y trade-offs cuando corresponda. Si tomas un atajo, justifícalo.

Parámetros ya definidos (no preguntar; implementar)

Despliegue: Vercel (Next.js 14).

Formularios: envío por SMTP/Nodemailer al correo oficial sgacabadossac@gmail.com
.

Analítica: GA4 habilitado (usa un ID placeholder G-XXXXXXXXXX que luego se reemplaza).

Blog/Recursos: preparar arquitectura pero no publicar en v1.

Imágenes: usar placeholders libres (Unsplash/Pexels) con rutas locales; luego se reemplazan.

Idioma: Español (ES-PE) únicamente en v1; preparar i18n básica para posible EN en v2.

Contacto: mostrar WhatsApp +51 959 375 235 y formulario; no mostrar teléfono/correo en el header (sí en footer y página Contacto).

Activos locales del usuario (copiar y usar):

Logo: "C:\Users\mateg\Documents\Mateo\SG SAC\Logo SG[1].png" → repositorio /public/logos/logo-sg.png

Catálogo PDF: "C:\Users\mateg\Documents\Mateo\SG SAC\SG Acabados\CATALOGO SG 2024.pdf" → /public/descargas/CATALOGO-SG-2024.pdf

Identidad de marca (usar como verdad)

Propuesta de valor: plazos cumplidos, soluciones integrales multi-especialidad, seguridad y sostenibilidad, adaptabilidad.
Cobertura: Perú. Sedes: Arequipa — Calle Misti 134, Yanahuara | Lima — Calle Buenos Aires 283, Miraflores.
Experiencia: +20 años. Proyectos: Aeropuerto Jorge Chávez, VIDENA, Cineplanet Cayma, Oficinas City Center, Clínica Arequipa, y retail.

Paleta

Carbón #1D1D1B (texto/títulos/iconos, fondos oscuros)

Arena SG #BD9C7A (acentos, botones secundarios, highlights)

Marfil #E3DCD5 (fondos suaves)

Blanco #FFFFFF

Neutro técnico #CED3D9 (bordes, tablas, fichas)

Estados: Éxito #2E7D32 | Advertencia #ED6C02 | Error #C62828

Tipografías

Títulos/nav: Plus Jakarta Sans 700/600

Cuerpo/UI: Inter 400/500

Cargar con next/font; fallback ui-sans-serif, system-ui.

Sistema visual

Contenedor 1200–1320 px, grid 12 col, gutter 24 px.

Espaciado 4/8/12/16/24/32/48/64; radios 12/16/24; sombra suave 12 px @ 10–14%.

Motion ≤200 ms (fade/slide-up), hover scale 1.02 en tarjetas.

Motivo gráfico: “láminas apiladas” inspirado en el isotipo.

Oferta / Taxonomía (colecciones y rutas)

Familias

Pisos: Vinílicos, Porcelanato, Alfombras, Deportivos, Grass sintético, Laminados, Estructurados de madera, Madera natural.

Iluminación: Interior, Exterior, Industrial, Decorativa.

Recubrimiento de ventanas: Cortinas, Persianas, Toldos.

Control solar: Celosías, Lamas orientables, Quiebravistas.

Mobiliario: Hospitalario, Tándem, Butacas, Archivos móviles, Mesas/Escritorios, Sillonería.

Sistemas integrales: Aire acondicionado, Contra incendios (NFPA), CCTV, Audio, Aislamiento termo-acústico.

Rutas

/ (Home)

/productos/ → familias y subfamilias (/productos/pisos/vinilico, etc.)

/soluciones/ → oficinas, retail, salud, educacion, industrial-minero, aeropuertos-transporte

/proyectos/ (grid filtrable) → /{slug} (detalle)

/nosotros/, /contacto/, /cotizar/ (form multistep)

/recursos/ preparado para v2 (no listar en nav en v1)

UX/UI por página (implementación exacta)

Home

Hero con claim + sub + CTAs:

Claim: “Acabados que elevan y cumplen plazos.”

Sub: Pisos, iluminación, control solar, mobiliario y sistemas integrales para proyectos en todo el Perú.

CTAs: Solicitar cotización (primario) y Ver proyectos (secundario).

Catálogo guiado (grid 2×3) con tarjetas de familias.

Soluciones por sector con “kits recomendados” claros.

Proyectos destacados (3–6) con métricas (m², especialidades, plazo).

“Por qué SG”: 4 pilares con iconos.

FAQs + CTA final sticky (WhatsApp + cotización).

Banner descarga “CATÁLOGO SG 2024” (link a /public/descargas/CATALOGO-SG-2024.pdf).

Categoría de producto

Hero breve + bullets de desempeño.

Filtros: interior/exterior; sector; desempeño (tránsito alto/impermeable/ignífugo/acústica); presupuesto (bajo/medio/alto).

Tarjetas de subfamilias con 3 beneficios y CTA “Ver ficha”.

Módulo cross-sell “Se instala con …” (piezas complementarias).

Descargas y FAQ técnico.

Ficha de subfamilia

Beneficios (3–5) + Tabla de especificaciones (formatos, resistencia, mantención, comportamiento al fuego si aplica) + Aplicaciones por sector.

Galería (placeholders).

Formulario “QuoteBuilder” contextual (área m², ciudad, sector/uso, tránsito, plazo, presupuesto rango, subir plano PDF/DWG, comentarios).

Botón WhatsApp con prefill:
Hola, quisiera cotizar [familia/sub] para [sector] en [ciudad], aprox [m²] m², plazo [fecha].
Enlace wa.me/51959375235?text=<mensaje%20urlencoded>.

Soluciones por sector

Pain points + kit recomendado + mini casos reales. CTA a cotización con parámetros del sector precargados.

Proyectos

Grid con filtros por sector/especialidad.

Detalle con alcance, m², plazo, cliente, ubicación, galería y aprendizaje.

Nosotros

Misión/visión, valores, equipo directivo, certificaciones/reconocimientos.

Sedes y datos de contacto visibles.

Contacto / Cotizar

Multistep (3 pasos, 8–10 campos), validación y consentimiento de uso de datos.

KPIs de confianza (20+ años, cobertura nacional, plazos).

WhatsApp destacado y link a catálogo.

Stack y entrega técnica

Tecnología

Next.js 14 (App Router) + TypeScript + Tailwind + shadcn/ui + Lucide.

Contenido file-based con MDX (o Contentlayer si facilita tipado).

Vercel para build/SSR/ISR.

Formularios (SMTP/Nodemailer)

Crear /api/lead/route.ts que envíe por SMTP a sgacabadossac@gmail.com.

.env con variables (poner placeholders y documentar en README):

SMTP_HOST= smtp.gmail.com

SMTP_PORT= 465

SMTP_SECURE= true

SMTP_USER= sgacabadossac@gmail.com

SMTP_PASS= <APP_PASSWORD_GMAIL> (usar App Password de Gmail; documentar cómo generarlo)

SMTP_FROM= "SG Acabados <sgacabadossac@gmail.com>"

LEAD_TO= sgacabadossac@gmail.com

Manejo de errores, validación y reCAPTCHA opcional (dejar hooks listos y comentados).

Estructura del repo

/app
  /(marketing)/layout.tsx
  /(marketing)/page.tsx            // Home
  /productos/page.tsx
  /productos/[familia]/page.tsx
  /productos/[familia]/[sub]/page.tsx
  /soluciones/[sector]/page.tsx
  /proyectos/page.tsx
  /proyectos/[slug]/page.tsx
  /nosotros/page.tsx
  /contacto/page.tsx
  /cotizar/page.tsx
  /api/lead/route.ts               // SMTP via Nodemailer
/components
  Hero.tsx, Section.tsx, Navbar.tsx, Footer.tsx, Button.tsx, Badge.tsx,
  ProductCard.tsx, Filters.tsx, QuoteBuilder.tsx, FAQ.tsx, ProjectCard.tsx,
  Marquee.tsx, Logo.tsx
/content
  /familias/**.mdx
  /sectores/**.mdx
  /proyectos/**.mdx
  /faqs/**.mdx
/public
  /logos/logo-sg.png
  /descargas/CATALOGO-SG-2024.pdf
  /images/** (placeholders)


Design tokens (Tailwind)

Añade colores de paleta y tipografías.

Breakpoints sm 640, md 768, lg 1024, xl 1280, 2xl 1536.

Usa container centrado y prose para MDX.

Interfaces TS

Familia (slug, nombre, resumen, beneficios[], specs{clave,valor}[], aplicaciones[], descargas[], imagenes[])

Sector (slug, pains[], kitRecomendado[])

Proyecto (slug, cliente, ubicacion, m2, plazo, especialidades[], resumen, galeria[])

FAQ (pregunta, respuesta, categoria)

Contenido seed (crear ahora)

6 fichas MDX: Vinílico; Iluminación interior; Celosías; Cortinas Screen; Sillería operativa; Aire acondicionado.

3 sectores: Oficinas, Retail, Salud (con kits).

5 proyectos: Jorge Chávez; VIDENA; Cineplanet Cayma; Oficinas City Center; Clínica Arequipa.

8–10 FAQs (plazos, garantías, posventa, instalación, mantenimiento).

SEO y analítica

Head: títulos ≤60, metas ≤155, OG/Twitter, favicon.

Schema.org (JSON-LD): Organization, LocalBusiness (2 sedes), Product/Service (familias), Project (proyectos).

Sitemap y robots.txt con next-sitemap.

URLs limpias siguiendo IA.

GA4: instalar gtag con ID G-XXXXXXXXXX y eventos:

view_item_list (categorías)

view_item (ficha)

generate_lead (submit)

file_download (PDF catálogo)

click_whatsapp

Accesibilidad y performance

WCAG 2.2 AA: contraste ≥4.5:1, :focus-visible, navegación por teclado, ARIA en accordions y formularios.

Core Web Vitals objetivo: LCP < 2.5 s, CLS < 0.1, INP < 200 ms.

Imágenes AVIF/WebP con next/image (priority en hero, lazy en el resto).

ISR/SSG donde aplique; evitar JS innecesario.

Definition of Done (entregar todo)

Repositorio Next.js 14 operativo (dev/build) con código completo y limpio (ESLint + Prettier).

Design System (tokens, tipografías, colores) y componentes listados.

Páginas: Home, Productos (landing + 6 familias), 3 sectores, Proyectos (grid + 5 detalles), Nosotros, Contacto, Cotizar (multistep con SMTP).

Formularios funcionando con Nodemailer hacia sgacabadossac@gmail.com + toasts de éxito/error.

SEO (metas, OG, Schema, sitemap/robots) y GA4 con eventos definidos.

README completo con: instalación, scripts (dev, build, start, lint, typecheck), .env (SMTP y GA4), cómo agregar/editar contenido MDX, cómo reemplazar imágenes, dónde colocar logo-sg.png y CATALOGO-SG-2024.pdf, y guía de despliegue en Vercel (incluye pasos DNS para conectar dominio).

QA con checklist de accesibilidad/SEO/performance y capturas Lighthouse ≥95/95/95/95 (Home + una ficha).

Instrucciones de ejecución (hacer ahora)

Genera el proyecto con Next.js 14 + TypeScript + Tailwind + shadcn/ui; configura Plus Jakarta Sans e Inter con next/font.

Implementa tokens, layout, Navbar/mega-menú, Footer, Hero, Cards, Filters, QuoteBuilder, FAQ, páginas y contenido seed descrito.

Copia el logo a /public/logos/logo-sg.png y el catálogo a /public/descargas/CATALOGO-SG-2024.pdf; agrega “Descargar catálogo” en Home, Productos y Footer.

Implementa /api/lead con Nodemailer (SMTP Gmail con App Password); valida campos y envía a sgacabadossac@gmail.com.

Añade GA4 (ID placeholder), JSON-LD schemas, next-sitemap, robots.txt.

Entrega el código completo y el README con pasos de despliegue en Vercel y conexión de dominio.

Si existe una alternativa más simple con igual o mayor impacto, proponla y justifícala.