import type { Metadata } from 'next'

import { Section } from '@/components/section'
import { Badge } from '@/components/ui/badge'
import { createMetadata } from '@/lib/seo'

export const revalidate = 3600

export async function generateMetadata(): Promise<Metadata> {
  return createMetadata({
    locale: 'es',
    title: 'Politica de privacidad',
    description: 'Conoce como SG Acabados protege tus datos personales y gestiona las solicitudes de cotizacion.',
    path: '/politica-privacidad'
  })
}

export default function PoliticaPrivacidadPage() {
  const sections = [
    {
      title: '1. Responsable del tratamiento',
      content:
        'SG Acabados S.A.C. (SG Acabados) es responsable del tratamiento de los datos personales recopilados a traves del sitio web sgacabados.pe.'
    },
    {
      title: '2. Finalidades',
      content:
        'Utilizamos tu informacion para responder consultas comerciales, preparar propuestas, coordinar visitas tecnicas y brindar seguimiento postventa.'
    },
    {
      title: '3. Datos que recolectamos',
      content:
        'Nombre, correo, telefono, empresa, ciudad, informacion del proyecto y archivos adjuntos como planos o especificaciones tecnicas.'
    },
    {
      title: '4. Conservacion',
      content:
        'Los datos se almacenan en infraestructura segura y se conservan mientras exista una relacion comercial o sea necesario para fines contables y legales.'
    },
    {
      title: '5. Derechos ARCO',
      content:
        'Puedes solicitar acceso, rectificacion, cancelacion u oposicion escribiendo a sgacabadossac@gmail.com. Respondemos en un maximo de 15 dias habiles.'
    },
    {
      title: '6. Seguridad',
      content:
        'Implementamos controles de acceso, cifrado en transito y protocolos de respaldo para prevenir accesos no autorizados.'
    },
    {
      title: '7. Actualizaciones',
      content:
        'Esta politica puede actualizarse para reflejar nuevas regulaciones o servicios. Publicaremos la fecha de vigencia de la ultima modificacion.'
    }
  ]

  return (
    <Section className="bg-white">
      <div className="container space-y-10">
        <div className="space-y-4">
          <Badge variant="accent" className="w-fit">Politica de privacidad</Badge>
          <h1 className="font-heading text-4xl font-semibold text-foreground md:text-5xl">
            Protegemos tus datos personales
          </h1>
          <p className="max-w-2xl text-muted-foreground">
            Esta politica describe como recolectamos, usamos y protegemos la informacion que nos confias
            cuando solicitas una cotizacion o nos contactas.
          </p>
        </div>
        <div className="space-y-6">
          {sections.map((item) => (
            <div key={item.title} className="space-y-2 rounded-3xl border border-border/60 bg-white/95 p-6 shadow-soft">
              <h2 className="font-heading text-xl font-semibold text-foreground">{item.title}</h2>
              <p className="text-sm text-muted-foreground">{item.content}</p>
            </div>
          ))}
        </div>
        <p className="text-xs text-muted-foreground">
          Vigente desde septiembre 2025. Ultima revision: {new Date().toLocaleDateString('es-PE')}.
        </p>
      </div>
    </Section>
  )
}
