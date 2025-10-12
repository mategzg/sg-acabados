"use client"

import { useMemo, useState } from 'react'
import { useForm, type Resolver, type SubmitHandler } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { useToast } from '@/components/ui/use-toast'
import { trackLead } from '@/lib/ga'

const quoteSchema = z.object({
  type: z.literal('cotizacion').default('cotizacion'),
  name: z.string().min(2, 'Ingresa tu nombre completo'),
  email: z.string().email('Correo invalido'),
  phone: z
    .string()
    .min(6, 'Ingresa un telefono valido')
    .max(20, 'El telefono es demasiado largo'),
  company: z.string().optional(),
  city: z.string().min(2, 'Indica la ciudad del proyecto'),
  sector: z.string().min(2, 'Selecciona el sector'),
  familia: z.string().optional(),
  subfamilia: z.string().optional(),
  area: z.coerce.number().min(1, 'Metraje minimo 1 m'),
  uso: z.string().optional(),
  transito: z.string().optional(),
  presupuesto: z.string().min(1, 'Selecciona un rango de inversion'),
  plazo: z.string().min(1, 'Selecciona un plazo estimado'),
  message: z.string().optional(),
  consent: z.boolean().refine((value) => value === true, {
    message: 'Debes aceptar la politica de uso de datos.'
  }),
  plano: z.instanceof(File).optional()
})

export type QuoteFormValues = z.infer<typeof quoteSchema>

const steps: { id: number; title: string; fields: (keyof QuoteFormValues)[] }[] = [
  { id: 0, title: 'Datos de contacto', fields: ['name', 'email', 'phone', 'company'] },
  { id: 1, title: 'Proyecto', fields: ['city', 'sector', 'familia', 'subfamilia', 'area'] },
  { id: 2, title: 'Detalles finales', fields: ['uso', 'transito', 'presupuesto', 'plazo', 'message', 'consent', 'plano'] }
]

const sectorOptions = [
  { label: 'Oficinas', value: 'oficinas' },
  { label: 'Retail', value: 'retail' },
  { label: 'Salud', value: 'salud' },
  { label: 'Educación', value: 'educacion' },
  { label: 'Industrial / Minero', value: 'industrial-minero' },
  { label: 'Aeropuertos / Transporte', value: 'aeropuertos-transporte' }
]

const presupuestoOptions = [
  { label: 'Menos de $50 / m²', value: 'bajo' },
  { label: '$50 - $120 / m2', value: 'medio' },
  { label: 'Más de $120 / m²', value: 'alto' }
]

const plazoOptions = [
  { label: 'Inmediato (0-30 dias)', value: 'inmediato' },
  { label: '1 - 3 meses', value: '1-3 meses' },
  { label: '3 - 6 meses', value: '3-6 meses' },
  { label: 'Más de 6 meses', value: '6+ meses' }
]

const usoOptions = [
  { label: 'Interior', value: 'interior' },
  { label: 'Exterior', value: 'exterior' },
  { label: 'Mixto', value: 'mixto' }
]

const transitoOptions = [
  { label: 'Transito ligero', value: 'ligero' },
  { label: 'Transito medio', value: 'medio' },
  { label: 'Transito alto / 24-7', value: 'alto' }
]

type QuoteBuilderProps = {
  defaultValues?: Partial<QuoteFormValues>
  className?: string
}


type StepHeaderProps = {
  currentStep: number
  totalSteps: number
  title: string
}

function StepHeader({ currentStep, totalSteps, title }: StepHeaderProps) {
  return (
    <div className="mb-6 flex items-center justify-between gap-6">
      <div>
        <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">Paso {currentStep + 1} de {totalSteps}</p>
        <h3 className="font-heading text-2xl font-semibold text-foreground">{title}</h3>
      </div>
      <div className="flex gap-2">
        {Array.from({ length: totalSteps }).map((_, index) => (
          <span
            key={index}
            className={`h-2 w-12 rounded-full transition-all ${index <= currentStep ? 'bg-primary' : 'bg-secondary'}`}
          />
        ))}
      </div>
    </div>
  )
}

type StepNavigatorProps = {
  currentStep: number
  totalSteps: number
  isSubmitting: boolean
  onPrev: () => void
  onNext: () => void
}

function StepNavigator({ currentStep, totalSteps, isSubmitting, onPrev, onNext }: StepNavigatorProps) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3">
      <div className="text-xs text-muted-foreground">
        Necesitas ayuda inmediata? Escribenos por WhatsApp y responderemos en minutos.
      </div>
      <div className="flex gap-3">
        {currentStep > 0 ? (
          <Button type="button" variant="outline" onClick={onPrev} disabled={isSubmitting}>
            Atras
          </Button>
        ) : null}
        {currentStep < totalSteps - 1 ? (
          <Button type="button" onClick={onNext} disabled={isSubmitting}>
            Siguiente
          </Button>
        ) : (
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Enviando' : 'Enviar cotizacion'}
          </Button>
        )}
      </div>
    </div>
  )
}
type FieldProps = {
  label: string
  children: React.ReactNode
  optional?: boolean
  error?: string
}

export function QuoteBuilder({ defaultValues, className }: QuoteBuilderProps) {
  const { toast } = useToast()
  const [currentStep, setCurrentStep] = useState(0)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const form = useForm<QuoteFormValues>({
    resolver: zodResolver(quoteSchema) as Resolver<QuoteFormValues>,
    mode: 'onBlur',
    defaultValues: {
      type: 'cotizacion',
      presupuesto: defaultValues?.presupuesto ?? '',
      plazo: defaultValues?.plazo ?? '',
      sector: defaultValues?.sector ?? '',
      familia: defaultValues?.familia ?? '',
      subfamilia: defaultValues?.subfamilia ?? '',
      uso: defaultValues?.uso ?? '',
      transito: defaultValues?.transito ?? '',
      area: defaultValues?.area ?? 0,
      name: defaultValues?.name ?? '',
      email: defaultValues?.email ?? '',
      phone: defaultValues?.phone ?? '',
      company: defaultValues?.company ?? '',
      city: defaultValues?.city ?? '',
      message: defaultValues?.message ?? '',
      consent: false
    }
  })

  const { register, handleSubmit, setValue, trigger, watch, formState, reset } = form
  const errors = formState.errors

  const onNext = async () => {
    const fields = steps[currentStep].fields
    const valid = await trigger(fields, { shouldFocus: true })
    if (!valid) return
    setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1))
  }

  const onPrev = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 0))
  }

  const onSubmit: SubmitHandler<QuoteFormValues> = async (values) => {
    try {
      setIsSubmitting(true)

      const payload: Record<string, unknown> = {
        type: values.type,
        name: values.name,
        email: values.email,
        phone: values.phone,
        company: values.company || undefined,
        city: values.city,
        sector: values.sector,
        family: values.familia || undefined,
        subfamily: values.subfamilia || undefined,
        areaM2: values.area,
        usage: values.uso || undefined,
        traffic: values.transito || undefined,
        budgetPerM2: values.presupuesto || undefined,
        deadline: values.plazo || undefined,
        message: values.message || undefined,
        comments: values.message || undefined,
        consent: values.consent,
        origin: 'quote-builder'
      }

      if (values.plano) {
        payload.attachmentName = values.plano.name
        payload.attachmentSizeBytes = values.plano.size
        payload.attachmentType = values.plano.type
      }

      const response = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      })

      const result = (await response.json().catch(() => null)) as { ok?: boolean; error?: string } | null
      if (!response.ok || !result?.ok) {
        throw new Error(result?.error ?? 'No pudimos enviar tu solicitud. Intenta nuevamente en unos minutos.')
      }

      toast({ title: 'Enviado', description: 'Tu solicitud fue enviada. Nos pondremos en contacto pronto.' })
      trackLead({
        origin: 'quote-builder',
        sector: values.sector,
        family: values.familia || undefined,
        subfamily: values.subfamilia || undefined
      })

      const keepDefaults: Partial<QuoteFormValues> = {
        sector: values.sector,
        familia: values.familia,
        subfamilia: values.subfamilia
      }

      reset({
        ...keepDefaults,
        type: 'cotizacion',
        name: '',
        email: '',
        phone: '',
        company: '',
        city: '',
        area: 0,
        uso: '',
        transito: '',
        presupuesto: '',
        plazo: '',
        message: '',
        consent: false,
        plano: undefined
      })
      setCurrentStep(0)
    } catch (error) {
      console.error(error)
      const message = error instanceof Error ? error.message : 'Intenta nuevamente en unos minutos.'
      toast({ title: 'No pudimos enviar tu solicitud', description: message })
    } finally {
      setIsSubmitting(false)
    }
  }

  const currentTitle = useMemo(() => steps[currentStep].title, [currentStep])

  const planoFile = watch('plano')

  return (
    <div className={className}>
      <StepHeader currentStep={currentStep} totalSteps={steps.length} title={currentTitle} />

      <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
        {currentStep === 0 ? (
          <div className="grid gap-4 md:grid-cols-2">
            <Field label="Nombre completo" error={errors.name?.message}>
              <Input placeholder="Nombre y apellidos" {...register('name')} />
            </Field>
            <Field label="Correo" error={errors.email?.message}>
              <Input type="email" placeholder="nombre@empresa.pe" {...register('email')} />
            </Field>
            <Field label="Telefono" error={errors.phone?.message}>
              <Input placeholder="+51 999 999 999" {...register('phone')} />
            </Field>
            <Field label="Empresa" error={errors.company?.message} optional>
              <Input placeholder="Nombre de la empresa" {...register('company')} />
            </Field>
          </div>
        ) : null}

        {currentStep === 1 ? (
          <div className="grid gap-4 md:grid-cols-2">
            <Field label="Ciudad del proyecto" error={errors.city?.message}>
              <Input placeholder="Arequipa, Cusco, etc." {...register('city')} />
            </Field>
            <Field label="Sector" error={errors.sector?.message}>
              <select className="h-11 rounded-2xl border border-border bg-white px-4 text-sm" {...register('sector')}>
                <option value="">Selecciona una opción</option>
                {sectorOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </Field>
            <Field label="Familia" error={errors.familia?.message} optional>
              <Input placeholder="Pisos, mobiliario, etc." {...register('familia')} />
            </Field>
            <Field label="Subfamilia" error={errors.subfamilia?.message} optional>
              <Input placeholder="Vinilico, silleria operativa, etc." {...register('subfamilia')} />
            </Field>
            <Field label="Metraje aproximado (m2)" error={errors.area?.message}>
              <Input type="number" min="1" step="1" placeholder="Ej. 850" {...register('area', { valueAsNumber: true })} />
            </Field>
          </div>
        ) : null}

        {currentStep === 2 ? (
          <div className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <Field label="Uso" error={errors.uso?.message} optional>
                <select className="h-11 rounded-2xl border border-border bg-white px-4 text-sm" {...register('uso')}>
                  <option value="">Selecciona una opción</option>
                  {usoOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </Field>
              <Field label="Transito" error={errors.transito?.message} optional>
                <select className="h-11 rounded-2xl border border-border bg-white px-4 text-sm" {...register('transito')}>
                  <option value="">Selecciona una opción</option>
                  {transitoOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </Field>
              <Field label="Presupuesto" error={errors.presupuesto?.message}>
                <select className="h-11 rounded-2xl border border-border bg-white px-4 text-sm" {...register('presupuesto')}>
                  <option value="">Selecciona una opción</option>
                  {presupuestoOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </Field>
              <Field label="Plazo estimado" error={errors.plazo?.message}>
                <select className="h-11 rounded-2xl border border-border bg-white px-4 text-sm" {...register('plazo')}>
                  <option value="">Selecciona una opción</option>
                  {plazoOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </Field>
            </div>
            <Field label="Comentarios adicionales" error={errors.message?.message} optional>
              <Textarea rows={4} placeholder="Describe alcances, horarios especiales u otros requisitos" {...register('message')} />
            </Field>
            <div className="grid gap-2">
              <Label htmlFor="plano">Plano o especificaciones (PDF/DWG)</Label>
              <input
                id="plano"
                type="file"
                accept=".pdf,.dwg,.dxf"
                className="rounded-2xl border border-dashed border-border bg-white px-4 py-3 text-sm"
                onChange={(event) => {
                  const file = event.target.files?.[0]
                  if (file && file.size > 10 * 1024 * 1024) {
                    toast({
                      title: 'Archivo demasiado pesado',
                      description: 'El archivo no debe superar los 10 MB.'
                    })
                    event.target.value = ''
                    setValue('plano', undefined)
                    return
                  }
                  setValue('plano', file || undefined)
                }}
              />
              {planoFile ? <p className="text-xs text-muted-foreground">Archivo adjunto: {planoFile.name}</p> : null}
            </div>
            <label className="flex items-start gap-3 text-sm text-muted-foreground">
              <input
                type="checkbox"
                className="mt-1 h-4 w-4 rounded border border-border"
                {...register('consent')}
              />
              <span>
                Autorizo el uso de mis datos para fines de contacto y envio de propuestas conforme a la politica de privacidad.
              </span>
            </label>
            {errors.consent?.message ? (
              <p className="text-sm text-destructive">{errors.consent.message}</p>
            ) : null}
          </div>
        ) : null}

        <StepNavigator
          currentStep={currentStep}
          totalSteps={steps.length}
          isSubmitting={isSubmitting}
          onPrev={onPrev}
          onNext={onNext}
        />

      </form>
    </div>
  )
}

function Field({ label, children, optional, error }: FieldProps) {
  return (
    <div className="space-y-2">
      <Label className="text-sm text-foreground">
        {label}
        {optional ? <span className="ml-1 text-xs text-muted-foreground">(opcional)</span> : null}
      </Label>
      {children}
      {error ? <p className="text-sm text-destructive">{error}</p> : null}
    </div>
  )
}




