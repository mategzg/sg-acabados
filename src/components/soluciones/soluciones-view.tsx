"use client"

import { useRef, useState } from "react"

import { SegmentTabs, type SegmentTabsHandle, type SegmentWithProjects } from "@/components/soluciones/segment-tabs"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Section } from "@/components/section"
import { track } from "@/lib/analytics"
import type { SolutionsHero } from "@/types/solutions"

import { siteConfig } from "@/config/site"

const WHATSAPP_BASE = siteConfig.whatsapp.link

export type SolucionesViewProps = {
  hero: SolutionsHero
  segments: SegmentWithProjects[]
  benefitsBar: string[]
  defaultSegmentId: string
}

export function SolucionesView({ hero, segments, benefitsBar, defaultSegmentId }: SolucionesViewProps) {
  const segmentTabsRef = useRef<SegmentTabsHandle>(null)
  const [activeSegment, setActiveSegment] = useState(defaultSegmentId)

  const handleHeroCta = () => {
    track("click_solution_hero_cta", { segment: activeSegment })
    segmentTabsRef.current?.scrollToActiveForm()
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
            <div className="flex flex-col gap-space-sm sm:flex-row sm:items-center">
              <Button
                size="lg"
                className="w-full sm:w-auto"
                onClick={handleHeroCta}
                aria-controls={`form-${activeSegment}`}
              >
                {hero.cta}
              </Button>
              <Button asChild size="lg" variant="outline" className="w-full sm:w-auto">
                <a
                  href={createWhatsappLink(activeSegment)}
                  onClick={() => track("click_whatsapp", { segment: activeSegment })}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Abrir WhatsApp para soluciones"
                >
                  WhatsApp inmediato
                </a>
              </Button>
            </div>
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

      <Section className="bg-white">
        <div className="container space-y-space-2xl">
          <SegmentTabs
            ref={segmentTabsRef}
            segments={segments}
            defaultSegmentId={defaultSegmentId}
            onSegmentChange={setActiveSegment}
          />
        </div>
      </Section>

      <section className="bg-primary/5 py-space-xl">
        <div className="container">
          <div className="flex flex-wrap justify-center gap-space-sm">
            {benefitsBar.map((benefit) => (
              <Card
                key={benefit}
                className="rounded-full border border-border/60 bg-white/90 px-space-lg py-space-sm text-sm font-semibold text-foreground shadow-soft"
              >
                {benefit}
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

function createWhatsappLink(segmentId: string) {
  const text = `Quiero cotizar (${segmentId}) desde /soluciones`
  return `${WHATSAPP_BASE}?text=${encodeURIComponent(text)}`
}


