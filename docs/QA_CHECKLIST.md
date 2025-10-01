# Checklist QA SG Acabados

## Accesibilidad (WCAG 2.2 AA)
- [x] Contraste mínimo 4.5:1 en botones primarios y textos clave.
- [x] Estados :focus visibles en navegación y formularios.
- [x] Componentes interactivos etiquetados con ria-* donde corresponde (FAQs, filtros, stepper).
- [x] Navegación por teclado validada en menú, filtros y formularios.
- [ ] Pruebas con lector de pantalla (NVDA/VoiceOver) agendadas antes del lanzamiento.

## SEO Técnico
- [x] Meta titles y descriptions personalizados por página vía createMetadata.
- [x] JSON-LD para Organization, LocalBusiness, Service y Project.
- [x] Sitemap y robots generados con rutas principales.
- [ ] Revisar backlinks y registrar sitio en Google Search Console (pendiente cliente).

## Performance / Core Web Vitals
- [x] Imágenes locales optimizadas (placeholders 1600x900, 1200x630) con 
ext/image.
- [x] Carga diferida en componentes no críticos (cards de proyectos, filtros).
- [ ] Ejecutar Lighthouse en Home y ficha de producto (objetivo ≥95 en todas las categorías).
- [ ] Configurar monitoreo continuo en Vercel Analytics/Speed Insights tras despliegue.

## Seguridad y Formularios
- [x] Validación Zod + mensajes de error descriptivos.
- [x] Adjuntos limitados a 10 MB con limpieza de estado.
- [x] SMTP autenticado mediante app password Gmail.
- [ ] Integrar reCAPTCHA u otra capa anti-spam (hook preparado en backlog).

Actualizado: 2025-09-24 18:28:43
