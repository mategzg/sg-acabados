# SG Acabados � Sitio oficial

Sitio corporativo construido con Next.js 14 (App Router), TypeScript, Tailwind CSS y una capa de componentes inspirada en shadcn/ui para SG Acabados, l�nea especializada de SG Servicios Generales S.A.C.

## Caracter�sticas clave

- Contenido en espa�ol (es-PE) con base preparada para internacionalizaci�n futura.
- Paleta Carb�n, Arena SG, Marfil y Neutro t�cnico; tipograf�as Plus Jakarta Sans e Inter v�a `next/font`.
- Arquitectura de secciones completa: Inicio, Productos (familias y subfamilias), Soluciones por sector, Proyectos, Nosotros, Contacto y Cotizar.
- Formularios validados con React Hook Form + Zod, multistep Quote Builder y API `/api/lead` que env�a v�a SMTP (Nodemailer) al correo corporativo.
- Integraciones SEO/anal�tica: GA4 (eventos view_item_list, view_item, generate_lead, click_whatsapp, file_download), JSON-LD (Organization, LocalBusiness, Service, Project), `robots.txt` y `sitemap.xml`.
- Accesibilidad enfocada en WCAG 2.2 AA: foco visible, navegaci�n por teclado, contraste y componentes sem�nticos.
- C�digo formateado con Prettier y validado con `next lint`.

## Estructura del proyecto

```
src/
  app/
    (marketing)/               # P�ginas p�blicas
      productos/[�]/�          # Familias y subfamilias
      soluciones/[�]/�
      proyectos/[�]/�
      contacto/, cotizar/�
    api/lead/route.ts          # Endpoint SMTP
    robots.ts, sitemap.ts      # SEO t�cnico
  components/
    analytics/                 # Disparadores GA4
    layout/, ui/, �            # Sistema de dise�o
  config/site.ts               # Metadatos, navegaci�n, oficinas
  content/                     # Contenido MDX (familias, sectores, etc.)
  lib/                         # Utilities (content loader, SEO, gtag�)
  types/                       # Definiciones tipadas
public/
  logos/logo-sg.png            # Logo provisto
  descargas/CATALOGO-SG-2024.pdf
  images/                      # Placeholders locales listos para reemplazar
```


## Gestion de imagenes

- Guarda los archivos dentro de `public/`, idealmente en subcarpetas como `public/images` o `public/logos`.
- Usa nombres en kebab-case (`mi-asset.webp`) sin espacios, corchetes ni acentos.
- Prefiere formatos `.webp` y `.png` optimizados antes de subirlos.
- Importa mediante `next/image` definiendo `width` y `height` para evitar layout shifts:

```tsx
import Image from 'next/image'

<Image src="/images/ejemplo.webp" alt="Descripcion del recurso" width={800} height={600} />
```

Los contenidos est�n modelados en MDX (`src/content`) y se cargan mediante utilidades asincr�nicas tipadas. Para a�adir nuevas familias o proyectos basta con replicar el formato existente.

## Variables de entorno

Configura las siguientes variables antes de ejecutar la aplicacion (ver `.env.example`):

| Variable | Scope | Descripcion |
| --- | --- | --- |
| `NEXT_PUBLIC_GA_MEASUREMENT_ID` | Public | ID de Google Analytics 4 para eventos como `generate_lead`. |
| `NEXT_PUBLIC_SITE_URL` | Public | URL base utilizada para metadata y JSON-LD. |
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | Public | Numero en formato internacional sin signo + para CTA de WhatsApp. |
| `SMTP_HOST` | Server | Host SMTP del proveedor (ej. `smtp.gmail.com`). |
| `SMTP_PORT` | Server | Puerto SMTP (465 para SSL, 587 para STARTTLS). |
| `SMTP_SECURE` | Server | `true` si el puerto usa SSL directo; omitir o definir `false` para STARTTLS. |
| `SMTP_USER` | Server | Cuenta que autenticara el envio. |
| `SMTP_PASS` | Server | Credenciales del buzon (App Password recomendado). |
| `SMTP_FROM` | Server | Remitente mostrado en los correos (formato `Nombre <correo>`). |
| `LEAD_TO` | Server | Buzon que recibira los leads. |

Notas:
- Genera `SMTP_PASS` como App Password de Gmail con 2FA habilitado.
- Si `SMTP_SECURE` no se declara, el endpoint asume `true` cuando `SMTP_PORT` es `465`.
- Los formularios rechazan adjuntos mayores a 10 MB y solo aceptan PDF, DWG o DXF.

## Desarrollo local

```bash
npm install
npm run dev
```

- `npm run lint` valida con ESLint.
- `npm run typecheck` ejecuta comprobaci�n de tipos con `tsc --noEmit`.
- `npm run test` corre las pruebas unitarias con Vitest.
- `npm run build` prepara la aplicaci�n para producci�n.
- `npm run start` ejecuta la build ya generada.

## Anal�tica y medici�n

- GA4 via `NEXT_PUBLIC_GA_MEASUREMENT_ID`. Se inicializa en `app/(marketing)/layout.tsx`.
- Eventos enviados desde componentes cliente (`lib/gtag.ts`):
  - `view_item_list`: familias/subfamilias mostradas.
  - `view_item`: detalle de subfamilia.
  - `generate_lead`: env�os de formularios de cotizaci�n/contacto.
  - `click_whatsapp` y `file_download` para CTA clave.
- JSON-LD para Organization, dos sedes (LocalBusiness), Service (familias) y Project (detalle de caso).
- Checklist de QA (accesibilidad, SEO, performance) disponible en `docs/QA_CHECKLIST.md`.

## Contenido y formularios

- Familias, subfamilias, sectores, proyectos y FAQs viven en `src/content/**/*.mdx`.
- Quote Builder (`src/components/quote-builder.tsx`) es multistep, admite adjuntos PDF/DWG (hasta 10 MB) y alimenta `/api/lead`.
- Contacto reutiliza el mismo endpoint como `type=contacto`.
- Detalles del pipeline y buenas pr�cticas en `docs/FORMS.md`.

## Despliegue en Vercel

### Pre requisitos
- Ejecuta npm run lint, npm run typecheck y npm run build en local.
- Reune credenciales SMTP (usuario, app password, remitente) y el ID final de GA4.

### Creacion del proyecto
1. Crea el proyecto en el equipo de Vercel que administra los dominios de SG. Si no existe, crea un Team (por ejemplo "SG Acabados") antes de importar el repositorio.
2. Conecta el repositorio (GitHub, GitLab o Bitbucket). Vercel detecta automaticamente Next.js 14.
3. Mantener comandos por defecto:
   - Install: npm install
   - Build: npm run build
   - Output: manejado automaticamente por Next (no requiere cambios).
4. Activa las preview deployments para validar PR antes del merge.

### Variables de entorno
Configura las siguientes variables en Project Settings > Environment Variables. Replica la lista en Production, Preview y Development.

| Variable | Scope | Notas |
| --- | --- | --- |
| NEXT_PUBLIC_SITE_URL | Public | Produccion: https://www.sgacabados.pe. En preview usa la URL generada por Vercel. |
| NEXT_PUBLIC_GA_MEASUREMENT_ID | Public | Reemplaza por el ID real de GA4. |
| NEXT_PUBLIC_WHATSAPP_NUMBER | Public | Numero en formato internacional sin signos (ej. 5195...). |
| SMTP_HOST | Server | smtp.gmail.com si se usa Gmail. |
| SMTP_PORT | Server | 465 (SSL) o 587 (STARTTLS). |
| SMTP_SECURE | Server | true para SSL directo, false para STARTTLS. |
| SMTP_USER | Server | Cuenta emisora (sgacabadossac@gmail.com). |
| SMTP_PASS | Server | App Password generado para la cuenta SMTP. |
| SMTP_FROM | Server | Nombre y correo mostrados en la bandeja (ej. "SG Acabados <correo@dominio>"). |
| LEAD_TO | Server | Casilla de destino para los leads. |

Recomendaciones:
- Usa "vercel env pull .env.local" para sincronizar las variables en desarrollo.
- Actualiza NEXT_PUBLIC_SITE_URL con la URL final antes de publicar comunicados.
- Si el SMTP es Gmail, habilita 2FA y crea un App Password exclusivo.

### DNS y dominios
- Agrega www.sgacabados.pe (u otro dominio oficial) en Project Settings > Domains.
- Sigue los pasos de Vercel para configurar CNAME/ANAME segun el proveedor DNS.
- Comprueba que la URL publica coincide con NEXT_PUBLIC_SITE_URL una vez propagado.

### Checklist post despliegue
- Revisa /robots.txt y /sitemap.xml en el entorno productivo.
- Haz un recorrido rapido: Home -> Productos -> Soluciones -> Proyectos -> Cotizar y envialo con datos de prueba.
- Confirma en los logs que /api/lead retorna 200 y llega el correo SMTP.
- Valida en GA4 que se registran eventos generate_lead, click_whatsapp y file_download.

## Pr�ximos pasos sugeridos

- Cargar im�genes finales (reemplazar placeholders en `/public/images`).
- Ajustar textos y contenidos MDX con informaci�n oficial.
- Integrar reCAPTCHA o soluci�n antispam en `/api/lead` si se requiere.
- A�adir pruebas E2E (Playwright/Cypress) una vez estabilizada la UX.
- Preparar el locale EN cuando se defina la traducci�n oficial.




