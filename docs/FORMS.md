# Formularios y pipeline de leads

## Flujo
1. Los formularios ContactLeadForm y QuoteBuilder envían FormData al endpoint /api/lead.
2. use-lead-submission centraliza el fetch, maneja toasts de feedback y permite callbacks personalizados.
3. El endpoint valida con Zod, construye el HTML y envía vía Nodemailer (SMTP Gmail) a sgacabadossac@gmail.com.
4. GA4 registra generate_lead con metadatos (origin, sector, city) y al finalizar se limpia el formulario.

## Seguridad
- SMTP requiere App Password de Gmail (2FA habilitado).
- Variables de entorno obligatorias: SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, SMTP_FROM, LEAD_TO.
- Adjuntos: límite 10 MB, formatos PDF/DWG/DXF; se descartan cuando exceden el tamaño permitido.
- Logs del servidor solo se imprimen en consola; no se exponen datos sensibles al cliente.

## Próximos pasos sugeridos
- Integrar reCAPTCHA v3/v2 invisible (hook preparado para extender use-lead-submission).
- Añadir almacenamiento temporal de leads (CRM/Airtable) cuando el volumen lo requiera.
- Configurar firma DKIM/SPF en el dominio para mejorar la entregabilidad.
- Auditar periódicamente el buzón corporativo para evitar falsos positivos de spam.
