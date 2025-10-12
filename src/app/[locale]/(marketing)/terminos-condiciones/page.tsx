import type { Metadata } from 'next'

import { Section } from '@/components/section'
import { Badge } from '@/components/ui/badge'
import { createMetadata } from '@/lib/seo'

export const revalidate = 3600

export async function generateMetadata(): Promise<Metadata> {
  return createMetadata({
    locale: 'es',
    title: 'Terminos y condiciones',
    description: 'Condiciones de uso del sitio web SG Acabados y lineamientos de contratacion.',
    path: '/terminos-condiciones'
  })
}

const clauses = [
  {
    title: '1. Aceptacion de terminos',
    content:
      'Al navegar o enviar informacion a traves de sgacabados.pe aceptas estos terminos y te comprometes a brindar datos veraces.'
  },
  {
    title: '2. Alcance de los servicios',
    content:
      'Las propuestas comerciales incluyen diseno, suministro e instalacion de acabados y sistemas integrales segun el alcance definido en la cotizacion.'
  },
  {
    title: '3. Propiedad intelectual',
    content:
      'Los contenidos, logotipos y materiales descargables son propiedad de SG Acabados S.A.C. Queda prohibida su reproduccion sin autorizacion.'
  },
  {
    title: '4. Confidencialidad',
    content:
      'La documentacion tecnica compartida por nuestros clientes se maneja bajo estricta confidencialidad y solo se usa para elaborar propuestas.'
  },
  {
    title: '5. Limitacion de responsabilidad',
    content:
      'SG Acabados no asume responsabilidad por interrupciones temporales del servicio web ni por el uso indebido de la informacion publicada por terceros.'
  },
  {
    title: '6. Modificaciones',
    content:
      'Podemos actualizar estos terminos para reflejar cambios normativos o mejoras del servicio. La version vigente estara siempre publicada en este sitio.'
  }
]

export default function TerminosCondicionesPage() {
  return (
    <Section className="bg-white">
      <div className="container space-y-10">
        <div className="space-y-4">
          <Badge variant="accent" className="w-fit">Terminos y condiciones</Badge>
          <h1 className="font-heading text-4xl font-semibold text-foreground md:text-5xl">
            Uso del sitio y servicios SG Acabados
          </h1>
          <p className="max-w-2xl text-muted-foreground">
            Estas clausulas regulan la relacion entre SG Acabados y las empresas que solicitan informacion o envian
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
          Vigente desde septiembre 2025. Ultima revision: {new Date().toLocaleDateString('es-PE')}.
        </p>
      </div>
    </Section>
  )
}
