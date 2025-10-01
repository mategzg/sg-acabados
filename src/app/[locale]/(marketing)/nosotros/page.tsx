import type { Metadata } from 'next'

import { Section } from '@/components/section'
import { CatalogBanner } from '@/components/catalog-banner'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { siteConfig } from '@/config/site'
import { createMetadata } from '@/lib/seo'

export const revalidate = 3600

export async function generateMetadata(): Promise<Metadata> {
  return createMetadata({
    locale: 'es',
    title: 'Nosotros',
    description: 'Conoce la historia, equipo y certificaciones de SG Acabados, unidad de SG Servicios Generales S.A.C.',
    path: '/nosotros'
  })
}

const values = [
  {
    title: 'Excelencia operativa',
    description: 'Metodologias Lean y coordinacion Last Planner para cumplir los cronogramas sin sacrificar calidad.'
  },
  {
    title: 'Seguridad y sostenibilidad',
    description: 'Protocolos HSE, materiales certificados y planes de manejo ambiental para cada obra.'
  },
  {
    title: 'Integracion 360o',
    description: 'Un unico equipo coordina acabados, mobiliario y sistemas MEP para reducir interferencias y retrabajos.'
  },
  {
    title: 'Cercania y servicio',
    description: 'Acompanamos al cliente desde la ingenieria hasta la postventa con indicadores de satisfaccion compartidos.'
  }
]


const certifications = [
  'ISO 9001:2015 - Gestion de calidad',
  'ISO 45001:2018 - Seguridad y salud ocupacional',
  'Miembros de Green Building Council Peru',
  'Integradores certificados NFPA y ASHRAE'
]

const timeline = [
  {
    year: '2003',
    title: 'Fundacion en Arequipa',
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
    description: 'Se consolida la unidad multiespecialidad que integra acabados, mobiliario y sistemas tecnicos.'
  },
  {
    year: '2023',
    title: 'Operacion nacional',
    description: 'Coordinamos proyectos simultaneos en aeropuertos, salud y oficinas en todo el Peru.'
  }
]

export default function NosotrosPage() {
  return (
    <>
      <Section className="bg-white">
        <div className="container space-y-8">
          <Badge variant="accent" className="w-fit">Nosotros</Badge>
          <div className="grid gap-8 lg:grid-cols-[1.1fr,0.9fr]">
            <div className="space-y-4">
              <h1 className="font-heading text-4xl font-semibold text-foreground md:text-5xl">
                +20 años elevando proyectos en el Peru
              </h1>
              <p className="text-lg text-muted-foreground">
                SG Acabados es la unidad especializada de SG Servicios Generales S.A.C. enfocada en integrar acabados, mobiliario y sistemas para proyectos corporativos, retail, salud y aeropuertos.
              </p>
              <div className="grid gap-4 md:grid-cols-2">
                <Card className="bg-white/95">
                  <CardContent className="space-y-2 p-6">
                    <h2 className="font-heading text-xl font-semibold text-foreground">Mision</h2>
                    <p className="text-sm text-muted-foreground">
                      Entregar espacios listos para operar, garantizando plazos, seguridad y sostenibilidad en cada especialidad.
                    </p>
                  </CardContent>
                </Card>
                <Card className="bg-white/95">
                  <CardContent className="space-y-2 p-6">
                    <h2 className="font-heading text-xl font-semibold text-foreground">Vision</h2>
                    <p className="text-sm text-muted-foreground">
                      Ser el aliado preferido de las empresas lideres del pais para transformar infraestructura compleja en experiencias memorables.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
            <Card className="bg-secondary/30">
              <CardContent className="space-y-4 p-6">
                <h2 className="font-heading text-lg font-semibold text-foreground">Sedes y cobertura</h2>
                <ul className="space-y-3 text-sm text-muted-foreground">
                  {siteConfig.offices.map((office) => (
                    <li key={office.city}>
                      <span className="font-semibold text-foreground">{office.city}</span> - {office.address}
                    </li>
                  ))}
                </ul>
                <p className="text-sm text-muted-foreground">
                  Ejecutamos proyectos en Lima, Arequipa, Cusco, Trujillo y operaciones remotas coordinadas para mineria e industria.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </Section>

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
