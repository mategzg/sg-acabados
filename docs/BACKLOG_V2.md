# Backlog V2 SG Acabados

## Prioridad Alta
- Formularios: integrar reCAPTCHA v3 o alternativa antispam y habilitar guardado en CRM (Airtable/HubSpot) con opt-in.
- Performance: optimizar imagenes reales (Next/Image con tamaños y blur personalizados) y ejecutar Lighthouse para validar >=95 en todas las categorias.
- Internacionalizacion: activar locale "en" con copies aprobados y selector en navbar.
- Deploy: configurar monitorizacion continua en Vercel (Speed Insights) y alertas de error via email/Slack.

## Prioridad Media
- Contenido: producir casos adicionales (6+) y testimonios, cargarlos en `src/content` con imagenes originales.
- UI/UX: convertir Quote Builder en flujo multistep con resumen antes de enviar y barra de progreso.
- SEO: implementar esquema FAQ y Breadcrumb en paginas clave y generar sitemap segmentado por idioma.
- Integraciones: habilitar seguimiento de conversiones en Google Ads y Meta con GTM o scripts dedicados.

## Prioridad Baja
- Automatizacion: agregar pruebas E2E (Playwright) para formularios y navegacion principal.
- Accesibilidad: planificar ronda con lector de pantalla (NVDA/VoiceOver) y documentar hallazgos.
- Operacion: crear dashboard interno para leads (tabla + filtros) usando Supabase o similar.
- Recursos: migrar configuraciones sensibles a Vercel KV/Secrets y documentar rotacion de credenciales.

## Notas
- Revisar este backlog despues del primer mes en produccion para repriorizar segun analitica real.
- Mantener toda la documentacion en ASCII (sin acentos) hasta que se confirme soporte UTF-8.
