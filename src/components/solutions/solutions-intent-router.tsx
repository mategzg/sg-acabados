"use client"

import Image from 'next/image'
import { useEffect, useMemo, useRef, useState, type FormEvent } from 'react'
import { CheckCircle2, ArrowRight } from 'lucide-react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'

import { LocalizedLink as Link } from '@/components/localized-link'
import { Section } from '@/components/section'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { useToast } from '@/components/ui/use-toast'
import { DEFAULT_BLUR_DATA_URL } from '@/lib/images'
import { sendEvent } from '@/lib/gtag'
import { trackLead } from '@/lib/ga'
import { cn } from '@/lib/utils'
import type { SolutionsHero, SolutionsProjectCard, SolutionsSegment } from '@/types/solutions'

const DEFAULT_FORM_PAYLOAD_TYPE = 'soluciones'

const FIELD_DEFINITIONS: Record<string, FieldDefinition> = {
  empresa: {
    label: 'Empresa',
    placeholder: 'Nombre de la empresa',
    autoComplete: 'organization'
  },
  nombre: {
    label: 'Nombre',
    placeholder: 'Nombre y apellidos',
    autoComplete: 'name'
  },
  email: {
    label: 'Correo',
    type: 'email',
    placeholder: 'nombre@empresa.pe',
    autoComplete: 'email'
  },
  telefono: {
    label: 'Teléfono',
    type: 'tel',
    placeholder: '+51 999 999 999',
    autoComplete: 'tel'
  },
  ciudad: {
    label: 'Ciudad',
    placeholder: 'Lima, Arequipa, etc.',
    autoComplete: 'address-level2'
  },
  area_m2: {
    label: 'Metraje aproximado (m²)',
    type: 'number',
    placeholder: 'Ej. 1 200',
    optional: true,
    min: 0,
    step: 1
  },
  uso_sector: {
    label: 'Uso o área del proyecto',
    placeholder: 'Oficinas administrativas, call center, etc.'
  },
  plazo_objetivo: {
    label: 'Plazo objetivo',
    placeholder: 'Ej. Entrega en 8 semanas'
  },
  presupuesto_pen_m2: {
    label: 'Presupuesto (S/ por m²)',
    type: 'number',
    placeholder: 'Ej. 250',
    optional: true,
    min: 0,
    step: 1
  },
  unidades: {
    label: 'Número de unidades',
    type: 'number',
    placeholder: 'Departamentos, oficinas, etc.',
    min: 0,
    step: 1
  },
  areas_comunes_m2: {
    label: 'Áreas comunes (m²)',
    type: 'number',
    placeholder: 'Metros aproximados',
    optional: true,
    min: 0,
    step: 1
  },
  plazo_obra: {
    label: 'Plazo de obra',
    placeholder: 'Ej. Inicio julio, entrega diciembre'
  },
  tipo_vivienda: {
    label: 'Tipo de vivienda',
    placeholder: 'Casa, departamento, dúplex, etc.'
  },
  ambientes: {
    label: 'Ambientes a intervenir',
    placeholder: 'Sala, dormitorios, cocina',
    optional: true
  },
  presupuesto_pen_total: {
    label: 'Presupuesto total (S/)',
    type: 'number',
    placeholder: 'Ej. 18 000',
    optional: true,
    min: 0,
    step: 100
  },
  fileUrl: {
    label: 'Link a planos o referencias',
    type: 'url',
    placeholder: 'https://drive.google.com/...',
    optional: true
  },
  comentarios: {
    label: 'Comentarios adicionales',
    type: 'textarea',
    placeholder: 'Notas, restricciones de horario o alcances específicos',
    optional: true
  }
}

const FINAL_CTA_LINKS = [
  { href: '/contacto', label: 'Hablar con un especialista' },
  { href: '/proyectos', label: 'Ver más proyectos' }
]

type SegmentWithProjects = SolutionsSegment & { projects: SolutionsProjectCard[] }

type SolutionsIntentRouterProps = {
  hero: SolutionsHero
  segments: SegmentWithProjects[]
  defaultSegmentId?: string
}

type FieldDefinition = {
  label: string
  placeholder?: string
  type?: 'text' | 'email' | 'tel' | 'number' | 'url' | 'textarea'
  autoComplete?: string
  optional?: boolean
  min?: number
  step?: number
}

function normalizeFieldLabel(field: string) {
  return field
    .replace(/_/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .replace(/\b\w/g, (char) => char.toUpperCase())
}

function getFieldDefinition(field: string): FieldDefinition {
  return FIELD_DEFINITIONS[field] ?? { label: normalizeFieldLabel(field) }
}

export function SolutionsIntentRouter({ hero, segments, defaultSegmentId }: SolutionsIntentRouterProps) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const firstSegmentId = segments[0]?.id ?? ''
  const [activeSegmentId, setActiveSegmentId] = useState(
    defaultSegmentId && segments.some((segment) => segment.id === defaultSegmentId)
      ? defaultSegmentId
      : firstSegmentId
  )
  const [selectedKit, setSelectedKit] = useState<string | null>(null)
  const formContainerRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (!defaultSegmentId) {
      return
    }

    if (segments.some((segment) => segment.id === defaultSegmentId)) {
      setActiveSegmentId(defaultSegmentId)
    }
  }, [defaultSegmentId, segments])

  useEffect(() => {
    if (!segments.some((segment) => segment.id === activeSegmentId) && firstSegmentId) {
      setActiveSegmentId(firstSegmentId)
    }
  }, [activeSegmentId, firstSegmentId, segments])

  const activeSegment = useMemo(() => {
    return segments.find((segment) => segment.id === activeSegmentId) ?? segments[0]
  }, [segments, activeSegmentId])

  useEffect(() => {
    setSelectedKit(null)
  }, [activeSegmentId])

  if (!activeSegment) {
    return null
  }

  const updateSegmentInUrl = (segmentId: string) => {
    const params = new URLSearchParams(searchParams?.toString())
    if (!segmentId || segmentId === firstSegmentId) {
      params.delete('segment')
    } else {
      params.set('segment', segmentId)
    }
    const query = params.toString()
    router.replace(query ? `${pathname}?${query}` : pathname, { scroll: false })
  }

  const handleSegmentChange = (segmentId: string) => {
    if (segmentId === activeSegmentId) {
      return
    }
    setActiveSegmentId(segmentId)
    updateSegmentInUrl(segmentId)
    sendEvent('select_solution_segment', { segment: segmentId })
  }

  const handleKitSelect = (kitName: string) => {
    setSelectedKit(kitName)
    sendEvent('select_solution_kit', { segment: activeSegment.id, kit_name: kitName })
    formContainerRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  const handleHeroCta = () => {
    sendEvent('click_solution_hero_cta', { segment: activeSegment.id })
    formContainerRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <div className="space-y-space-2xl">
      <Section className="bg-white">
        <div className="container space-y-space-xl">
          <div className="grid gap-space-xl lg:grid-cols-[1.1fr,0.9fr] lg:items-center">
            <div className="space-y-space-md">
              <Badge variant="accent" className="w-fit">Soluciones</Badge>
              <h1 className="text-balance font-heading text-4xl font-semibold text-foreground md:text-5xl">
                {hero.title}
              </h1>
              <p className="max-w-2xl text-balance text-muted-foreground">{hero.subtitle}</p>
              <div className="flex flex-col gap-space-sm sm:flex-row sm:items-center">
                <Button onClick={handleHeroCta} size="lg" className="w-full sm:w-auto">
                  {hero.cta}
                </Button>
                <Button asChild variant="outline" size="lg" className="w-full sm:w-auto">
                  <Link href="/productos">Ver soluciones por familia</Link>
                </Button>
              </div>
            </div>
            <Card className="space-y-space-sm rounded-3xl border border-border/70 bg-secondary/20 p-space-lg shadow-soft">
              <h2 className="font-heading text-xl font-semibold text-foreground">Cómo trabajamos</h2>
              <ul className="space-y-3 text-sm text-muted-foreground">
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 text-primary" aria-hidden="true" />
                  <span>Kickoff técnico para definir alcance, cronograma y responsables por especialidad.</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 text-primary" aria-hidden="true" />
                  <span>Coordinación de acabados, mobiliario y sistemas con un solo frente de trabajo.</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 text-primary" aria-hidden="true" />
                  <span>Entrega llave en mano con documentación, garantías y plan de postventa.</span>
                </li>
              </ul>
            </Card>
          </div>
          <div className="flex flex-wrap gap-2">
            {segments.map((segment) => {
              const active = segment.id === activeSegment.id
              return (
                <Button
                  key={segment.id}
                  type="button"
                  variant={active ? 'default' : 'outline'}
                  size="sm"
                  className={cn('rounded-full px-5', active ? 'shadow-sm' : 'bg-white/70')}
                  aria-pressed={active}
                  onClick={() => handleSegmentChange(segment.id)}
                >
                  {segment.label}
                </Button>
              )
            })}
          </div>
        </div>
      </Section>

      <Section className="bg-white">
        <div className="container space-y-space-2xl">
          <div className="grid gap-space-xl lg:grid-cols-[1fr,0.9fr] lg:items-start">
            <div className="space-y-space-md">
              <Badge variant="secondary" className="w-fit">{activeSegment.label}</Badge>
              <h2 className="text-balance font-heading text-3xl font-semibold text-foreground md:text-4xl">
                {activeSegment.intro}
              </h2>
              <div className="space-y-space-sm">
                <h3 className="font-heading text-lg font-semibold text-foreground">Dolores clave</h3>
                <ul className="space-y-3 text-sm text-muted-foreground">
                  {activeSegment.pains.map((pain) => (
                    <li key={pain} className="flex items-start gap-3">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 text-primary" aria-hidden="true" />
                      <span>{pain}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <Card className="space-y-space-sm rounded-3xl border border-border/70 bg-secondary/10 p-space-lg shadow-soft">
              <h3 className="font-heading text-lg font-semibold text-foreground">Kits listos para ejecutar</h3>
              <p className="text-sm text-muted-foreground">
                Selecciona un kit para prellenar la solicitud y coordinar la visita técnica.
              </p>
              <div className="grid gap-space-sm">
                {activeSegment.kits.map((kit) => (
                  <div key={kit.name} className="rounded-2xl border border-border/60 bg-white/95 p-space-md">
                    <div className="flex items-center justify-between">
                      <h4 className="text-base font-semibold text-foreground">{kit.name}</h4>
                      <Button
                        type="button"
                        variant="secondary"
                        size="sm"
                        onClick={() => handleKitSelect(kit.name)}
                        aria-label={`Solicitar kit ${kit.name}`}
                      >
                        Seleccionar
                      </Button>
                    </div>
                    <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                      {kit.items.map((item) => (
                        <li key={`${kit.name}-${item}`} className="flex items-start gap-2">
                          <span className="mt-1 h-1.5 w-1.5 rounded-full bg-primary" aria-hidden="true" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          <div className="space-y-space-lg">
            <div className="flex flex-col gap-space-sm md:flex-row md:items-end md:justify-between">
              <div className="space-y-space-xs">
                <h3 className="font-heading text-lg font-semibold text-foreground">Evidencia reciente</h3>
                <p className="text-sm text-muted-foreground">
                  Proyectos entregados con especialidades coordinadas por SG.
                </p>
              </div>
              <Button asChild variant="ghost" size="sm" className="self-start md:self-end">
                <Link href="/proyectos" aria-label="Ver todos los proyectos">
                  Ver todos <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
            <div className="grid gap-space-lg md:grid-cols-2 xl:grid-cols-3">
              {activeSegment.projects.map((project, index) => (
                <Card
                  key={`${activeSegment.id}-${project.slug}-${index}`}
                  className="flex h-full flex-col overflow-hidden rounded-3xl border border-border/70 bg-white/95 shadow-soft"
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
                  <div className="flex flex-1 flex-col gap-space-sm p-space-lg">
                    <span className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
                      {project.sector ?? 'Proyecto SG'}
                    </span>
                    <h4 className="font-heading text-xl font-semibold text-foreground">{project.name}</h4>
                    <p className="text-sm text-muted-foreground">{project.summary}</p>
                    <div className="mt-auto pt-space-sm">
                      <Link
                        href={project.href}
                        className="text-sm font-semibold text-primary underline-offset-4 hover:text-primary/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-white"
                        aria-label={`Ver detalle del proyecto ${project.name}`}
                      >
                        Ver proyecto
                      </Link>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          <div className="grid gap-space-xl lg:grid-cols-[1.05fr,0.95fr]">
            <div ref={formContainerRef} className="space-y-space-md">
              <SegmentForm segment={activeSegment} selectedKit={selectedKit} onClearKit={() => setSelectedKit(null)} />
            </div>
            <Card className="space-y-space-md rounded-3xl border border-border/70 bg-secondary/15 p-space-lg shadow-soft">
              <h3 className="font-heading text-lg font-semibold text-foreground">Preguntas frecuentes</h3>
              <div className="space-y-space-sm">
                {activeSegment.faqs.map((faq) => (
                  <div key={faq.q} className="space-y-1">
                    <p className="font-semibold text-foreground">{faq.q}</p>
                    <p className="text-sm text-muted-foreground">{faq.a}</p>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          <Card className="flex flex-col gap-space-sm rounded-3xl border border-border/60 bg-primary/5 p-space-lg shadow-soft md:flex-row md:items-center md:justify-between">
            <div>
              <h3 className="font-heading text-lg font-semibold text-foreground">¿Listo para coordinar tu obra?</h3>
              <p className="text-sm text-muted-foreground">Conecta con nuestro equipo técnico o revisa más casos reales.</p>
            </div>
            <div className="flex flex-col gap-space-sm md:flex-row">
              {FINAL_CTA_LINKS.map((item) => (
                <Button key={item.href} asChild variant="outline" className="w-full md:w-auto">
                  <Link href={item.href}>{item.label}</Link>
                </Button>
              ))}
            </div>
          </Card>
        </div>
      </Section>
    </div>
  )
}

type SegmentFormProps = {
  segment: SegmentWithProjects
  selectedKit: string | null
  onClearKit: () => void
}

function SegmentForm({ segment, selectedKit, onClearKit }: SegmentFormProps) {
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const form = event.currentTarget
    const formData = new FormData(form)

    const consent = formData.get('consent') === 'true'
    if (!consent) {
      toast({
        title: 'Debes aceptar el uso de datos',
        description: 'Autoriza el uso de tus datos para que podamos contactarte.'
      })
      return
    }

    const payload: Record<string, unknown> = {
      type: DEFAULT_FORM_PAYLOAD_TYPE,
      origin: 'solutions-intent-router',
      segment: segment.id,
      kit_name: selectedKit ?? undefined,
      consent
    }

    segment.form.fields.forEach((field) => {
      const value = (formData.get(field) ?? '').toString().trim()
      if (value) {
        payload[field] = value
      }
    })

    setIsSubmitting(true)

    try {
      const response = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      })

      const result = (await response.json().catch(() => null)) as { ok?: boolean; error?: string } | null
      if (!response.ok || !result?.ok) {
        throw new Error(result?.error ?? 'No pudimos registrar tu solicitud. Intenta en unos minutos.')
      }

      toast({
        title: 'Solicitud enviada',
        description: 'Te contactaremos en menos de 24 horas hábiles.'
      })
      trackLead({ origin: 'solutions-intent-router', segment: segment.id, kit_name: selectedKit ?? undefined })
      sendEvent('submit_solution_form', { segment: segment.id, kit_name: selectedKit ?? 'general' })
      form.reset()
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Intenta nuevamente más tarde.'
      toast({ title: 'No pudimos enviar tu solicitud', description: message })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Card className="space-y-space-md rounded-3xl border border-border/70 bg-white/95 p-space-lg shadow-soft">
      <div className="space-y-1">
        <h3 className="font-heading text-lg font-semibold text-foreground">Solicita una propuesta</h3>
        <p className="text-sm text-muted-foreground">
          Completa el formulario y te enviaremos alcance técnico, cronograma y presupuesto estimado.
        </p>
      </div>
      {selectedKit ? (
        <div className="flex items-center justify-between rounded-2xl bg-secondary/40 p-space-sm text-sm text-foreground">
          <span>
            Kit seleccionado: <strong>{selectedKit}</strong>
          </span>
          <button
            type="button"
            className="text-primary underline-offset-4 hover:underline"
            onClick={onClearKit}
          >
            Cambiar
          </button>
        </div>
      ) : null}
      <form className="space-y-space-md" onSubmit={handleSubmit} noValidate>
        <div className="grid gap-space-md md:grid-cols-2">
          {segment.form.fields.map((field) => {
            const definition = getFieldDefinition(field)
            const required = !definition.optional
            const fieldWrapperClass = cn(
              'space-y-space-xs',
              definition.type === 'textarea' ? 'md:col-span-2' : undefined
            )
            const inputClassName =
              'h-11 rounded-2xl border border-border bg-white px-4 text-sm text-foreground placeholder:text-muted-foreground'
            const textareaClassName =
              'min-h-[140px] rounded-2xl border border-border bg-white px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground'

            return (
              <div key={field} className={fieldWrapperClass}>
                <Label className="text-sm text-foreground">
                  {definition.label}
                  {definition.optional ? <span className="ml-1 text-xs text-muted-foreground">(opcional)</span> : null}
                </Label>
                {definition.type === 'textarea' ? (
                  <Textarea
                    name={field}
                    required={required}
                    placeholder={definition.placeholder}
                    autoComplete={definition.autoComplete}
                    className={textareaClassName}
                    rows={4}
                  />
                ) : (
                  <Input
                    name={field}
                    required={required}
                    placeholder={definition.placeholder}
                    autoComplete={definition.autoComplete}
                    className={inputClassName}
                    type={definition.type ?? 'text'}
                    min={definition.type === 'number' ? definition.min ?? 0 : undefined}
                    step={definition.type === 'number' ? definition.step ?? 1 : undefined}
                    inputMode={definition.type === 'number' ? 'decimal' : undefined}
                  />
                )}
              </div>
            )
          })}
        </div>
        <label className="flex items-start gap-3 text-sm text-muted-foreground">
          <input
            type="checkbox"
            name="consent"
            value="true"
            required
            className="mt-1 h-4 w-4 rounded border border-border"
          />
          <span>Acepto el uso de mis datos personales para contacto comercial y seguimiento.</span>
        </label>
        <Button type="submit" className="w-full md:w-auto" disabled={isSubmitting}>
          {isSubmitting ? 'Enviando...' : segment.form.cta}
        </Button>
      </form>
    </Card>
  )
}

