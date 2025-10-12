"use client"

import { useRef } from "react"

import { SegmentTabs, type SegmentTabsHandle } from "@/components/soluciones/segment-tabs"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Section } from "@/components/section"
import type { SolutionsHero, SolutionsSegment } from "@/types/solutions"

const containerClasses = "mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"

export type SolucionesViewProps = {
  hero: SolutionsHero
  segments: SolutionsSegment[]
  defaultSegmentId: string
}

export function SolucionesView({ hero, segments, defaultSegmentId }: SolucionesViewProps) {
  const segmentTabsRef = useRef<SegmentTabsHandle>(null)

  const handleHeroCta = () => {
    segmentTabsRef.current?.scrollToActive()
  }

  return (
    <div className="space-y-8 md:space-y-10 lg:space-y-12">
      <Section className="bg-white py-10 md:py-12">
        <div className={`${containerClasses} grid gap-8 md:gap-10 lg:gap-12 lg:grid-cols-[1.1fr,0.9fr] lg:items-center`}>
          <div className="space-y-4 md:space-y-6">
            <Badge variant="accent" className="w-fit">
              Soluciones
            </Badge>
            <h1 className="text-balance font-heading text-4xl font-semibold text-foreground md:text-5xl">
              {hero.title}
            </h1>
            <p className="max-w-2xl text-balance text-muted-foreground">{hero.subtitle}</p>
            <Button size="lg" className="w-full sm:w-auto" onClick={handleHeroCta} aria-controls="soluciones-tabs">
              {hero.cta}
            </Button>
          </div>
          <Card className="space-y-2 rounded-3xl border border-border/70 bg-secondary/20 p-space-lg shadow-soft">
            <h2 className="font-heading text-xl font-semibold text-foreground">Qué incluye el servicio</h2>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>- Kickoff técnico y cronograma por especialidad</li>
              <li>- Coordinación de acabados, mobiliario y sistemas</li>
              <li>- Entrega llave en mano con garantías y postventa</li>
            </ul>
          </Card>
        </div>
      </Section>

      <Section className="bg-white" id="soluciones-tabs">
        <div className={`${containerClasses} space-y-8 md:space-y-10 lg:space-y-12`}>
          <SegmentTabs ref={segmentTabsRef} segments={segments} defaultSegmentId={defaultSegmentId} />
        </div>
      </Section>
    </div>
  )
}
