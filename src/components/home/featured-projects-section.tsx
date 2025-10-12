import Image from 'next/image'
import type { LucideIcon } from 'lucide-react'
import { Clock4, Layers3, MapPin, Ruler, Sparkles } from 'lucide-react'

import { LocalizedLink as Link } from '@/components/localized-link'
import { projectShowcase } from '@/data/project-showcase'
import { Section } from '@/components/section'
import { Badge } from '@/components/ui/badge'
import { Card } from '@/components/ui/card'
import { DEFAULT_BLUR_DATA_URL } from '@/lib/images'

type FeaturedCard = {
  id: string
  name: string
  sector: string
  summary: string
  metrics: {
    label: string
    value: string
    icon: LucideIcon
  }[]
  image: { src: string; alt: string }
  href: string
}

const FEATURED_PATTERNS: Array<{
  tokens: string[]
  override: FeaturedCard
}> = [
  {
    tokens: ['jorge', 'chavez'],
    override: {
      id: 'jorge-chavez',
      name: 'Aeropuerto Internacional Jorge Chávez  Ampliación',
      sector: 'Aeropuertos y transporte',
      summary: 'Suministro e instalación de tabiquería de drywall para el terminal del proyecto de ampliación.',
      metrics: [
        { label: 'Metros intervenidos', value: '3 200 m2', icon: Ruler },
        { label: 'Especialidades', value: 'Tabiquería drywall', icon: Layers3 },
        { label: 'Plazo', value: '8 semanas', icon: Clock4 }
      ],
      image: {
        src: '/images/proyectos/aeropuerto-jorge-chavez-1.jpg',
        alt: 'Sala de embarque renovada en el aeropuerto Jorge Chávez'
      },
      href: '/proyectos/aeropuerto-jorge-chavez'
    }
  },
  {
    tokens: ['videna'],
    override: {
      id: 'videna-control-solar',
      name: 'VIDENA  Sistema de Control Solar y de Vientos',
      sector: 'Deportes / Infraestructura',
      summary: 'Venta e instalación de sistemas de control solar y vientos con celosías de lamas orientables exteriores.',
      metrics: [
        { label: 'Especialidades', value: 'Control solar, celosías orientables', icon: Layers3 },
        { label: 'Ubicación', value: 'San Luis, Lima', icon: MapPin },
        { label: 'Entrega', value: 'Junio 2019', icon: Clock4 }
      ],
      image: {
        src: '/images/proyectos/videna-centro-deportivo-1.jpg',
        alt: 'Celosías orientables instaladas en la VIDENA'
      },
      href: '/proyectos/videna-centro-deportivo'
    }
  },
  {
    tokens: ['tecsup'],
    override: {
      id: 'tecsup-auditorio',
      name: 'TECSUP  Auditorio (Sede Arequipa)',
      sector: 'Educación',
      summary: 'Construcción de auditorio con tabiquería, cielos rasos, recubrimiento de pisos, butacas e iluminación.',
      metrics: [
        { label: 'Alcance', value: 'Auditorio sede Arequipa', icon: Layers3 },
        { label: 'Especialidades', value: 'Tabiquería, cielos, butacas', icon: Sparkles },
        { label: 'Entrega', value: '2017', icon: Clock4 }
      ],
      image: {
        src: '/images/placeholders/generic-card.webp',
        alt: 'Vista referencial de auditorio TECSUP en Arequipa'
      },
      href: '/proyectos'
    }
  }
]

function findProject(tokens: string[]) {
  const lowerTokens = tokens.map((token) => token.toLowerCase())
  return projectShowcase.find((project) => {
    const id = project.id.toLowerCase()
    const name = project.name.toLowerCase()
    const href = project.href.toLowerCase()
    return lowerTokens.every((token) => id.includes(token) || name.includes(token) || href.includes(token))
  })
}

const featuredProjects: FeaturedCard[] = FEATURED_PATTERNS.map(({ tokens, override }) => {
  const matched = findProject(tokens)
  if (!matched) {
    return override
  }

  return {
    ...override,
    sector: override.sector || matched.sector,
    image: matched.image ?? override.image
  }
})

export function FeaturedProjectsSection() {
  return (
    <Section id="proyectos">
      <div className="container space-y-space-2xl">
        <div className="flex flex-col gap-space-md md:flex-row md:items-end md:justify-between">
          <div className="space-y-space-sm md:max-w-2xl">
            <Badge variant="secondary" className="w-fit">Casos reales</Badge>
            <h2 className="text-balance font-heading text-3xl font-semibold text-foreground md:text-4xl">
              Proyectos que entregamos a tiempo
            </h2>
            <p className="text-balance text-muted-foreground">
              Aeropuertos, retail y salud donde coordinamos acabados, mobiliario y sistemas para abrir sin retrasos.
            </p>
          </div>
          <Link
            href="/proyectos"
            className="text-sm font-semibold text-primary underline-offset-4 hover:text-primary/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background md:self-end"
            aria-label="Ver todos los proyectos"
          >
            Ver todos los proyectos
          </Link>
        </div>
        <div className="grid gap-space-lg md:grid-cols-2 xl:grid-cols-3">
          {featuredProjects.map((project, index) => (
            <Card
              key={project.id}
              className="flex h-full flex-col overflow-hidden rounded-3xl border border-border/70 bg-white/95 shadow-soft transition-transform duration-200 hover:-translate-y-1"
            >
              <div className="relative aspect-[4/3]">
                <Image
                  src={project.image.src}
                  alt={project.image.alt}
                  fill
                  className="object-cover"
                  sizes="(min-width: 1280px) 360px, (min-width:768px) 45vw, 90vw"
                  priority={index === 0}
                  placeholder="blur"
                  blurDataURL={DEFAULT_BLUR_DATA_URL}
                />
              </div>
              <div className="flex flex-1 flex-col gap-space-sm p-space-lg">
                <span className="text-xs uppercase tracking-[0.3em] text-muted-foreground">{project.sector}</span>
                <h3 className="font-heading text-2xl font-semibold text-foreground">{project.name}</h3>
                <p className="text-sm text-muted-foreground">{project.summary}</p>
                <ul className="space-y-2 text-xs text-muted-foreground md:text-sm">
                  {project.metrics.map((metric) => (
                    <li key={`${project.id}-${metric.label}`} className="flex items-start justify-between gap-space-sm">
                      <span className="flex items-center gap-2 font-semibold text-foreground/80">
                        <metric.icon className="h-4 w-4 text-primary" aria-hidden="true" />
                        {metric.label}
                      </span>
                      <span className="text-right text-muted-foreground">{metric.value}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-auto pt-space-sm">
                  <Link
                    href={project.href}
                    className="text-sm font-semibold text-primary underline-offset-4 hover:text-primary/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-white"
                    aria-label={`Ver detalle del proyecto ${project.name}`}
                  >
                    Ver detalle del proyecto
                  </Link>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </Section>
  )
}
