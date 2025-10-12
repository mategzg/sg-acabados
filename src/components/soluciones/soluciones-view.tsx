"use client"

import { useRef, useState } from "react"

import { SegmentTabs, type SegmentTabsHandle } from "@/components/soluciones/segment-tabs"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Section } from "@/components/section"
import { track } from "@/lib/analytics"
import type { SolutionsHero, SolutionsSegment } from "@/types/solutions"

export type SolucionesViewProps = {
  hero: SolutionsHero
  segments: SolutionsSegment[]
  defaultSegmentId: string
}

export function SolucionesView({ hero, segments, defaultSegmentId }: SolucionesViewProps) {
  const segmentTabsRef = useRef<SegmentTabsHandle>(null)
  const [activeSegment, setActiveSegment] = useState(defaultSegmentId)

  const handleHeroCta = () => {
    track("click_solution_hero_cta", { segment: activeSegment })
    segmentTabsRef.current?.scrollToActive()
  }

  return (
    <div className="space-y-space-2xl">
      <Section className="bg-white">
        <div className="container grid gap-space-xl lg:grid-cols-[1.1fr,0.9fr] lg:items-center">
          <div className="space-y-space-md">
            <Badge variant="accent" className="w-fit">
              Soluciones
            </Badge>
            <h1 className="text-balance font-heading text-4xl font-semibold text-foreground md:text-5xl">
              {hero.title}
            </h1>
            <p className="max-w-2xl text-balance text-muted-foreground">{hero.subtitle}</p>
            <Button size="lg" className="w-full sm:w-auto" onClick={handleHeroCta} aria-controls="segment-tabs">
              {hero.cta}
            </Button>
          </div>
          <Card className="space-y-space-sm rounded-3xl border border-border/70 bg-secondary/20 p-space-lg shadow-soft">
            <h2 className="font-heading text-xl font-semibold text-foreground">Qué incluye el servicio</h2>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>- Kickoff técnico y cronograma por especialidad</li>
              <li>- Coordinación de acabados, mobiliario y sistemas</li>
              <li>- Entrega llave en mano con garantías y postventa</li>
            </ul>
          </Card>
        </div>
      </Section>

      <Section className="bg-white" id="segment-tabs">
        <div className="container">
          <SegmentTabs
            ref={segmentTabsRef}
            segments={segments}
            defaultSegmentId={defaultSegmentId}
            onSegmentChange={setActiveSegment}
          />
        </div>
      </Section>
    </div>
  )
}
