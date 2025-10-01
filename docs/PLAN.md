# Plan de trabajo MVP-1D SG Acabados

## Datos
- Fecha de actualizacion: 2025-10-01 03:15:18
- Responsable: Codex (asistente)
- Duracion estimada por tarea: 60 min

## Tareas
| # | Tarea | Estado | ETA (min) |
|---|-------|--------|-----------|
| 1 | Mapear estructura actual del repo y documentar supuestos MVP-1D. | Completada | 60 |
| 2 | Inventariar assets necesarios (logos, imagenes) y confirmar disponibilidad. | Completada | 60 |
| 3 | Verificar configuracion de TypeScript (baseUrl/paths) y planificar ajustes. | Completada | 60 |
| 4 | Revisar configuracion Tailwind y definir tokens de color/spacing iniciales. | Completada | 60 |
| 5 | Integrar fuentes Plus Jakarta Sans e Inter via next/font. | Completada | 60 |
| 6 | Configurar layout raiz con html lang, favicon y meta base. | Completada | 60 |
| 7 | Implementar Navbar con enlaces a todas las paginas del alcance. | Completada | 60 |
| 8 | Implementar Footer con datos de contacto y enlaces legales. | Completada | 60 |
| 9 | Definir datos de servicios (6 items) en src/data/services. | Completada | 60 |
| 10 | Disenar seccion Hero de Home con copy y CTA principal. | Completada | 60 |
| 11 | Implementar seccion servicios de Home usando datos centralizados. | Completada | 60 |
| 12 | Preparar data y componentes para proyectos destacados (3 cards) en Home. | Completada | 60 |
| 13 | Implementar seccion CTA final de Home apuntando a /cotizar. | Completada | 60 |
| 14 | Ajustar responsive y jerarquia visual de Home. | Completada | 60 |
| 15 | Redactar metadata (title/description) para Home en App Router. | Completada | 30 |
| 16 | Preparar estructura de datos para familias de productos (nombre, descripcion, CTA). | Completada | 60 |
| 17 | Implementar pagina /productos con grid y CTA Cotizar por familia. | Completada | 60 |
| 18 | Afinar estilos responsivos y focus en /productos. | Completada | 45 |
| 19 | Redactar metadata para /productos. | Completada | 30 |
| 20 | Crear layout compartido para /soluciones con navegacion secundaria si aplica. | Completada | 60 |
| 21 | Implementar contenido de /soluciones/oficinas (texto+bullets+CTA). | Completada | 60 |
| 22 | Implementar contenido de /soluciones/retail (texto+bullets+CTA). | Completada | 60 |
| 23 | Implementar contenido de /soluciones/salud (texto+bullets+CTA). | Completada | 60 |
| 24 | Validar responsive y accesibilidad en paginas de soluciones. | Completada | 45 |
| 25 | Redactar metadata individual para cada solucion. | Completada | 30 |
| 26 | Definir data inicial para proyectos (3 items) reutilizable en portafolio. | Completada | 45 |
| 27 | Implementar pagina /proyectos con grid y detalles basicos. | Completada | 60 |
| 28 | Ajustar responsive, alt text e interacciones en /proyectos. | Completada | 45 |
| 29 | Redactar metadata para /proyectos. | Completada | 30 |
| 30 | Disenar pagina /contacto con info de contacto, mapa y CTA. | Completada | 60 |
| 31 | Garantizar formularios accesibles o enlaces de contacto en /contacto. | Completada | 45 |
| 32 | Redactar metadata para /contacto. | Completada | 30 |
| 33 | Disenar pagina /cotizar con formulario 1 paso (campos minimos). | Completada | 60 |
| 34 | Definir esquema Zod para datos de lead. | Completada | 45 |
| 35 | Implementar componente de formulario con estados controlados y validacion UI. | Completada | 60 |
| 36 | Integrar toasts de exito/error usando shadcn/ui. | Completada | 45 |
| 37 | Conectar formulario a hook use-lead-submission. | Completada | 45 |
| 38 | Emision de evento GA4 generate_lead en submit exitoso. | Completada | 30 |
| 39 | Integrar script gtag y measurement id en layout. | Completada | 30 |
| 40 | Implementar endpoint /api/lead con validacion Zod. | Completada | 60 |
| 41 | Configurar Nodemailer con placeholders de env y envio basico. | Completada | 45 |
| 42 | Manejar limites de adjuntos y tipos permitidos en API. | Completada | 45 |
| 43 | Anadir logs controlados y manejo de errores robusto en API. | Completada | 30 |
| 44 | Documentar variables de entorno requeridas en README u otra doc. | Completada | 30 |
| 45 | Implementar JSON-LD Organization en layout. | Completada | 30 |
| 46 | Configurar metadata (title/description) para /cotizar. | Completada | 30 |
| 47 | Integrar iconografia Lucide en secciones pertinentes. | Completada | 30 |
| 48 | Revisar focus visibles y contraste en botones y enlaces clave. | Completada | 45 |
| 49 | Auditar que componentes con handlers tengan 'use client'. | Completada | 30 |
| 50 | Limpiar imports para usar rutas absolutas segun tsconfig. | Completada | 30 |
| 51 | Normalizar contenido estatico (copys) segun brand guidelines. | Completada | 45 |
| 52 | Asegurar placeholders de imagenes optimizados en /public. | Completada | 45 |
| 53 | Ejecutar revision manual de navegacion teclado. | Completada | 30 |
| 54 | Ejecutar npm run lint y corregir errores. | Completada | 45 |
| 55 | Ejecutar npm run build y solucionar fallos. | Completada | 60 |
| 56 | Preparar configuracion de despliegue Vercel (env vars, equipos). | Completada | 45 |
| 57 | Registrar resultado de smoke test navegando todas las paginas en LOG. | Completada | 30 |
| 58 | Documentar backlog v2 y mejoras futuras tras MVP-1D. | Completada | 45 |





| 59 | Integrar utilidades de email/GA y refrescar /api/lead. | Completada | 60 |
| 60 | Actualizar formularios de contacto/cotizar para enviar JSON y trackLead. | Completada | 90 |
| 61 | Documentar QA y validar build con npm run build. | Completada | 45 |
