import Image from 'next/image'
import { LocalizedLink as Link } from '@/components/localized-link'

import { featuredProjects } from '@/data/projects'
import { Section } from '@/components/section'
import { Badge } from '@/components/ui/badge'
import { Card } from '@/components/ui/card'
import { DEFAULT_BLUR_DATA_URL } from '@/lib/images'

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
          >
            Ver todos los proyectos
          </Link>
        </div>
        <div className="grid gap-space-lg md:grid-cols-2 xl:grid-cols-3">
          {featuredProjects.map((project) => (
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
                  priority={project.id === 'jorge-chavez'}
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
                    <li key={metric.label} className="flex items-start justify-between gap-space-sm">
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


