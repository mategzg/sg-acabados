# Alcance de 1 dia

a- Paginas: Home (Hero+CTA, servicios 56, proyectos 3 cards, CTA final), /productos (lista familias con CTA Cotizar), /soluciones/{oficinas|retail|salud} (texto corto+bullets+CTA), /proyectos (grid 3 seed), /contacto y /cotizar (formulario 1 paso).
- Funcional minimo: POST a /api/lead via Nodemailer (placeholders en .env); GA4 con gtag y evento generate_lead en submit OK; SEO minimo (title/desc por pagina, favicon, Organization JSON-LD en layout).
- Brand/Design: paleta, Plus Jakarta Sans + Inter, navbar/footer, spacing y jerarquia limpios.
- Fuera de alcance para v1: multistep QuoteBuilder, subfamilias/filtros complejos, schemas extra, next-sitemap, MDX completo, WCAG exhaustivo, i18n, detalle de proyecto, CWV avanzadas.
- Definition of Done (DoD):
  (a) npm run dev navega sin errores por todas las paginas del alcance.
  (b) Forms envian a /api/lead y muestran toast OK/ERROR (sin exponer secretos).
  (c) npm run build pasa local.
  (d) Deploy en Vercel con variables .env y URL publica operativa.
  (e) Emite senal HOLAHOLAHOLAHOLA  MVP-1D ENTREGADO  y crea /docs/CHECKPOINT_MVP1D.txt con la URL.
