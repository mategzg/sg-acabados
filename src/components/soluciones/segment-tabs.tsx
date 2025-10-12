"use client"

import { forwardRef, useImperativeHandle, useRef, useState } from "react"
import { usePathname, useRouter, useSearchParams } from "next/navigation"

import { KitCard } from "@/components/soluciones/kit-card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { track } from "@/lib/analytics"
import type { SolutionsSegment } from "@/types/solutions"

import { LocalizedLink as Link } from "@/components/localized-link"

export type SegmentTabsHandle = {
  scrollToActive: () => void
  getActiveSegment: () => string
}

type SegmentTabsProps = {
  segments: SolutionsSegment[]
  defaultSegmentId: string
}

export const SegmentTabs = forwardRef<SegmentTabsHandle, SegmentTabsProps>(
  ({ segments, defaultSegmentId }, ref) => {
    const router = useRouter()
    const pathname = usePathname()
    const searchParams = useSearchParams()
    const initialFromQuery = searchParams?.get("segment") ?? undefined
    const validInitial = segments.some((segment) => segment.id === initialFromQuery)
      ? (initialFromQuery as string)
      : defaultSegmentId

    const [activeSegment, setActiveSegment] = useState<string>(validInitial)
    const containerRef = useRef<HTMLDivElement | null>(null)

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
      track("select_segment", { segment: value })
    }

    useImperativeHandle(
      ref,
      () => ({
        scrollToActive: () => {
          containerRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })
        },
        getActiveSegment: () => activeSegment
      }),
      [activeSegment]
    )

    return (
      <div ref={containerRef} className="space-y-8 md:space-y-10 lg:space-y-12">
        <Tabs value={activeSegment} onValueChange={handleSegmentChange} className="space-y-8 md:space-y-10 lg:space-y-12">
          <div className="overflow-x-auto">
            <TabsList className="flex w-full min-w-max items-center gap-3 rounded-full bg-secondary/40 p-1">
              {segments.map((segment) => (
                <TabsTrigger key={segment.id} value={segment.id} className="rounded-full px-6 py-2">
                  {segment.label}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>

          {segments.map((segment) => (
            <TabsContent key={segment.id} value={segment.id} className="space-y-8 md:space-y-10 lg:space-y-12">
              <section className="space-y-4">
                <Badge variant="secondary" className="w-fit">
                  {segment.label}
                </Badge>
                <p className="text-base text-muted-foreground">{segment.intro}</p>
                <div className="rounded-3xl border border-border/60 bg-white/95 p-space-lg shadow-soft">
                  <h3 className="font-heading text-lg font-semibold text-foreground">Dolores clave</h3>
                  <ul className="mt-space-sm space-y-3 text-sm text-muted-foreground">
                    {segment.pains.map((pain) => (
                      <li key={`${segment.id}-${pain}`} className="flex items-start gap-3">
                        <span className="mt-1 h-2 w-2 rounded-full bg-primary" aria-hidden="true" />
                        <span>{pain}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </section>

              <section className="space-y-4">
                <h3 className="font-heading text-lg font-semibold text-foreground">Kits listos para ejecutar</h3>
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {segment.kits.map((kit) => (
                    <KitCard key={`${segment.id}-${kit.name}`} kit={kit} segmentId={segment.id} />
                  ))}
                </div>
              </section>

              <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div className="space-y-1">
                  <h4 className="font-heading text-lg font-semibold text-foreground">¿Necesitas una propuesta?</h4>
                  <p className="text-sm text-muted-foreground">
                    Agenda una llamada con el equipo SG o envía tu requerimiento para cotizar.
                  </p>
                </div>
                <div className="flex flex-col gap-3 md:flex-row">
                  <Button asChild className="w-full md:w-auto">
                    <Link href={`/cotizar?segment=${segment.id}`} aria-label={`Solicitar cotización para ${segment.label}`}>
                      Solicitar cotización
                    </Link>
                  </Button>
                  <Button asChild variant="outline" className="w-full md:w-auto">
                    <Link href={`/contacto?segment=${segment.id}`} aria-label={`Hablar con especialistas para ${segment.label}`}>
                      Hablar con especialistas
                    </Link>
                  </Button>
                </div>
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    )
  }
)

SegmentTabs.displayName = "SegmentTabs"
