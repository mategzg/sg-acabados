"use client"

import type { ReactNode } from 'react'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { useToast } from '@/components/ui/use-toast'
import { trackLead } from '@/lib/ga'

const projectOptions = [
  { label: 'Oficinas corporativas', value: 'oficinas' },
  { label: 'Retail y hospitality', value: 'retail' },
  { label: 'Salud y laboratorios', value: 'salud' },
  { label: 'Aeropuertos y transporte', value: 'aeropuertos-transporte' },
  { label: 'Industrial y logística', value: 'industrial-logistica' },
  { label: 'Otros proyectos', value: 'otros' }
]
const budgetOptions = [
  { label: 'Menos de $50 / m²', value: 'bajo' },
  { label: '$50 - $120 / m2', value: 'medio' },
  { label: 'Más de $120 / m²', value: 'alto' }
]
const timeframeOptions = [
  { label: 'Inmediato (0-30 dias)', value: 'inmediato' },
  { label: '1 - 3 meses', value: '1-3 meses' },
  { label: '3 - 6 meses', value: '3-6 meses' },
  { label: 'Más de 6 meses', value: '6-plus' }
]
const quoteLeadSchema = z.object({
  name: z.string().trim().min(2, 'Ingresa tu nombre completo'),
  email: z.string().trim().email('Correo invalido'),
  phone: z.string().trim().min(6, 'Ingresa un telefono valido').max(20, 'El telefono es muy largo'),
  company: z.string().trim().optional(),
  city: z.string().trim().min(2, 'Indica la ciudad del proyecto'),
  sector: z.string().trim().min(1, 'Selecciona el tipo de proyecto'),
  familia: z.string().trim().optional(),
  area: z
    .string()
    .optional()
    .refine((value) => !value || Number(value) > 0, { message: 'Ingresa un metraje valido' }),
  presupuesto: z.string().trim().optional(),
  plazo: z.string().trim().optional(),
  message: z.string().trim().optional(),
  consent: z.boolean().refine((value) => value === true, {
    message: 'Debes aceptar la politica de datos.'
  })
})
export type QuoteLeadValues = z.infer<typeof quoteLeadSchema>
export type QuoteLeadFormProps = {
  defaultValues?: Partial<QuoteLeadValues>
}
export function QuoteLeadForm({ defaultValues }: QuoteLeadFormProps) {
  const { toast } = useToast()
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting }
  } = useForm<QuoteLeadValues>({
    resolver: zodResolver(quoteLeadSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      company: '',
      city: '',
      sector: defaultValues?.sector ?? '',
      familia: defaultValues?.familia ?? '',
      area: defaultValues?.area ?? '',
      presupuesto: defaultValues?.presupuesto ?? '',
      plazo: defaultValues?.plazo ?? '',
      message: defaultValues?.message ?? '',
      consent: false
    }
  })
  const onSubmit = async (values: QuoteLeadValues) => {
    const payload = {
      type: 'cotizacion',
      name: values.name,
      email: values.email,
      phone: values.phone,
      company: values.company || undefined,
      city: values.city,
      sector: values.sector,
      family: values.familia || undefined,
      areaM2: values.area ? Number(values.area) || values.area : undefined,
      budgetPerM2: values.presupuesto || undefined,
      deadline: values.plazo || undefined,
      comments: values.message || undefined,
      consent: values.consent,
      origin: 'quote-form'
    }
    try {
      const response = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      })
      const result = (await response.json().catch(() => null)) as { ok?: boolean; error?: string } | null
      if (!response.ok || !result?.ok) {
        throw new Error(result?.error ?? 'No pudimos enviar tu solicitud. Intenta nuevamente en unos minutos.')
      }
      toast({ title: 'Enviado', description: 'Te contactaremos en menos de 24 horas hábiles.' })
      trackLead({ origin: 'quote-form', sector: values.sector, city: values.city, family: values.familia || undefined })
      reset({
        name: '',
        email: '',
        phone: '',
        company: '',
        city: '',
        sector: '',
        familia: '',
        area: '',
        presupuesto: '',
        plazo: '',
        message: '',
        consent: false
      })
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Intenta nuevamente en unos minutos.'
      toast({ title: 'No pudimos enviar tu solicitud', description: message })
    }
  }
  return (
    <form className="space-y-space-md" onSubmit={handleSubmit(onSubmit)} noValidate>
      <div className="grid gap-space-md md:grid-cols-2">
        <Field label="Nombre" error={errors.name?.message}>
          <Input placeholder="Nombre y apellidos" autoComplete="name" {...register('name')} />
        </Field>
        <Field label="Correo" error={errors.email?.message}>
          <Input type="email" placeholder="nombre@empresa.pe" autoComplete="email" {...register('email')} />
        </Field>
        <Field label="Telefono" error={errors.phone?.message}>
          <Input type="tel" placeholder="+51 999 999 999" autoComplete="tel" {...register('phone')} />
        </Field>
        <Field label="Empresa" optional error={errors.company?.message}>
          <Input placeholder="Nombre de la empresa" autoComplete="organization" {...register('company')} />
        </Field>
      </div>
      <div className="grid gap-space-md md:grid-cols-2">
        <Field label="Ciudad" error={errors.city?.message}>
          <Input placeholder="Arequipa, Cusco, etc." autoComplete="address-level2" {...register('city')} />
        </Field>
        <Field label="Tipo de proyecto" error={errors.sector?.message}>
          <select className="h-11 rounded-2xl border border-border bg-white px-4 text-sm" {...register('sector')}>
            <option value="">Selecciona una opción</option>
            {projectOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </Field>
      </div>
      <div className="grid gap-space-md md:grid-cols-2">
        <Field label="Familia de interes" optional error={errors.familia?.message}>
          <Input placeholder="Pisos, mobiliario, sistemas, etc." {...register('familia')} />
        </Field>
        <Field label="Metraje aproximado (m2)" optional error={errors.area?.message}>
          <Input type="number" min="1" step="1" placeholder="Ej. 800" {...register('area')} />
        </Field>
      </div>
      <div className="grid gap-space-md md:grid-cols-2">
        <Field label="Presupuesto por m2" optional error={errors.presupuesto?.message}>
          <select className="h-11 rounded-2xl border border-border bg-white px-4 text-sm" {...register('presupuesto')}>
            <option value="">Selecciona un rango</option>
            {budgetOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </Field>
        <Field label="Plazo estimado" optional error={errors.plazo?.message}>
          <select className="h-11 rounded-2xl border border-border bg-white px-4 text-sm" {...register('plazo')}>
            <option value="">Selecciona un plazo</option>
            {timeframeOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </Field>
      </div>
      <Field label="Comentarios" optional error={errors.message?.message}>
        <Textarea rows={4} placeholder="Describe alcances, fechas clave u otros detalles" {...register('message')} />
      </Field>
      <label className="flex items-start gap-space-sm text-sm text-muted-foreground">
        <input
          type="checkbox"
          className="mt-1 h-4 w-4 rounded border border-border"
          {...register('consent', { setValueAs: (value) => value === true || value === 'true' || value === 'on' })}
        />
        <span>Acepto el uso de mis datos para contacto y envio de propuestas segun la politica de privacidad.</span>
      </label>
      {errors.consent?.message ? <p className="text-sm text-destructive">{errors.consent.message}</p> : null}
      <Button type="submit" className="w-full md:w-auto" disabled={isSubmitting}>
        {isSubmitting ? 'Enviando' : 'Enviar solicitud'}
      </Button>
    </form>
  )
}
type FieldProps = {
  label: string
  children: ReactNode
  error?: string
  optional?: boolean
}
function Field({ label, children, error, optional }: FieldProps) {
  return (
    <div className="space-y-space-xs">
      <Label className="text-sm text-foreground">
        {label}
        {optional ? <span className="ml-1 text-xs text-muted-foreground">(opcional)</span> : null}
      </Label>
      {children}
      {error ? <p className="text-sm text-destructive">{error}</p> : null}
    </div>
  )
}
