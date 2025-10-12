import Image from 'next/image'

import { DEFAULT_BLUR_DATA_URL } from '@/lib/images'
import { LocalizedLink as Link } from '@/components/localized-link'

import type { ProjectShowcase } from '@/data/project-showcase'
import { Card } from '@/components/ui/card'

export function ProjectShowcaseCard({ project }: { project: ProjectShowcase }) {
  return (
    <Card
      className="flex h-full flex-col overflow-hidden rounded-3xl border border-border/70 bg-white/95 shadow-soft transition-transform duration-200 hover:-translate-y-1 focus-within:-translate-y-1 focus-within:ring-2 focus-within:ring-accent focus-within:ring-offset-2"
    >
      <div className="relative aspect-[4/3]">
        <Image
          src={project.image.src}
          alt={project.image.alt}
          fill
          className="object-cover"
          sizes="(min-width: 1280px) 360px, (min-width: 768px) 50vw, 100vw"
          placeholder="blur"
          blurDataURL={DEFAULT_BLUR_DATA_URL}
        />
      </div>
      <div className="flex flex-1 flex-col gap-space-sm p-space-lg">
        <span className="text-xs uppercase tracking-[0.3em] text-muted-foreground">{project.sector}</span>
        <h3 className="font-heading text-2xl font-semibold text-foreground">{project.name}</h3>
        <p className="text-sm text-muted-foreground">{project.summary}</p>
        <dl className="grid grid-cols-2 gap-space-sm text-xs text-muted-foreground">
          <div>
            <dt className="font-semibold text-foreground/80">Ubicación</dt>
            <dd>{project.location}</dd>
          </div>
          <div>
            <dt className="font-semibold text-foreground/80">Area</dt>
            <dd>{project.area}</dd>
          </div>
          <div>
            <dt className="font-semibold text-foreground/80">Plazo</dt>
            <dd>{project.timeframe}</dd>
          </div>
          <div>
            <dt className="font-semibold text-foreground/80">Especialidades</dt>
            <dd>{project.specialties.join(', ')}</dd>
          </div>
        </dl>
        <div className="space-y-2">
          <h4 className="font-heading text-sm font-semibold text-foreground">Solución coordinada</h4>
          <ul className="space-y-1 text-sm text-foreground/80">
            {project.solution.map((item) => (
              <li key={item}>- {item}</li>
            ))}
          </ul>
        </div>
        <div className="mt-auto pt-space-sm">
          <Link
            href={project.href}
            className="inline-flex items-center text-sm font-semibold text-primary underline-offset-4 hover:text-primary/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
            aria-label={`Solicitar información del proyecto ${project.name}`}
          >
            Solicitar un proyecto similar
          </Link>
        </div>
      </div>
    </Card>
  )
}