"use client"

import { forwardRef, useEffect, useImperativeHandle, useMemo, useRef, useState } from "react"
import { ArrowRight, CheckCircle2 } from "lucide-react"
import { usePathname, useRouter, useSearchParams } from "next/navigation"

import { KitCard } from "@/components/soluciones/kit-card"
import { EvidenceCarousel } from "@/components/soluciones/evidence-carousel"
import { SegmentForm } from "@/components/soluciones/segment-form"
import { LocalizedLink as Link } from "@/components/localized-link"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { sendEvent } from "@/lib/gtag"
import type { SolutionsSegment } from "@/types/solutions"

export type SegmentWithProjects = SolutionsSegment & {
  projects: SolutionsProject[]
  formId: string
  whatsappHref: string
}

export type SolutionsProject = {
  slug: string
  name: string
  summary: string
  href: string
  sector?: string
  image: {
    src: string
    alt: string
  }
}

export type SegmentTabsHandle = {
  scrollToActiveForm: () => void
  getActiveSegment: () => string
}

type SegmentTabsProps = {
  segments: SegmentWithProjects[]
  defaultSegmentId: string
  onSegmentChange?: (segmentId: string) => void
}

export const SegmentTabs = forwardRef<SegmentTabsHandle, SegmentTabsProps>(
  ({ segments, defaultSegmentId, onSegmentChange }, ref) => {
    const router = useRouter()
    const pathname = usePathname()
    const searchParams = useSearchParams()
    const initialFromQuery = searchParams?.get("segment") ?? undefined
    const validInitial = segments.some((segment) => segment.id === initialFromQuery)
      ? (initialFromQuery as string)
      : defaultSegmentId

    const [activeSegment, setActiveSegment] = useState<string>(validInitial)
    const [selectedKitBySegment, setSelectedKitBySegment] = useState<Record<string, string | null>>({})
    const formRefs = useRef<Record<string, HTMLDivElement | null>>({})

    useEffect(() => {
      if (!segments.some((segment) => segment.id === activeSegment)) {
        setActiveSegment(defaultSegmentId)
      }
    }, [activeSegment, defaultSegmentId, segments])

    const updateQueryParam = (segmentId: string) => {
      const params = new URLSearchParams(searchParams?.toString())
      if (segmentId === defaultSegmentId) {
        params.delete("segment")
      } else {
        params.set("segment", segmentId)
      }
      const queryString = params.toString()
      router.replace(queryString ? `${pathname}?${queryString}` : pathname, { scroll: false })
    }

    const handleSegmentChange = (value: string) => {
      setActiveSegment(value)
      updateQueryParam(value)
      onSegmentChange?.(value)
      sendEvent("select_solution_segment", { segment: value })
    }

    const handleKitSelect = (segmentId: string, kitName: string) => {
      setSelectedKitBySegment((prev) => ({ ...prev, [segmentId]: kitName }))
      scrollToForm(segmentId)
    }

    const registerContainerRef = (segmentId: string) => (element: HTMLDivElement | null) => {
      formRefs.current[segmentId] = element
    }

    const scrollToForm = (segmentId: string) => {
      const node = formRefs.current[segmentId]
      if (node) {
        node.scrollIntoView({ behavior: "smooth", block: "start" })
      }
    }

    useImperativeHandle(
      ref,
      () => ({
        scrollToActiveForm: () => scrollToForm(activeSegment),
        getActiveSegment: () => activeSegment
      }),
      [activeSegment]
    )

    const activeSegmentData = useMemo(
      () => segments.find((segment) => segment.id === activeSegment) ?? segments[0],
      [segments, activeSegment]
    )

    useEffect(() => {
      if (!activeSegmentData) {
        return
      }
      onSegmentChange?.(activeSegmentData.id)
    }, [activeSegmentData, onSegmentChange])

    return (
      <Tabs value={activeSegment} onValueChange={handleSegmentChange} className="space-y-space-xl">
        <div className="overflow-x-auto">
          <TabsList className="flex w-full min-w-max items-center gap-2 rounded-full bg-secondary/40 p-1">
            {segments.map((segment) => (
              <TabsTrigger
                key={segment.id}
                value={segment.id}
                className="rounded-full px-5 py-2"
                aria-controls={`panel-${segment.id}`}
              >
                {segment.label}
              </TabsTrigger>
            ))}
          </TabsList>
        </div>

        {segments.map((segment) => {
          const selectedKit = selectedKitBySegment[segment.id] ?? null
          return (
            <TabsContent
              key={segment.id}
              value={segment.id}
              id={`panel-${segment.id}`}
              className="space-y-space-2xl"
            >
              <section className="space-y-space-lg">
                <div className="space-y-space-sm">
                  <Badge variant="secondary" className="w-fit">
                    {segment.label}
                  </Badge>
                  <h2 className="text-balance font-heading text-3xl font-semibold text-foreground md:text-4xl">
                    {segment.intro}
                  </h2>
                </div>
                <div className="rounded-3xl border border-border/60 bg-white/95 p-space-lg shadow-soft">
                  <h3 className="font-heading text-lg font-semibold text-foreground">Dolores clave</h3>
                  <ul className="mt-space-sm grid gap-space-sm md:grid-cols-2">
                    {segment.pains.map((pain) => (
                      <li key={`${segment.id}-${pain}`} className="flex items-start gap-3 text-sm text-muted-foreground">
                        <CheckCircle2 className="mt-0.5 h-4 w-4 text-primary" aria-hidden="true" />
                        <span>{pain}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </section>

              <section className="space-y-space-md">
                <div className="flex flex-col gap-space-xs md:flex-row md:items-end md:justify-between">
                  <div>
                    <h3 className="font-heading text-lg font-semibold text-foreground">Kits listos para ejecutar</h3>
                    <p className="text-sm text-muted-foreground">
                      Selecciona un kit para prellenar la solicitud y coordinar la visita técnica.
                    </p>
                  </div>
                </div>
                <div className="grid gap-space-md md:grid-cols-2 xl:grid-cols-3">
                  {segment.kits.map((kit) => (
                    <KitCard
                      key={`${segment.id}-${kit.name}`}
                      segmentId={segment.id}
                      kit={kit}
                      onSelect={(kitName) => handleKitSelect(segment.id, kitName)}
                    />
                  ))}
                </div>
              </section>

              <EvidenceCarousel projects={segment.projects} viewAllHref="/proyectos" />

              <section className="space-y-space-sm">
                <h3 className="font-heading text-lg font-semibold text-foreground">Preguntas frecuentes</h3>
                <div className="grid gap-space-sm md:grid-cols-2">
                  {segment.faqs.map((faq) => (
                    <Card key={`${segment.id}-${faq.q}`} className="rounded-3xl border border-border/70 bg-white/95 p-space-lg shadow-soft">
                      <p className="font-semibold text-foreground">{faq.q}</p>
                      <p className="mt-2 text-sm text-muted-foreground">{faq.a}</p>
                    </Card>
                  ))}
                </div>
              </section>

              <Card className="flex flex-col gap-space-sm rounded-3xl border border-border/60 bg-primary/5 p-space-lg shadow-soft md:flex-row md:items-center md:justify-between">
                <div>
                  <h3 className="font-heading text-lg font-semibold text-foreground">
                    ¿Listo para coordinar tu proyecto?
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Envía la solicitud o agenda una llamada por WhatsApp con nuestro equipo.
                  </p>
                </div>
                <div className="flex flex-col gap-space-sm md:flex-row">
                  <Button
                    type="submit"
                    form={segment.formId}
                    className="w-full md:w-auto"
                    onClick={() => scrollToForm(segment.id)}
                    aria-controls={`form-${segment.id}`}
                  >
                    Enviar propuesta
                  </Button>
                  <Button asChild variant="outline" className="w-full md:w-auto">
                    <Link
                      href={segment.whatsappHref}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={`Abrir WhatsApp para segmento ${segment.label}`}
                    >
                      WhatsApp <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
                    </Link>
                  </Button>
                </div>
              </Card>

              <SegmentForm
                segmentId={segment.id}
                formId={segment.formId}
                fields={segment.form.fields}
                cta={segment.form.cta}
                selectedKit={selectedKit}
                onClearKit={() => setSelectedKitBySegment((prev) => ({ ...prev, [segment.id]: null }))}
                registerContainerRef={registerContainerRef(segment.id)}
              />
            </TabsContent>
          )
        })}
      </Tabs>
    )
  }
)

SegmentTabs.displayName = "SegmentTabs"



