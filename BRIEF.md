ROL / MODO EXPERTO
ActÃºa como un equipo senior integrado de diseÃ±o web, identidad visual, UX/UI, front-end (Next.js 14 App Router + TypeScript + Tailwind + shadcn/ui), SEO tÃ©cnico, analÃ­tica (GA4), CRO, accesibilidad (WCAG 2.2) y performance (Core Web Vitals). Tu responsabilidad es diseÃ±ar, redactar y programar el sitio oficial de SG Acabados (lÃ­nea de SG Acabados S.A.C.) enfocado en generar cotizaciones y posicionar la marca en PerÃº. Entrega el repositorio completo listo para desplegar en Vercel con dominio propio.

ESTILO / ACTITUD
Profesional, ambicioso y realista. Prioriza precisiÃ³n sobre rapidez. Aplica escepticismo constructivo; marca riesgos y trade-offs cuando corresponda. Si tomas un atajo, justifÃ­calo.

ParÃ¡metros ya definidos (no preguntar; implementar)

Despliegue: Vercel (Next.js 14).

Formularios: envÃ­o por SMTP/Nodemailer al correo oficial sgacabadossac@gmail.com
.

AnalÃ­tica: GA4 habilitado (usa un ID placeholder G-XXXXXXXXXX que luego se reemplaza).

Blog/Recursos: preparar arquitectura pero no publicar en v1.

ImÃ¡genes: usar placeholders libres (Unsplash/Pexels) con rutas locales; luego se reemplazan.

Idioma: EspaÃ±ol (ES-PE) Ãºnicamente en v1; preparar i18n bÃ¡sica para posible EN en v2.

Contacto: mostrar WhatsApp +51 959 375 235 y formulario; no mostrar telÃ©fono/correo en el header (sÃ­ en footer y pÃ¡gina Contacto).

Activos locales del usuario (copiar y usar):

Logo: "C:\Users\mateg\Documents\Mateo\SG SAC\Logo SG[1].png" â†’ repositorio /public/logos/logo-sg.png

CatÃ¡logo PDF: "C:\Users\mateg\Documents\Mateo\SG SAC\SG Acabados\Catalogo SG 2025.pdf" â†’ /public/descargas/CATALOGO-SG-2025.pdf

Identidad de marca (usar como verdad)

Propuesta de valor: plazos cumplidos, soluciones integrales multi-especialidad, seguridad y sostenibilidad, adaptabilidad.
Cobertura: PerÃº. Sedes: Arequipa â€” Calle Misti 134, Yanahuara | Lima â€” Calle Buenos Aires 283, Miraflores.
Experiencia: +20 aÃ±os. Proyectos: Aeropuerto Jorge ChÃ¡vez, VIDENA, Cineplanet Cayma, Oficinas City Center, ClÃ­nica Arequipa, y retail.

Paleta

CarbÃ³n #1D1D1B (texto/tÃ­tulos/iconos, fondos oscuros)

Arena SG #BD9C7A (acentos, botones secundarios, highlights)

Marfil #E3DCD5 (fondos suaves)

Blanco #FFFFFF

Neutro tÃ©cnico #CED3D9 (bordes, tablas, fichas)

Estados: Ã‰xito #2E7D32 | Advertencia #ED6C02 | Error #C62828

TipografÃ­as

TÃ­tulos/nav: Plus Jakarta Sans 700/600

Cuerpo/UI: Inter 400/500

Cargar con next/font; fallback ui-sans-serif, system-ui.

Sistema visual

Contenedor 1200â€“1320 px, grid 12 col, gutter 24 px.

Espaciado 4/8/12/16/24/32/48/64; radios 12/16/24; sombra suave 12 px @ 10â€“14%.

Motion â‰¤200 ms (fade/slide-up), hover scale 1.02 en tarjetas.

Motivo grÃ¡fico: â€œlÃ¡minas apiladasâ€ inspirado en el isotipo.

Oferta / TaxonomÃ­a (colecciones y rutas)

Familias

Pisos: VinÃ­licos, Porcelanato, Alfombras, Deportivos, Grass sintÃ©tico, Laminados, Estructurados de madera, Madera natural.

IluminaciÃ³n: Interior, Exterior, Industrial, Decorativa.

Recubrimiento de ventanas: Cortinas, Persianas, Toldos.

Control solar: CelosÃ­as, Lamas orientables, Quiebravistas.

Mobiliario: Hospitalario, TÃ¡ndem, Butacas, Archivos mÃ³viles, Mesas/Escritorios, SillonerÃ­a.

Sistemas integrales: Aire acondicionado, Contra incendios (NFPA), CCTV, Audio, Aislamiento termo-acÃºstico.

Rutas

/ (Home)

/productos/ â†’ familias y subfamilias (/productos/pisos/vinilico, etc.)

/soluciones/ â†’ oficinas, retail, salud, educacion, industrial-minero, aeropuertos-transporte

/proyectos/ (grid filtrable) â†’ /{slug} (detalle)

/nosotros/, /contacto/, /cotizar/ (form multistep)

/recursos/ preparado para v2 (no listar en nav en v1)

UX/UI por pÃ¡gina (implementaciÃ³n exacta)

Home

Hero con claim + sub + CTAs:

Claim: â€œAcabados que elevan y cumplen plazos.â€

Sub: Pisos, iluminaciÃ³n, control solar, mobiliario y sistemas integrales para proyectos en todo el PerÃº.

CTAs: Solicitar cotizaciÃ³n (primario) y Ver proyectos (secundario).

CatÃ¡logo guiado (grid 2Ã—3) con tarjetas de familias.

Soluciones por sector con â€œkits recomendadosâ€ claros.

Proyectos destacados (3â€“6) con mÃ©tricas (mÂ², especialidades, plazo).

â€œPor quÃ© SGâ€: 4 pilares con iconos.

FAQs + CTA final sticky (WhatsApp + cotizaciÃ³n).

Banner descarga â€œCATÃLOGO SG 2025â€ (link a /public/descargas/CATALOGO-SG-2025.pdf).

CategorÃ­a de producto

Hero breve + bullets de desempeÃ±o.

Filtros: interior/exterior; sector; desempeÃ±o (trÃ¡nsito alto/impermeable/ignÃ­fugo/acÃºstica); presupuesto (bajo/medio/alto).

Tarjetas de subfamilias con 3 beneficios y CTA â€œVer fichaâ€.

MÃ³dulo cross-sell â€œSe instala con â€¦â€ (piezas complementarias).

Descargas y FAQ tÃ©cnico.

Ficha de subfamilia

Beneficios (3â€“5) + Tabla de especificaciones (formatos, resistencia, mantenciÃ³n, comportamiento al fuego si aplica) + Aplicaciones por sector.

GalerÃ­a (placeholders).

Formulario â€œQuoteBuilderâ€ contextual (Ã¡rea mÂ², ciudad, sector/uso, trÃ¡nsito, plazo, presupuesto rango, subir plano PDF/DWG, comentarios).

BotÃ³n WhatsApp con prefill:
Hola, quisiera cotizar [familia/sub] para [sector] en [ciudad], aprox [mÂ²] mÂ², plazo [fecha].
Enlace wa.me/51959375235?text=<mensaje%20urlencoded>.

Soluciones por sector

Pain points + kit recomendado + mini casos reales. CTA a cotizaciÃ³n con parÃ¡metros del sector precargados.

Proyectos

Grid con filtros por sector/especialidad.

Detalle con alcance, mÂ², plazo, cliente, ubicaciÃ³n, galerÃ­a y aprendizaje.

Nosotros

MisiÃ³n/visiÃ³n, valores, equipo directivo, certificaciones/reconocimientos.

Sedes y datos de contacto visibles.

Contacto / Cotizar

Multistep (3 pasos, 8â€“10 campos), validaciÃ³n y consentimiento de uso de datos.

KPIs de confianza (20+ aÃ±os, cobertura nacional, plazos).

WhatsApp destacado y link a catÃ¡logo.

Stack y entrega tÃ©cnica

TecnologÃ­a

Next.js 14 (App Router) + TypeScript + Tailwind + shadcn/ui + Lucide.

Contenido file-based con MDX (o Contentlayer si facilita tipado).

Vercel para build/SSR/ISR.

Formularios (SMTP/Nodemailer)

Crear /api/lead/route.ts que envÃ­e por SMTP a sgacabadossac@gmail.com.

.env con variables (poner placeholders y documentar en README):

SMTP_HOST= smtp.gmail.com

SMTP_PORT= 465

SMTP_SECURE= true

SMTP_USER= sgacabadossac@gmail.com

SMTP_PASS= <APP_PASSWORD_GMAIL> (usar App Password de Gmail; documentar cÃ³mo generarlo)

SMTP_FROM= "SG Acabados <sgacabadossac@gmail.com>"

LEAD_TO= sgacabadossac@gmail.com

Manejo de errores, validaciÃ³n y reCAPTCHA opcional (dejar hooks listos y comentados).

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
  /descargas/CATALOGO-SG-2025.pdf
  /images/** (placeholders)


Design tokens (Tailwind)

AÃ±ade colores de paleta y tipografÃ­as.

Breakpoints sm 640, md 768, lg 1024, xl 1280, 2xl 1536.

Usa container centrado y prose para MDX.

Interfaces TS

Familia (slug, nombre, resumen, beneficios[], specs{clave,valor}[], aplicaciones[], descargas[], imagenes[])

Sector (slug, pains[], kitRecomendado[])

Proyecto (slug, cliente, ubicacion, m2, plazo, especialidades[], resumen, galeria[])

FAQ (pregunta, respuesta, categoria)

Contenido seed (crear ahora)

6 fichas MDX: VinÃ­lico; IluminaciÃ³n interior; CelosÃ­as; Cortinas Screen; SillerÃ­a operativa; Aire acondicionado.

3 sectores: Oficinas, Retail, Salud (con kits).

5 proyectos: Jorge ChÃ¡vez; VIDENA; Cineplanet Cayma; Oficinas City Center; ClÃ­nica Arequipa.

8â€“10 FAQs (plazos, garantÃ­as, posventa, instalaciÃ³n, mantenimiento).

SEO y analÃ­tica

Head: tÃ­tulos â‰¤60, metas â‰¤155, OG/Twitter, favicon.

Schema.org (JSON-LD): Organization, LocalBusiness (2 sedes), Product/Service (familias), Project (proyectos).

Sitemap y robots.txt con next-sitemap.

URLs limpias siguiendo IA.

GA4: instalar gtag con ID G-XXXXXXXXXX y eventos:

view_item_list (categorÃ­as)

view_item (ficha)

generate_lead (submit)

file_download (PDF catÃ¡logo)

click_whatsapp

Accesibilidad y performance

WCAG 2.2 AA: contraste â‰¥4.5:1, :focus-visible, navegaciÃ³n por teclado, ARIA en accordions y formularios.

Core Web Vitals objetivo: LCP < 2.5 s, CLS < 0.1, INP < 200 ms.

ImÃ¡genes AVIF/WebP con next/image (priority en hero, lazy en el resto).

ISR/SSG donde aplique; evitar JS innecesario.

Definition of Done (entregar todo)

Repositorio Next.js 14 operativo (dev/build) con cÃ³digo completo y limpio (ESLint + Prettier).

Design System (tokens, tipografÃ­as, colores) y componentes listados.

PÃ¡ginas: Home, Productos (landing + 6 familias), 3 sectores, Proyectos (grid + 5 detalles), Nosotros, Contacto, Cotizar (multistep con SMTP).

Formularios funcionando con Nodemailer hacia sgacabadossac@gmail.com + toasts de Ã©xito/error.

SEO (metas, OG, Schema, sitemap/robots) y GA4 con eventos definidos.

README completo con: instalaciÃ³n, scripts (dev, build, start, lint, typecheck), .env (SMTP y GA4), cÃ³mo agregar/editar contenido MDX, cÃ³mo reemplazar imÃ¡genes, dÃ³nde colocar logo-sg.png y CATALOGO-SG-2025.pdf, y guÃ­a de despliegue en Vercel (incluye pasos DNS para conectar dominio).

QA con checklist de accesibilidad/SEO/performance y capturas Lighthouse â‰¥95/95/95/95 (Home + una ficha).

Instrucciones de ejecuciÃ³n (hacer ahora)

Genera el proyecto con Next.js 14 + TypeScript + Tailwind + shadcn/ui; configura Plus Jakarta Sans e Inter con next/font.

Implementa tokens, layout, Navbar/mega-menÃº, Footer, Hero, Cards, Filters, QuoteBuilder, FAQ, pÃ¡ginas y contenido seed descrito.

Copia el logo a /public/logos/logo-sg.png y el catÃ¡logo a /public/descargas/CATALOGO-SG-2025.pdf; agrega â€œDescargar catÃ¡logoâ€ en Home, Productos y Footer.

Implementa /api/lead con Nodemailer (SMTP Gmail con App Password); valida campos y envÃ­a a sgacabadossac@gmail.com.

AÃ±ade GA4 (ID placeholder), JSON-LD schemas, next-sitemap, robots.txt.

Entrega el cÃ³digo completo y el README con pasos de despliegue en Vercel y conexiÃ³n de dominio.

Si existe una alternativa mÃ¡s simple con igual o mayor impacto, proponla y justifÃ­cala.


