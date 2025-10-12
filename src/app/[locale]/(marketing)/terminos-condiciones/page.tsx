import type { Metadata } from 'next'

import { Section } from '@/components/section'
import { Badge } from '@/components/ui/badge'
import { createMetadata } from '@/lib/seo'

export const revalidate = 3600

export async function generateMetadata(): Promise<Metadata> {
  return createMetadata({
    locale: 'es',
    title: 'Términos y condiciones',
    description: 'Condiciones de uso del sitio web SG Acabados y lineamientos de contratación.',
    path: '/terminos-condiciones'
  })
}

const clauses = [
  {
    title: '1. Aceptación de términos',
    content:
      'Al navegar o enviar información a través de sgacabados.pe aceptas estos términos y te comprometes a brindar datos veraces.'
  },
  {
    title: '2. Alcance de los servicios',
    content:
      'Las propuestas comerciales incluyen diseño, suministro e instalación de acabados y sistemas integrales según el alcance definido en la cotización.'
  },
  {
    title: '3. Propiedad intelectual',
    content:
      'Los contenidos, logotipos y materiales descargables son propiedad de SG Acabados S.A.C. Queda prohibida su reproducción sin autorización.'
  },
  {
    title: '4. Confidencialidad',
    content:
      'La documentación técnica compartida por nuestros clientes se maneja bajo estricta confidencialidad y solo se usa para elaborar propuestas.'
  },
  {
    title: '5. Limitación de responsabilidad',
    content:
      'SG Acabados no asume responsabilidad por interrupciones temporales del servicio web ni por el uso indebido de la información publicada por terceros.'
  },
  {
    title: '6. Modificaciones',
    content:
      'Podemos actualizar estos términos para reflejar cambios normativos o mejoras del servicio. La versión vigente estará siempre publicada en este sitio.'
  }
]

export default function TerminosCondicionesPage() {
  return (
    <Section className="bg-white">
      <div className="container space-y-10">
        <div className="space-y-4">
          <Badge variant="accent" className="w-fit">Términos y condiciones</Badge>
          <h1 className="font-heading text-4xl font-semibold text-foreground md:text-5xl">
            Uso del sitio y servicios SG Acabados
          </h1>
          <p className="max-w-2xl text-muted-foreground">
            Estas cláusulas regulan la relación entre SG Acabados y las empresas que solicitan información o envían
            datos mediante nuestro sitio web.
          </p>
        </div>
        <div className="space-y-6">
          {clauses.map((item) => (
            <div key={item.title} className="space-y-2 rounded-3xl border border-border/60 bg-white/95 p-6 shadow-soft">
              <h2 className="font-heading text-xl font-semibold text-foreground">{item.title}</h2>
              <p className="text-sm text-muted-foreground">{item.content}</p>
            </div>
          ))}
        </div>
        <p className="text-xs text-muted-foreground">
          Vigente desde septiembre 2025. Última revisión: {new Date().toLocaleDateString('es-PE')}.
        </p>
      </div>
    </Section>
  )
}
