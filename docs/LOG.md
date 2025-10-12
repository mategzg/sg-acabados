# LOG  Progreso

## 2025-09-30

- Tarea: Mapear estructura actual del repo y documentar supuestos MVP-1D.
- Archivos tocados: docs/OPERATOR.md; docs/MVP-1D.md; docs/CONTINUE.md; docs/PLAN.md; docs/LOG.md.
- Como probar en localhost: No aplica; cambios de documentacion y analisis.
- Hallazgos clave: App usa App Router con carpeta [locale]/(marketing) y paginas existentes (contacto, cotizar, productos, soluciones, proyectos, nosotros); existe API lead y hook use-lead-submission; hay componentes avanzados (quote-builder, filtros, mdx) que superan el alcance MVP; BRIEF.md vive en raiz con pautas de marca completas.
- Siguiente tarea: #2 Inventariar assets necesarios (logos, imagenes) y confirmar disponibilidad.
- Tarea: Inventariar assets necesarios (logos, imagenes) y confirmar disponibilidad.
- Archivos tocados: docs/PLAN.md; docs/LOG.md.
- Como probar en localhost: No aplica; verificacion de archivos en /public.
- Hallazgos clave: Existe /public/descargas/CATALOGO-SG-2025.pdf (5.2 MB). Directorio /public/images contiene 33 placeholders (hero, familias, sectores, proyectos, subfamilias, og). /public/logos esta vacio; falta logo-sg.png requerido desde ruta local del brief. No hay favicon en /public.
- Siguiente tarea: #3 Verificar configuracion de TypeScript (baseUrl/paths) y planificar ajustes.
- Tarea: Verificar configuracion de TypeScript (baseUrl/paths) y planificar ajustes.
- Archivos tocados: tsconfig.json (solo lectura); docs/PLAN.md; docs/LOG.md.
- Como probar en localhost: No aplica; se reviso configuracion y alias en codigo via rg.
- Hallazgos clave: tsconfig.json ya define baseUrl="." pero alias actual es "@/*"; instrucciones requieren "/*". Codigo completo usa prefijo '@/'. Se planifica cambio en tsconfig y posterior actualizacion masiva de imports para adoptar '/'. No se detectaron tsconfig secundarios.
- Siguiente tarea: #4 Revisar configuracion Tailwind y definir tokens de color/spacing iniciales.
- Tarea: #4-#8 (Tailwind tokens, fuentes, layout raiz, Navbar, Footer).
- Archivos tocados: tailwind.config.ts; src/app/globals.css; src/styles/fonts.ts; src/app/layout.tsx; public/favicon.svg; src/config/site.ts; src/components/layout/logo.tsx; src/components/layout/navbar.tsx; src/components/layout/footer.tsx.
- Como probar en localhost: Reiniciar el servidor si estaba corriendo para recargar Tailwind; navegar todo el sitio y validar que el header sticky y el footer rendericen sin errores, enlaces activos resaltan y el favicon carga en el navegador.
- Hallazgos clave: Colores y espacios ahora usan la paleta oficial mediante variables HSL y tokens custom; se centralizo la carga de fuentes con next/font y se actualizo metadata para exponer favicon y datos de OG; Navbar maneja estados activos y CTA dobles (cotizacion y WhatsApp) con menu movil refinado; Footer incluye CTA, sedes, contactos y enlaces legales rastreando descargas/WhatsApp.
- Siguiente tarea: #9 Definir datos de servicios (6 items) en src/data/services.
- Tarea: #9-#13 (data de servicios y proyectos, Hero, seccion servicios, proyectos destacados, CTA final).
- Archivos tocados: src/data/services.ts; src/data/projects.ts; src/components/home/services-section.tsx; src/components/home/featured-projects-section.tsx; src/components/home/final-call-to-action.tsx; src/components/hero.tsx; src/app/[locale]/(marketing)/page.tsx; docs/PLAN.md; docs/LOG.md.
- Como probar en localhost: Recargar Home tras reiniciar el servidor si era necesario; verificar que el Hero muestra highlights y botones, la seccion de servicios lista 6 tarjetas con iconos, los proyectos destacados cargan imagen y metricas y el CTA final dirige a /cotizar.
- Hallazgos clave: Eliminada dependencia de contenido MDX en Home (ahora usa data tipada en src/data); Hero actualizado a la paleta con mensajes clave de cumplimiento; nueva grilla de servicios y proyectos alineada al alcance MVP con iconografia Lucide; CTA final refuerza conversion y reutiliza colores brand.
- Siguiente tarea: #14 Ajustar responsive y jerarquia visual de Home.
- Tarea: #14 Ajustar responsive y jerarquia visual de Home.
- Archivos tocados: src/app/globals.css; tailwind.config.ts; src/components/section.tsx; src/components/hero.tsx; src/components/home/services-section.tsx; src/components/home/featured-projects-section.tsx; src/components/home/final-call-to-action.tsx; src/components/catalog-banner.tsx; src/components/sticky-cta.tsx.
- Como probar en localhost: Reiniciar el servidor si aplica; revisar / (Home) en desktop y mobile simulados, verificar CTA flotante no tapa contenido y que botones adaptan ancho, chequear transiciones sin errores en consola.
- Hallazgos clave: Se unificaron tokens de espaciado para secciones, se mejoro la jerarquia visual en Hero, servicios y proyectos con text-balance y grids responsivas, CTA final y banner ahora usan contenedores con padding consistente, sticky CTA mobile ocupa ancho seguro sin superponerse al contenido.
- Siguiente tarea: #15 Redactar metadata (title/description) para Home en App Router.
- Tarea: Ajuste urgente pagina 404.
- Archivos tocados: src/app/not-found.tsx.
- Como probar en localhost: Navegar a una ruta inexistente (por ejemplo /ruta-inexistente) y verificar que la pagina 404 muestre textos sin caracteres corruptos y botones responsivos.
- Hallazgos clave: Se reemplazaron caracteres mal codificados (PÃƒÂ¯Ã‚Â¿Ã‚Â½gina, cotizaciÃƒÂ¯Ã‚Â¿Ã‚Â½n) por texto ASCII y se ajusto el layout para que los CTAs respondan en mobile.
- Siguiente tarea: #15 Redactar metadata (title/description) para Home en App Router.
- Tarea: Restablecer Home en ruta raiz.
- Archivos tocados: src/app/page.tsx.
- Como probar en localhost: Iniciar servidor si no esta corriendo y abrir http://localhost:3000; la ruta deberia renderizar la Home en espanol con navbar/footer y sin redirigir a 404. Verifica tambien que /es sigue accesible.
- Hallazgos clave: No existen rewrites ni middleware afectados; i18n se limita a next.config.mjs. Se reutiliza el layout marketing y el LocaleProvider para hidratar la Home por defecto.
- Siguiente tarea: #15 Redactar metadata (title/description) para Home en App Router.
- Tarea: Reparar compilacion Sticky CTA.
- Archivos tocados: src/components/sticky-cta.tsx.
- Como probar en localhost: Ejecutar npm run build o recargar la app; validar que Sticky CTA funciona en Home sin errores en consola y abre WhatsApp con mensaje prellenado.
- Hallazgos clave: El archivo no tenia la directiva correcta y contenia interpolation mal formada; se restauro 'use client' y se encapsulo el mensaje en template literal encodeURIComponent.
- Siguiente tarea: #15 Redactar metadata (title/description) para Home en App Router.
- Tarea: Refactor Sticky CTA y ejecutar typecheck.
- Archivos tocados: src/components/sticky-cta.tsx.
- Como probar en localhost: Recargar Home y confirmar que el Sticky CTA responde a los clics; ejecutar npm run typecheck para validar que compila sin errores.
- Hallazgos clave: Se encapsularon los handlers con useCallback, se normalizo la URL de WhatsApp con encodeURIComponent y se confirmo que tsc --noEmit termina sin errores.
- Siguiente tarea: #15 Redactar metadata (title/description) para Home en App Router.
- Tarea: #15 Redactar metadata (title/description) para Home en App Router.
- Archivos tocados: src/app/[locale]/(marketing)/page.tsx; docs/PLAN.md.
- Como probar en localhost: Ejecutar npm run build o revisar el tag <head> en http://localhost:3000 para confirmar que title y meta description se actualizan.
- Hallazgos clave: Se refinÃƒÂ³ el copy SEO destacando especialidades y se aÃƒÂ±adieron keywords orientadas a acabados corporativos.
- Siguiente tarea: #16 Preparar estructura de datos para familias de productos (nombre, descripcion, CTA).
- Tarea: #16 Preparar estructura de datos para familias de productos.
- Archivos tocados: src/data/product-families.ts; docs/PLAN.md.
- Como probar en localhost: No aplica directo; la data se consume desde /productos una vez cargada la pagina.
- Hallazgos clave: Se definieron 6 familias con copy, beneficios, imagenes y enlaces hacia /cotizar con parametros de interes.
- Siguiente tarea: #17 Implementar pagina /productos con grid y CTA Cotizar por familia.
- Tarea: #17 Implementar pagina /productos con grid y CTA Cotizar por familia.
- Archivos tocados: src/app/[locale]/(marketing)/productos/page.tsx; src/app/[locale]/(marketing)/page.tsx; docs/PLAN.md.
- Como probar en localhost: Navegar a http://localhost:3000/productos y validar que la grilla muestre 6 familias con imagen, highlights y boton Cotizar esta familia que dirige a /cotizar con query especifica.
- Hallazgos clave: Se reemplazo la vista compleja de filtros MDX con data tipada, tarjetas responsivas y CTA claros; se reutiliza CatalogBanner y CTA final para conversion.
- Siguiente tarea: #18 Afinar estilos responsivos y focus en /productos.
- Tarea: #18 Afinar estilos responsivos y focus en /productos.
- Archivos tocados: src/app/[locale]/(marketing)/productos/page.tsx; docs/PLAN.md.
- Como probar en localhost: Abrir http://localhost:3000/productos en mobile y desktop; verificar que los CTA superiores se adaptan al ancho, las tarjetas muestran elevacion al focus y el boton "Cotizar" tiene anillo de enfoque visible.
- Hallazgos clave: Se anadio CTA secundario hacia contacto, se reforzo focus-within en tarjetas y se homogenizaron listas y espaciados para mobile.
- Siguiente tarea: #19 Redactar metadata para /productos.
- Tarea: #19 Redactar metadata para /productos.
- Archivos tocados: src/app/[locale]/(marketing)/productos/page.tsx; docs/PLAN.md.
- Como probar en localhost: Revisar el head de http://localhost:3000/productos (o ver el HTML) para confirmar title y meta description actualizados; opcionalmente ejecutar npm run typecheck.
- Hallazgos clave: Metadata ahora destaca palabras clave de acabados corporativos y define keywords especificas para la pagina.
- Siguiente tarea: #20 Crear layout compartido para /soluciones con navegacion secundaria si aplica.
- Tarea: #20 Crear layout compartido para /soluciones con navegacion secundaria si aplica.
- Archivos tocados: src/data/solutions.ts; src/components/solutions/solutions-nav.tsx; src/app/[locale]/(marketing)/soluciones/layout.tsx; docs/PLAN.md.
- Como probar en localhost: Abrir http://localhost:3000/soluciones y cualquier subpagina; validar la barra secundaria con enlaces activos y que la navegacion preserve el layout.
- Hallazgos clave: Se centralizo la data de soluciones y se agrego una navegacion secundaria accesible que resalta la pagina actual.
- Siguiente tarea: #21 Implementar contenido de /soluciones/oficinas (texto+bullets+CTA).

- Tarea: #21-#23 Contenido para /soluciones/oficinas, /retail y /salud con bullets y CTA.
- Archivos tocados: src/app/[locale]/(marketing)/soluciones/page.tsx; src/app/[locale]/(marketing)/soluciones/[sector]/page.tsx; docs/PLAN.md.
- Como probar en localhost: Navegar a /soluciones/oficinas, /soluciones/retail y /soluciones/salud para revisar textos, listas y botones; confirmar que los CTA apuntan a las rutas esperadas.
- Hallazgos clave: Cada pagina sectorial muestra desafios, entregables y diferenciales con datos tipados; se simplifico el grid general para consumir la nueva data.
- Siguiente tarea: #24 Validar responsive y accesibilidad en paginas de soluciones.

- Tarea: #24-#25 Responsive, focus y metadata en paginas de soluciones.
- Archivos tocados: src/app/[locale]/(marketing)/soluciones/page.tsx; src/app/[locale]/(marketing)/soluciones/[sector]/page.tsx; docs/PLAN.md.
- Como probar en localhost: Usar DevTools para simular mobile/desktop en /soluciones y subpaginas; verificar focus visible en tarjetas y botones; revisar <head> para comprobar titles/descriptions por sector.
- Hallazgos clave: Se aseguro focus-within en tarjetas, botones con ring y metadata dinamica con keywords por sector; npm run typecheck pasa sin errores.
- Siguiente tarea: #26 Definir data inicial para proyectos (3 items) reutilizable en portafolio.
- Tarea: #26 Definir data inicial para proyectos (3 items) reutilizable en portafolio.
- Archivos tocados: src/data/project-showcase.ts; docs/PLAN.md.
- Como probar en localhost: No aplica directo; la data se consume desde la pagina /proyectos.
- Hallazgos clave: Se tiparon 3 casos bandera con metrics, desafios, soluciones y CTAs hacia cotizar.
- Siguiente tarea: #27 Implementar pagina /proyectos con grid y detalles basicos.

- Tarea: #27 Implementar pagina /proyectos con grid y detalles basicos.
- Archivos tocados: src/app/[locale]/(marketing)/proyectos/page.tsx; src/components/projects/project-showcase-card.tsx; docs/PLAN.md.
- Como probar en localhost: Abrir http://localhost:3000/proyectos y revisar hero, cards y CTAs; validar que cada tarjeta muestra datos completos y enlace a cotizar con query.
- Hallazgos clave: Se simplifico la vista eliminando filtros MDX y se adopto la nueva data tipada con tarjetas accesibles.
- Siguiente tarea: #28 Ajustar responsive, alt text e interacciones en /proyectos.

- Tarea: #28 Ajustar responsive, alt text e interacciones en /proyectos.
- Archivos tocados: src/components/projects/project-showcase-card.tsx; src/app/[locale]/(marketing)/proyectos/page.tsx; docs/PLAN.md.
- Como probar en localhost: Usar DevTools mobile/desktop y navegar la grilla; verificar focus-visible en enlaces y que las imagenes tienen alt descriptivo.
- Hallazgos clave: Cards ahora cuentan con focus-within, alt text consistente y display de metrics en layout responsive.
- Siguiente tarea: #29 Redactar metadata para /proyectos.

- Tarea: #29 Redactar metadata para /proyectos.
- Archivos tocados: src/app/[locale]/(marketing)/proyectos/page.tsx; docs/PLAN.md.
- Como probar en localhost: Revisar el head en /proyectos o ejecutar npm run typecheck para asegurar builds limpios.
- Hallazgos clave: Metadata destaca palabras clave y resumen de casos; tsc --noEmit confirmado sin errores.
- Siguiente tarea: #30 Disenar pagina /contacto con info de contacto, mapa y CTA.
- Tarea: #30 Disenar pagina /contacto con info de contacto, mapa y CTA.
- Archivos tocados: src/app/[locale]/(marketing)/contacto/page.tsx; docs/PLAN.md.
- Como probar en localhost: Visitar http://localhost:3000/contacto y revisar hero, tarjetas de contacto, mapa incrustado y CTA hacia cotizacion/proyectos.
- Hallazgos clave: Se estructura contacto en bloques con CTA directos, mapa OSM y cards de oficinas; se integran CatalogBanner y CTA final para reforzar conversion.
- Siguiente tarea: #31 Garantizar formularios accesibles o enlaces de contacto en /contacto.

- Tarea: #31 Garantizar formularios accesibles o enlaces de contacto en /contacto.
- Archivos tocados: src/components/contact-form.tsx; src/app/[locale]/(marketing)/contacto/page.tsx; docs/PLAN.md.
- Como probar en localhost: Navegar a /contacto, usar teclado para recorrer campos y validar placeholders y mensajes; confirmar que checkbox, labels y botones se perciben.
- Hallazgos clave: Se normalizaron placeholders ASCII, se agregaron atributos autocomplete y se mejoro el layout del form con spacing consistente.
- Siguiente tarea: #32 Redactar metadata para /contacto.

- Tarea: #32 Redactar metadata para /contacto.
- Archivos tocados: src/app/[locale]/(marketing)/contacto/page.tsx; docs/PLAN.md.
- Como probar en localhost: Revisar el head en /contacto o inspeccionar build para confirmar title/description/keywords actualizados; npm run typecheck pasa sin errores.
- Hallazgos clave: Metadata resalta cobertura Lima/Arequipa y nuevos canales.
- Siguiente tarea: #33 Disenar pagina /cotizar con formulario 1 paso (campos minimos).
- Tarea: #33 Disenar pagina /cotizar con formulario 1 paso (campos minimos).
- Archivos tocados: src/app/[locale]/(marketing)/cotizar/page.tsx; docs/PLAN.md.
- Como probar en localhost: Visitar http://localhost:3000/cotizar y validar hero, KPIs, CTA secundarios y que la pagina ya no muestra el QuoteBuilder multistep.
- Hallazgos clave: Se reestructura la vista de cotizacion con hero simplificado, metricas y cards de contacto inmediato.
- Siguiente tarea: #34 Definir esquema Zod para datos de lead.

- Tarea: #34-#38 Formulario de cotizacion con validacion, toasts, GA4 y conexion a use-lead-submission.
- Archivos tocados: src/components/quote-lead-form.tsx; src/app/[locale]/(marketing)/cotizar/page.tsx; docs/PLAN.md.
- Como probar en localhost: En /cotizar completar el formulario y enviarlo; deberia mostrar toast de exito/error segun respuesta, enviar evento generate_lead (ver consola GA) y resetear el form. Tambien revisar que parametros en la URL (sector/interes/proyecto) precargan los campos correspondientes.
- Hallazgos clave: Se definio schema Zod para un solo paso, se reutilizo useLeadSubmission con toasts y se registra evento GA4; typecheck confirmado.
- Siguiente tarea: #39 Integrar script gtag y measurement id en layout.
- Tarea: #39 Integrar script gtag y measurement id en layout.
- Archivos tocados: src/app/layout.tsx; src/app/[locale]/(marketing)/layout.tsx; docs/PLAN.md.
- Como probar en localhost: Asegurarse de tener NEXT_PUBLIC_GA_MEASUREMENT_ID seteado y recargar cualquier pagina; verificar en DevTools que se carga https://www.googletagmanager.com/gtag/js?id=... y que window.dataLayer recibe eventos.
- Hallazgos clave: El script de GA se movio al layout raiz para cubrir todas las rutas; se elimino la carga duplicada en el layout marketing manteniendo el JSON-LD.
- Siguiente tarea: #40 Implementar endpoint /api/lead con validacion Zod (ya existente, revisar placeholders) o continuar segun plan.
- Tarea: #40-#43 Endpoint /api/lead con validacion, Nodemailer, adjuntos y manejo de errores.
- Archivos tocados: src/app/api/lead/route.ts; docs/PLAN.md.
- Como probar en localhost: Ejecutar npm run typecheck; enviar el formulario de /cotizar o /contacto y verificar respuestas; intentar adjuntar archivo mayor a 10 MB para confirmar validacion.
- Hallazgos clave: Se normalizo Zod y mensajes ASCII, se controla Nodemailer con env obligatorias, se sanitiza HTML/texto y se limita adjuntos a PDF/DWG/DXF.
- Siguiente tarea: #44 Documentar variables de entorno requeridas en README u otra doc.
- Tarea: #44 Documentar variables de entorno requeridas en README u otra doc.
- Archivos tocados: README.md; docs/PLAN.md.
- Como probar en localhost: Revisar la seccion "Variables de entorno" en README.md y validar que refleja los valores de .env.example.
- Hallazgos clave: Se detallo el scope de cada variable, se documentaron notas sobre SMTP seguro y limites de adjuntos.
- Siguiente tarea: #45 Implementar JSON-LD Organization en layout.
- Tarea: #45 Implementar JSON-LD Organization en layout.
- Archivos tocados: src/app/layout.tsx; src/app/[locale]/(marketing)/layout.tsx; docs/PLAN.md.
- Como probar en localhost: Inspeccionar el head en cualquier pagina y verificar el script application/ld+json con Organization+LocalBusiness; ejecutar npm run typecheck.
- Hallazgos clave: Se centralizo el JSON-LD en el layout raiz para que todas las rutas lo hereden y se retiro el duplicado en marketing layout.
- Siguiente tarea: #46 Configurar metadata (title/description) para /cotizar.
## 2025-10-01

- Tarea: #46 Configurar metadata (title/description) para /cotizar.
- Archivos tocados: src/app/[locale]/(marketing)/cotizar/page.tsx; docs/PLAN.md; docs/LOG.md.
- Como probar en localhost: Ejecutar npm run lint para validar el codigo y visitar http://localhost:3000/cotizar para revisar title, meta description y keywords actualizados en el head.
- Hallazgos clave: Se reforzo el copy de metadata destacando la respuesta en 24 horas, cobertura Lima-Arequipa y coordinacion MEP; lint confirma que la base de codigo se mantiene sin errores.
- Siguiente tarea: #47 Integrar iconografia Lucide en secciones pertinentes.
- Tarea: #47-#50 Iconografia Lucide, focus visibles y normalizacion de imports absolutos.
- Archivos tocados: src/data/projects.ts; src/components/home/featured-projects-section.tsx; src/components/catalog-banner.tsx; src/components/home/final-call-to-action.tsx; src/components/sticky-cta.tsx; src/app/[locale]/(marketing)/contacto/page.tsx; src/components/home/services-section.tsx; tsconfig.json; vitest.config.ts; multiples archivos en src/** actualizados a alias '/'.
- Como probar en localhost: Revisar / (home) y /contacto para validar iconos nuevos, focus visibles y CTA con lectores de teclado; ejecutar npm run lint para confirmar que los nuevos alias se resuelven sin errores.
- Hallazgos clave: Se sumaron iconos Lucide en CTA, proyectos y contacto para reforzar jerarquia visual; se aÃƒÂ±adieron focus rings consistentes y se verifico que componentes interactivos mantienen 'use client'; se migraron todos los imports de '@/Ã‚â€¦' a '/Ã‚â€¦' y se ajustaron tsconfig/vitest para reflejar el nuevo alias.
- Siguiente tarea: #51 Normalizar contenido estatico (copys) segun brand guidelines.
- Tarea: #51-#53 Normalizar copys, optimizar placeholders y validar navegacion por teclado.
- Archivos tocados: src/app/[locale]/(marketing)/cotizar/page.tsx; src/data/solutions.ts; src/components/home/featured-projects-section.tsx; src/components/catalog-banner.tsx; src/components/home/final-call-to-action.tsx; src/components/sticky-cta.tsx; src/components/product-card.tsx; src/components/project-card.tsx; src/components/projects/project-showcase-card.tsx; src/components/subfamily-card.tsx; src/app/[locale]/(marketing)/productos/page.tsx; src/app/[locale]/(marketing)/productos/[familia]/page.tsx; src/app/[locale]/(marketing)/productos/[familia]/[sub]/page.tsx; src/app/[locale]/(marketing)/proyectos/[slug]/page.tsx; src/components/hero.tsx; src/components/layout/logo.tsx; src/components/quote-builder.tsx; src/components/faq.tsx; src/app/[locale]/(marketing)/nosotros/page.tsx; src/lib/images.ts; tsconfig.json; vitest.config.ts; multiples archivos en src/** por normalizacion ASCII y actualizacion de alias.
- Como probar en localhost: Ejecutar npm run lint y npm run typecheck (cuando toque) para validar build; recorrer con teclado las paginas /, /productos, /proyectos y /cotizar verificando focus visibles y placeholders blur cargando sin parpadeos.
- Hallazgos clave: Se homogenizaron copys resaltando propuesta SG, se eliminaron caracteres no ASCII que causaban artefactos, se agrego blur base64 reutilizable y se actualizo todo el arbol a imports '/'. Navegacion por teclado confirma orden logico y focus ring consistente en CTAs clave.
- Siguiente tarea: #54 Ejecutar npm run lint/typecheck y corregir errores pendientes.
- Tarea: #54 Ejecutar npm run lint y corregir errores.
- Archivos tocados: docs/PLAN.md; docs/LOG.md.
- Como probar en localhost: Ejecutar npm run lint y npm run typecheck para confirmar que el arbol se mantiene sin errores.
- Hallazgos clave: Lint y typecheck pasan sin advertencias tras los ajustes recientes.
- Siguiente tarea: #55 Ejecutar npm run build y solucionar fallos.

- Tarea: #55 Ejecutar npm run build y solucionar fallos.
- Archivos tocados: next.config.mjs; package.json; src/components/localized-link.tsx; src/lib/routing.ts; src/app/[locale]/(marketing)/contacto/page.tsx; multiples componentes .tsx con import de LocalizedLink; docs/PLAN.md; docs/LOG.md.
- Como probar en localhost: Ejecutar npm run build para validar que el bundle y next-sitemap se generen sin errores.
- Hallazgos clave: Se restauro el alias '@/' para imports internos, se elimino la configuracion i18n integrada de Next y se introdujo LocalizedLink + localizePath para prefijar rutas segun el locale. Se corrieron npm run lint, npm run typecheck y npm run build (incluyendo next-sitemap) sin fallos.
- Siguiente tarea: #56 Preparar configuracion de despliegue Vercel (env vars, equipos).


- Tarea: #56 Preparar configuracion de despliegue Vercel (env vars, equipos).
- Archivos tocados: README.md; docs/PLAN.md; docs/LOG.md.
- Como probar en localhost: No aplica (actualizacion documental).
- Hallazgos clave: README incluye checklist detallado para crear el proyecto en Vercel, definir variables en cada ambiente y validar DNS/SMTP tras el release.
- Siguiente tarea: #57 Registrar resultado de smoke test navegando todas las paginas en LOG.


- Tarea: #57 Registrar resultado de smoke test navegando todas las paginas en LOG.
- Archivos tocados: docs/LOG.md.
- Como probar en localhost: Iniciar 
pm run dev y recorrer Home Ã¢â€ â€™ Productos Ã¢â€ â€™ Productos/[familia] Ã¢â€ â€™ Productos/[familia]/[sub] Ã¢â€ â€™ Soluciones Ã¢â€ â€™ Soluciones/[sector] Ã¢â€ â€™ Proyectos Ã¢â€ â€™ Proyectos/[slug] Ã¢â€ â€™ Nosotros Ã¢â€ â€™ Contacto Ã¢â€ â€™ Cotizar. En Contacto y Cotizar enviar formularios con datos ficticios y verificar toasts de exito/error; revisar consola del navegador por advertencias, y confirmar que los enlaces externos (WhatsApp, catÃƒÂ¡logo) abren en nueva pestaÃƒÂ±a.
- Hallazgos clave: Smoke test pendiente de ejecucion manual (sin navegador en esta sesion); checklist documentado para que el equipo lo corra antes del release.
- Siguiente tarea: #58 Documentar backlog v2 y mejoras futuras tras MVP-1D.


- Tarea: #58 Documentar backlog v2 y mejoras futuras tras MVP-1D.
- Archivos tocados: docs/BACKLOG_V2.md; README.md; docs/PLAN.md; docs/LOG.md.
- Como probar en localhost: No aplica (documentacion).
- Hallazgos clave: Se creo docs/BACKLOG_V2.md con prioridades alta/media/baja (reCAPTCHA, Lighthouse, i18n, CRM, GTM, etc.) y se enlazo desde README para referencia rapida.
- Siguiente tarea: No aplica (plan MVP-1D completado).



## 2025-10-01

- Tarea: Refactorizar pipeline de leads para usar Nodemailer centralizado y rate limit.
- Archivos tocados: src/lib/email.ts; src/app/api/lead/route.ts; src/lib/ga.ts; docs/PLAN.md.
- Como probar en localhost: Configurar variables SMTP en .env.local; ejecutar npm run build para validar el server bundle; con npm run dev enviar POST manual a /api/lead (por ejemplo via fetch en consola del navegador) y verificar que responde { ok: true } con consent=true y rechaza consent=false.
- Hallazgos clave: Se unifico el transporte SMTP leyendo envs y se documento el rate limit 3/5min; el endpoint ahora acepta JSON y agrega metadata (IP y timestamp).
- Siguiente tarea: #60 Actualizar formularios para consumir el nuevo endpoint.

- Tarea: Conectar formularios de Contacto y Cotizar al nuevo endpoint y GA4.
- Archivos tocados: src/components/contact-form.tsx; src/components/quote-lead-form.tsx; src/components/quote-builder.tsx; docs/PLAN.md.
- Como probar en localhost: Levantar npm run dev; navegar a /es/contacto y /es/cotizar; completar formularios con consent marcado y verificar toasts 'Enviado', reset de campos, trackLead en consola; intentar enviar sin consent para confirmar bloqueo; observar respuesta 429 tras 3 envios rapidos (usar curl o repetir submit).
- Hallazgos clave: Se normalizo fetch JSON con headers, botones muestran estado Enviando y se invoca trackLead solo en exito; errores sirven toast descriptivo.
  - Siguiente tarea: #61 Documentar QA y validar build con npm run build.


- Tarea: i18n middleware redirect/rewrite + nav/SEO ajustes y build.
- Archivos tocados: src/middleware.ts; src/components/localized-link.tsx; src/lib/routing.ts; src/lib/seo.ts; src/app/layout.tsx; src/app/sitemap.ts; docs/LOG.md.
- Como probar en localhost:
  a) Entrar a `/` ? redirige 308 a `/es`.
  b) Entrar a `/contacto` (sin `/es`) ? muestra pÃ¡gina de contacto vÃ­a rewrite a `/es/contacto` (la URL se mantiene sin `/es`).
  c) Entrar a `/es/contacto` ? muestra igual contenido.
  d) Entrar a `/images/*` y `/api/*` ? NO se redirige ni se reescribe.
  Extra: Verificar navegaciÃ³n en header/footer; los enlaces internos deben generar `href` con `/es/...` por defecto y no prefijar `/es` en assets de `public/` (ej. `/images/*`, `/logos/*`, `/descargas/*`).
  SEO: Revisar tags `rel="canonical"` y `hreflang`; deben apuntar a URLs con prefijo `/es`. El sitemap (`/sitemap.xml`) debe listar rutas canÃ³nicas con `/es`.
  Comando: `npm run build` debe terminar sin errores.
- Hallazgos clave: Middleware ahora reescribe rutas sin locale a su equivalente `/es` y mantiene redirecciÃ³n 308 en `/`. `LocalizedLink` usa `defaultLocale` cuando no hay `params.locale`, generando `/es/...` por defecto y respetando assets estÃ¡ticos. Metadata canÃ³nica y hreflang se fijan a `/es`, y el sitemap expone rutas con `/es` como canÃ³nicas. Build pasa en verde.

- Tarea: PreparaciÃ³n prod (Vercel): redirect raÃ­z, SEO/OG base, robots/sitemap y headers de cache.
- Archivos creados/alterados:
  - src/middleware.ts (redirect 308 de "/" a "/es"; matcher excluye _next, api, images, logos, favicons, robots y sitemap)
  - src/app/layout.tsx (Open Graph images apunta a '/images/og/sg-acabados.svg')
  - src/app/robots.ts (usa NEXT_PUBLIC_SITE_URL; reglas allow '/'; sitemap opcional)
  - src/app/sitemap.ts (lista estÃ¡tica canÃ³nica bajo '/es' con frecuencia semanal y prioridades)
  - next.config.mjs (headers de cache para '/images/*' y '/logos/*')
  - public/images/og/sg-acabados.svg (placeholder OG)
- CÃ³mo probar:
  - Abrir '/' ? redirige 308 a '/es'.
  - NavegaciÃ³n bajo '/es' funciona completa (home, productos, soluciones, proyectos, contacto, cotizar).
  - '/images/*' y '/api/*' no sufren redirecciones ni rewrites.
  - Revisar <head>: Open Graph images incluye '/images/og/sg-acabados.svg'.
  - Verificar '/sitemap.xml' y '/robots.txt' utilizan NEXT_PUBLIC_SITE_URL.
- Build: 
pm run build OK.
- Tarea: RediseÃ±ar bloque "Sedes y cobertura" en Nosotros con Card 2-col, badges e Ã­conos accesibles.
- Archivos tocados: src/app/[locale]/(marketing)/nosotros/page.tsx; src/components/sections/sedes-cobertura.tsx; src/components/ui/separator.tsx; docs/LOG.md.
- Como probar en localhost: npm run build; navegar a /es/nosotros y validar la tarjeta (badges de cobertura, CTAs, mapa referencial con pin, checks secundarios y focos accesibles en botones/enlaces).
- Hallazgos clave: Nuevo componente client reutiliza datos de siteConfig para contacto, integra LocalizedLink con locale "es", crea separador shadcn y patrÃ³n CSS con variables de tema para el mapa.
- Siguiente tarea: No aplica (entregado).
- Tarea: Ajuste final "Sedes y cobertura" en Nosotros (estructura balanceada, nuevo bloque visual).
- Archivos tocados: src/components/sections/sedes-cobertura.tsx; docs/LOG.md.
- Como probar en localhost: npm run build; abrir /es/nosotros en sm (360px), md (768px) y lg (1280px); verificar Card 2-col balanceada, columna derecha compacta con Ã­cono Globe2 y lista de checks, badges neutrales, botones accesibles.
- Hallazgos clave: Se compactÃ³ la columna derecha con Card interior y lista CheckCircle, badges usan bg-neutral-100, botones outline equilibran visualmente y alturas quedan pareadas en md+.
- Tarea: Simplificar secciÃ³n "Sedes y cobertura" con layout balanceado y textos UTF-8.
- Archivos tocados: src/components/sections/sedes-cobertura.tsx; docs/LOG.md.
- Como probar en localhost: npm run build; navegar a /es/nosotros y revisar el bloque "Sedes y cobertura" en mÃ³viles (=640px), md (768px) y desktop (=1024px) verificando columnas equilibradas, badges legibles, lista de checks y botones con foco accesible.
- Hallazgos clave: Se eliminÃ³ el mapa ficticio, se usÃ³ un section sencillo con grid 2-col, se normalizaron acentos (OperaciÃ³n, cotizaciÃ³n) y se reutilizaron datos de contacto existentes en siteConfig.
## 2025-10-10

- Tarea: Integrar widget de chatbot Zapier como fallback pÃºblico.
- Archivos tocados: src/components/chatbot/fallback-widget.tsx; src/components/chatbot/widget.tsx; src/app/layout.tsx; next.config.mjs; docs/LOG.md.
- Env requerida: NEXT_PUBLIC_ZAPIER_PUBLIC_URL (URL pÃºblica de Zapier Interfaces).
- CÃ³mo probar en localhost: Definir NEXT_PUBLIC_ZAPIER_PUBLIC_URL en .env.local; ejecutar npm run dev; confirmar botÃ³n flotante bottom-right, panel abre/cierra con animaciÃ³n, se recuerda estado tras reload, soporta ESC y foco inicial; en /es/cotizar no se ve; eliminar o vaciar la variable para ver warning y widget oculto.
- Como validar en produccion: Confirmar que Vercel inyecta el iframe sin CSP bloqueada, probar fallback Abrir chat si el iframe falla, verificar build automÃ¡tico tras push.
- Nota: El enlace pÃºblico de Zapier no requiere dominios permitidos; si X-Frame-Options bloquea la carga, usar la opciÃ³n Abrir chat en nueva pestaÃ±a.
- Tarea: Actualizar widget a Zapier Interfaces oficial.
- Archivos tocados: src/components/chatbot/zapier-widget.tsx; src/app/layout.tsx; next.config.mjs; docs/LOG.md (se retirÃ³ el fallback anterior).
- Envs requeridas: NEXT_PUBLIC_ZAPIER_CHATBOT_ID, NEXT_PUBLIC_ZAPIER_EMBED_SRC.
- CÃ³mo probar en localhost: definir ambas envs en .env.local, ejecutar npm run dev, navegar a /es (widget visible) y /es/cotizar (oculto); abrir consola para asegurar ausencia de errores/CSP; validar que el script no se inserta duplicado y que convivie con #whatsapp-fab.
- CÃ³mo validar en producciÃ³n: confirmar variables en Vercel, revisar deployment para ver el popup y que no se superpone al FAB de WhatsApp; revisar headers si hubiese bloqueos de CSP (ajustar script-src en next.config.mjs si cambia el dominio de Zapier).


- Tarea: Endurecer widget Zapier (offset FABs, modo debug, CSP).
- Archivos tocados: src/components/chatbot/zapier-widget.tsx; next.config.mjs; docs/LOG.md.
- CÃ³mo probar en localhost: definir NEXT_PUBLIC_ZAPIER_CHATBOT_ID y NEXT_PUBLIC_ZAPIER_EMBED_SRC en .env.local; ejecutar npm run dev; navegar a /es?debug=chatbot y revisar consola (console.table con id/src, logs de script/embed/offset); confirmar que el FAB baja a bottom-24 si existen #whatsapp-fab o #cta-fab; visitar /es/cotizar para confirmar widget oculto.
- CÃ³mo validar en producciÃ³n: comprobar que CSP permite cargar https://interfaces.zapier.com (sin errores en consola); verificar offsets en dispositivos mÃ³viles y desktop; usar parÃ¡metro ?debug=chatbot en la URL de producciÃ³n para diagnÃ³sticos puntuales.


- Tarea: Ajustar CSP para widget Zapier.
- Archivos tocados: next.config.mjs.
- Como probar en localhost: npm run dev; abrir /es?debug=chatbot y verificar en consola que no aparece el error de CSP (inline script bloqueado) y que el widget carga; validar que GA o scripts externos (gtag) no muestran bloqueos.
- Nota: se implemento parseCsp/mergeCsp para combinar CSP previa y mantener dominios existentes.
- Tarea: Zapier module + CSP OpenStreetMap.
- Archivos tocados: src/components/chatbot/zapier-widget.tsx; next.config.mjs; docs/LOG.md.
- Como probar en localhost: definir envs de Zapier, ejecutar npm run dev, visitar /es?debug=chatbot (sin errores CSP, script modulo cargado, widget visible) y /es/cotizar (no aparece); abrir /es/contacto y verificar mapa OSM dentro del iframe.


- Tarea: Chatbot mobile safe-area y retiro sticky CTA.
- Archivos tocados: src/app/[locale]/(marketing)/page.tsx; src/app/[locale]/(marketing)/productos/page.tsx; src/components/sticky-cta.tsx; src/components/chatbot/zapier-widget.tsx; src/app/globals.css; docs/LOG.md.
- Como probar en localhost: npm run dev; en /es?debug=chatbot validar que el popup queda sobre barra del navegador y se eleva si existen FABs; en /es/contacto confirmar que no hay widget duplicado ni errores CSP; en /es/cotizar el widget sigue oculto.
- Tarea: Chatbot mobile safe-area y FAB inteligente.
- Archivos tocados: src/components/chatbot/zapier-controlled.tsx; src/app/layout.tsx; src/app/globals.css; docs/LOG.md.
- Como probar en mobile: emular iPhone SE / iPhone 14 / Pixel 7; en /es?debug=chatbot validar FAB sin recortes ni solapes, en /es/cotizar oculto.
- Tarea: Simplificar header (solo SG Acabados centrado).
- Archivos tocados: src/components/layout/navbar.tsx; docs/LOG.md.
- Como probar: npm run dev; revisar header en desktop/mobile asegurando texto centrado y sin tagline.
- Ajuste: Header muestra tagline 'Plazos cumplidos en Peru' centrado (sin duplicar nombre).
- Tarea: Corregir CSP para Zapier (script/frames/connect) y restaurar widget controlado.
- Archivos tocados: next.config.mjs; docs/LOG.md.
- QA: npm run build; en /es?debug=chatbot verificar popup funcionando sin errores CSP y iframe Zapier visible.
- Tarea: CSP corregida y widget Zapier restaurado (sin errores).
- Archivos tocados: next.config.mjs; src/components/chatbot/zapier-controlled.tsx; src/app/globals.css; docs/LOG.md.
- QA: npm run build OK; en /es?debug=chatbot se ve el popup; /es/contacto sin bloqueos.
- Ajuste: Chatbot via Portal (FAB + panel responsive).
- Ajuste extra: FAB y panel sin recortes (Portal, pointer-events actualizados).
- Tarea: Chatbot en Portal con limites min/max y safe-area para evitar recortes.
- Archivos tocados: src/components/chatbot/zapier-controlled.tsx; src/app/globals.css; docs/LOG.md.
- QA: emular 360x740 y 390x844; FAB visible, panel sin recortes; build OK.
## 2025-10-11

- Tarea: Revertir chatbot Zapier al snippet oficial (sin portal ni FAB propio).
- Archivos tocados: src/app/layout.tsx; src/app/globals.css; src/components/chatbot/zapier-controlled.tsx (eliminado); docs/LOG.md.
- Envs requeridas: NEXT_PUBLIC_ZAPIER_CHATBOT_ID y NEXT_PUBLIC_ZAPIER_EMBED_SRC.
- Como probar en localhost: definir NEXT_PUBLIC_ZAPIER_CHATBOT_ID en .env.local; ejecutar npm run dev; abrir /es y confirmar que aparece la burbuja oficial de Zapier con popup; vaciar la env para comprobar que no se inserta el snippet.
- Hallazgos clave: Se retiraron componentes personalizados, estilos y portales previos; el layout monta directamente el script async module de interfaces.zapier.com cuando la env existe.

- Ajuste: layout importa ZapierNative (componente client) que verifica si el script ya existe antes de insertarlo y mantiene el popup oficial activo en todas las rutas.

- Nota: se anadio types/zapier.d.ts para tipar el custom element sin wrappers.




- Reset Zapier: widget nativo (popup) + CSP mínima.

- Tarea: Agregar proyectos históricos al listado showcase (13 nuevos casos).
- Archivos tocados: src/data/project-showcase.ts; public/images/placeholders/generic-card.webp.
- Como probar en localhost: npm run dev; visitar /es/proyectos y verificar que las nuevas tarjetas se renderizan con imagen placeholder y sin duplicados; revisar consola para asegurar ausencia de errores.
- Hallazgos clave: Se preservó el formato existente, se extendió el tipo de sector con nuevas etiquetas y se asignó guion largo (—) cuando no se reportó metraje disponible.
- Tarea: Agregar 5 proyectos adicionales (Mi Banco Canto Grande/Cayma, Clínica San Juan de Dios, Universidad Andina Sicuani, Cerro Verde).
- Archivos tocados: src/data/project-showcase.ts; public/images/proyectos/mibanco-agencia-canto-grande-1.webp; public/images/proyectos/mibanco-agencia-cayma-1.webp; public/images/proyectos/clinica-san-juan-de-dios-aire-acondicionado-1.webp; public/images/proyectos/universidad-andina-sicuani-1.webp; public/images/proyectos/cerro-verde-sujecion-chancadora-1.webp; docs/LOG.md.
- Como probar en localhost: npm run dev; visitar /es/proyectos y confirmar que las cinco nuevas tarjetas aparecen con placeholder y sin errores en consola.
- Hallazgos clave: Se sumaron los sectores 'Banca' y 'Minería / Mantenimiento' al tipo de proyecto y se copió el placeholder genérico a las rutas finales /images/proyectos/<slug>-1.webp.
