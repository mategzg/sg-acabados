"use client"

import Image from "next/image"

import { LocalizedLink as Link } from "@/components/localized-link"
import { Card } from "@/components/ui/card"
import { DEFAULT_BLUR_DATA_URL } from "@/lib/images"
import type { SolutionsProjectCard } from "@/types/solutions"

type EvidenceCarouselProps = {
  projects: SolutionsProjectCard[]
  viewAllHref: string
}

export function EvidenceCarousel({ projects, viewAllHref }: EvidenceCarouselProps) {
  if (!projects.length) {
    return null
  }

  return (
    <div className="space-y-space-md">
      <div className="flex items-center justify-between gap-space-sm">
        <h3 className="font-heading text-lg font-semibold text-foreground">Evidencia reciente</h3>
        <Link
          href={viewAllHref}
          className="text-sm font-semibold text-primary underline-offset-4 hover:text-primary/80"
          aria-label="Ver todos los proyectos"
        >
          Ver proyectos
        </Link>
      </div>
      <div className="flex gap-space-md overflow-x-auto pb-2" style={{ scrollSnapType: "x mandatory" }}>
        {projects.map((project) => (
          <Card
            key={`${project.slug}-${project.name}`}
            className="flex min-w-[280px] shrink-0 snap-start flex-col overflow-hidden rounded-3xl border border-border/70 bg-white/95 shadow-soft"
          >
            <div className="relative aspect-[4/3]">
              <Image
                src={project.image.src}
                alt={project.image.alt}
                fill
                className="object-cover"
                sizes="(min-width: 1280px) 360px, (min-width:768px) 45vw, 90vw"
                placeholder="blur"
                blurDataURL={DEFAULT_BLUR_DATA_URL}
              />
            </div>
            <div className="flex flex-1 flex-col gap-space-xs p-space-md">
              <span className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
                {project.sector ?? "Proyecto SG"}
              </span>
              <h4 className="font-heading text-base font-semibold text-foreground">{project.name}</h4>
              <p className="text-sm text-muted-foreground">{project.summary}</p>
              <Link
                href={project.href}
                className="mt-auto text-sm font-semibold text-primary underline-offset-4 hover:text-primary/80"
                aria-label={`Ver proyecto ${project.name}`}
              >
                Ver detalle
              </Link>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
