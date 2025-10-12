import type { Metadata } from 'next'

import { Section } from '@/components/section'
import { SedesCobertura } from '@/components/sections/sedes-cobertura'
import { CatalogBanner } from '@/components/catalog-banner'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { createMetadata } from '@/lib/seo'

export const revalidate = 3600

export async function generateMetadata(): Promise<Metadata> {
  return createMetadata({
    locale: 'es',
    title: 'Nosotros',
    description: 'Conoce la historia, equipo y certificaciones de SG Acabados, unidad de SG Acabados S.A.C.',
    path: '/nosotros'
  })
}

const values = [
  {
    title: 'Excelencia operativa',
    description: 'Metodologias Lean y coordinación Last Planner para cumplir los cronogramas sin sacrificar calidad.'
  },
  {
    title: 'Seguridad y sostenibilidad',
    description: 'Protocolos HSE, materiales certificados y planes de manejo ambiental para cada obra.'
  },
  {
    title: 'Integración 360o',
    description: 'Un unico equipo coordina acabados, mobiliario y sistemas MEP para reducir interferencias y retrabajos.'
  },
  {
    title: 'Cercania y servicio',
    description: 'Acompanamos al cliente desde la ingenieria hasta la posventa con indicadores de satisfacción compartidos.'
  }
]


const certifications = [
  'ISO 9001:2015 - Gestion de calidad',
  'ISO 45001:2018 - Seguridad y salud ocupacional',
  'Miembros de Green Building Council Perú',
  'Integradores certificados NFPA y ASHRAE'
]

const timeline = [
  {
    year: '2003',
    title: 'Fundación en Arequipa',
    description: 'SG Servicios Generales inicia operaciones especializadas en acabados corporativos.'
  },
  {
    year: '2010',
    title: 'Expansion a Lima',
    description: 'Se despliega un equipo itinerante especializado para proyectos de gran escala y retail en la capital.'
  },
  {
    year: '2016',
    title: 'Nace SG Acabados',
    description: 'Se consolida la unidad multiespecialidad que integra acabados, mobiliario y sistemas técnicos.'
  },
  {
    year: '2023',
    title: 'Operación nacional',
    description: 'Coordinamos proyectos simultaneos en aeropuertos, salud y oficinas en todo el Perú.'
  }
]

export default function NosotrosPage() {
  return (
    <>
      <section className="bg-white py-12 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-10">
            <Badge variant="accent" className="w-fit">Nosotros</Badge>
            <div className="lg:grid lg:grid-cols-12 lg:gap-12">
              <div className="lg:col-span-7">
                <h1 className="font-heading text-4xl md:text-5xl font-semibold tracking-tight leading-tight text-foreground">
                  +20 años elevando proyectos en el Perú
                </h1>
                <p className="mt-4 max-w-xl text-base text-muted-foreground">
                  SG Acabados es la unidad especializada de SG Acabados S.A.C. enfocada en integrar acabados, mobiliario y sistemas para proyectos corporativos, retail, salud y aeropuertos.
                </p>
                <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="rounded-2xl border bg-card p-5 shadow-sm">
                    <h3 className="text-lg font-medium">Misión</h3>
                    <p className="mt-2 text-sm text-muted-foreground">
                      Entregar espacios listos para operar, garantizando plazos, seguridad y sostenibilidad en cada especialidad.
                    </p>
                  </div>
                  <div className="rounded-2xl border bg-card p-5 shadow-sm">
                    <h3 className="text-lg font-medium">Visión</h3>
                    <p className="mt-2 text-sm text-muted-foreground">
                      Ser el aliado preferido de las empresas líderes del país para transformar infraestructura compleja en experiencias memorables.
                    </p>
                  </div>
                </div>
              </div>
              <aside className="mt-10 lg:mt-0 lg:col-span-5">
                <SedesCobertura />
              </aside>
            </div>
          </div>
        </div>
      </section>

      <Section className="bg-white">
        <div className="container space-y-8">
          <h2 className="font-heading text-3xl font-semibold text-foreground">Nuestra linea de tiempo</h2>
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {timeline.map((milestone) => (
              <Card key={milestone.year} className="bg-white/95 p-6">
                <CardContent className="space-y-3">
                  <span className="font-heading text-xl font-semibold text-primary">{milestone.year}</span>
                  <h3 className="font-heading text-lg font-semibold text-foreground">{milestone.title}</h3>
                  <p className="text-sm text-muted-foreground">{milestone.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </Section>

      <Section className="container space-y-8">
        <h2 className="font-heading text-3xl font-semibold text-foreground">Nuestros valores</h2>
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {values.map((value) => (
            <Card key={value.title} className="bg-white/95">
              <CardContent className="space-y-3 p-6">
                <h3 className="font-heading text-lg font-semibold text-foreground">{value.title}</h3>
                <p className="text-sm text-muted-foreground">{value.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </Section>

      <Section className="bg-white">
        <div className="container space-y-8">
          <Card className="bg-brand-marfil/30 border border-border/70 p-space-xl shadow-soft">
            <CardContent className="space-y-space-md">
              <h2 className="font-heading text-3xl font-semibold text-foreground">Liderazgo</h2>
              <p className="font-heading text-2xl font-semibold text-primary">Edmundo Gonzalez-Zuñiga</p>
              <p className="text-sm text-muted-foreground">Propietario de SG Acabados</p>
              <blockquote className="text-base text-foreground/80 italic">
                &ldquo;Con más de 20 años en el sector de la construcción, hemos mantenido un compromiso inquebrantable con la calidad, la innovación, la honestidad y la transparencia. Cada proyecto para nosotros refleja la dedicación a superar expectativas, construir relaciones de confianza con nuestros clientes y operar siempre con integridad. Agradezco a quienes nos han acompañado en este viaje y seguimos listos para construir juntos un futuro sólido y exitoso.&rdquo;
              </blockquote>
            </CardContent>
          </Card>
        </div>
      </Section>

      <Section className="container space-y-6">
        <h2 className="font-heading text-3xl font-semibold text-foreground">Certificaciones y reconocimientos</h2>
        <ul className="grid gap-4 md:grid-cols-2">
          {certifications.map((item) => (
            <li key={item} className="rounded-3xl border border-border bg-white/95 p-4 text-sm text-muted-foreground">
              {item}
            </li>
          ))}
        </ul>
      </Section>

      <CatalogBanner />
    </>
  )
}
