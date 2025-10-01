import Image from 'next/image'
import { LocalizedLink as Link } from '@/components/localized-link'

import type { ProjectDocument } from '@/types/content'
import { Card } from '@/components/ui/card'
import { DEFAULT_BLUR_DATA_URL } from '@/lib/images'

export function ProjectCard({ project }: { project: ProjectDocument }) {
  const cover = project.galeria[0]

  return (
    <Card className="overflow-hidden transition-transform hover:scale-[1.02]">
      <div className="relative h-64">
        {cover ? (
          <Image
            src={cover.src}
            alt={cover.alt}
            fill
            className="object-cover"
            sizes="(min-width:768px) 33vw, 100vw"
            placeholder="blur"
            blurDataURL={DEFAULT_BLUR_DATA_URL}
          />
        ) : null}
      </div>
      <div className="space-y-3 p-6">
        <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">{project.sector}</p>
        <h3 className="font-heading text-2xl font-semibold text-foreground">{project.nombre}</h3>
        <p className="text-sm text-muted-foreground">{project.resumen}</p>
        <Link
          href={`/proyectos/${project.slug}`}
          className="text-sm font-medium text-primary underline-offset-4 hover:text-primary/80"
        >
          Ver detalle del proyecto
        </Link>
      </div>
    </Card>
  )
}
