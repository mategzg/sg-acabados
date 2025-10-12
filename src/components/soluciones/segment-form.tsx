"use client"

import { useEffect, useMemo, useRef } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/components/ui/use-toast"
import { trackLead } from "@/lib/ga"

const numericFields = new Set(["area_m2", "presupuesto_pen_m2", "presupuesto_pen_total", "unidades", "areas_comunes_m2"])

const fieldDefinitions: Record<string, FieldDefinition> = {
  empresa: {
    label: "Empresa",
    placeholder: "Nombre de la empresa",
    autoComplete: "organization",
    optional: true
  },
  nombre: {
    label: "Nombre",
    placeholder: "Nombre y apellidos",
    autoComplete: "name"
  },
  email: {
    label: "Correo",
    placeholder: "nombre@empresa.pe",
    autoComplete: "email",
    type: "email"
  },
  telefono: {
    label: "Teléfono",
    placeholder: "+51 999 999 999",
    autoComplete: "tel",
    type: "tel"
  },
  ciudad: {
    label: "Ciudad",
    placeholder: "Lima, Arequipa, etc.",
    autoComplete: "address-level2"
  },
  area_m2: {
    label: "Metraje aproximado (m²)",
    placeholder: "Ej. 1 200",
    type: "number",
    optional: true
  },
  uso_sector: {
    label: "Uso o área del proyecto",
    placeholder: "Oficinas administrativas, call center, etc.",
    optional: true
  },
  plazo_objetivo: {
    label: "Plazo objetivo",
    placeholder: "Ej. Entrega en 8 semanas",
    optional: true
  },
  presupuesto_pen_m2: {
    label: "Presupuesto (S/ por m²)",
    placeholder: "Ej. 250",
    type: "number",
    optional: true
  },
  fileUrl: {
    label: "Link a planos o referencias",
    placeholder: "https://drive.google.com/...",
    type: "url",
    optional: true
  },
  comentarios: {
    label: "Comentarios adicionales",
    placeholder: "Notas, restricciones de horario o alcances específicos",
    type: "textarea",
    optional: true
  },
  unidades: {
    label: "Número de unidades",
    placeholder: "Departamentos, oficinas, etc.",
    type: "number"
  },
  areas_comunes_m2: {
    label: "Áreas comunes (m²)",
    placeholder: "Metros aproximados",
    type: "number",
    optional: true
  },
  plazo_obra: {
    label: "Plazo de obra",
    placeholder: "Ej. Inicio julio, entrega diciembre",
    optional: true
  },
  ambiente: {
    label: "Ambiente a intervenir",
    placeholder: "Sala, dormitorio, terraza",
    optional: true
  },
  presupuesto_pen_total: {
    label: "Presupuesto total (S/)",
    placeholder: "Ej. 18 000",
    type: "number",
    optional: true
  }
}

type FieldDefinition = {
  label: string
  placeholder?: string
  type?: "text" | "email" | "tel" | "number" | "textarea" | "url"
  autoComplete?: string
  optional?: boolean
}

type SegmentFormProps = {
  segmentId: string
  formId: string
  fields: string[]
  cta: string
  selectedKit: string | null
  onClearKit: () => void
  onSubmitted?: () => void
  registerContainerRef?: (element: HTMLDivElement | null) => void
}

type FormSchema = z.infer<ReturnType<typeof createSchema>>

export function SegmentForm({
  segmentId,
  formId,
  fields,
  cta,
  selectedKit,
  onClearKit,
  onSubmitted,
  registerContainerRef
}: SegmentFormProps) {
  const { toast } = useToast()
  const schema = useMemo(() => createSchema(fields), [fields])
  const defaultValues = useMemo(() => createDefaultValues(fields), [fields])
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting }
  } = useForm<FormSchema>({
    resolver: zodResolver(schema),
    defaultValues
  })
  const containerRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (!registerContainerRef) {
      return
    }
    registerContainerRef(containerRef.current)
    return () => registerContainerRef(null)
  }, [registerContainerRef])

  const onSubmit = async (values: FormSchema) => {
    const formValues = { ...values } as Record<string, unknown>
    delete formValues.consent

    const payload: Record<string, unknown> = {
      source: "soluciones",
      segment: segmentId,
      kit_name: selectedKit ?? undefined,
      page: typeof window !== "undefined" ? window.location.href : undefined
    }

    for (const [key, value] of Object.entries(formValues)) {
      if (value === undefined || value === null || value === "") {
        continue
      }

      if (numericFields.has(key)) {
        const numberValue = typeof value === "number" ? value : Number(value)
        if (!Number.isNaN(numberValue)) {
          payload[key] = numberValue
        }
        continue
      }

      payload[key] = value
    }

    try {
      const response = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      })

      const result = (await response.json().catch(() => null)) as { ok?: boolean; error?: string } | null
      if (!response.ok || !result?.ok) {
        throw new Error(result?.error ?? "No pudimos registrar tu solicitud. Intenta en unos minutos.")
      }

      toast({
        title: "Solicitud enviada",
        description: "Te contactaremos en menos de 24 horas hábiles."
      })
      trackLead({ origin: "soluciones", segment: segmentId, kit_name: selectedKit ?? undefined })
      reset(defaultValues)
      onClearKit()
      onSubmitted?.()
    } catch (error) {
      const message = error instanceof Error ? error.message : "Intenta nuevamente más tarde."
      toast({ title: "No pudimos enviar tu solicitud", description: message })
    }
  }

  return (
    <div ref={containerRef} className="space-y-space-md" id={`form-${segmentId}`}>
      <form id={formId} className="space-y-space-md" noValidate onSubmit={handleSubmit(onSubmit)}>
        <div className="space-y-1">
          <h3 className="font-heading text-lg font-semibold text-foreground">Solicita una propuesta</h3>
          <p className="text-sm text-muted-foreground">
            Completa el formulario para recibir alcance técnico, cronograma y presupuesto estimado.
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
              aria-label="Cambiar kit seleccionado"
            >
              Cambiar
            </button>
          </div>
        ) : null}

        <div className="grid gap-space-md md:grid-cols-2">
          {fields.map((field) => {
            const definition = fieldDefinitions[field] ?? { label: field }
            const fieldError = errors[field as keyof FormSchema]
            const errorMessage = typeof fieldError?.message === "string" ? fieldError.message : undefined
            const isTextarea = definition.type === "textarea"
            const inputClassName = isTextarea
              ? "min-h-[140px] rounded-2xl border border-border bg-white px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground"
              : "h-11 rounded-2xl border border-border bg-white px-4 text-sm text-foreground placeholder:text-muted-foreground"

            return (
              <div key={field} className={isTextarea ? "md:col-span-2 space-y-space-xs" : "space-y-space-xs"}>
                <Label className="text-sm text-foreground">
                  {definition.label}
                  {definition.optional ? (
                    <span className="ml-1 text-xs text-muted-foreground">(opcional)</span>
                  ) : null}
                </Label>
                {isTextarea ? (
                  <Textarea
                    {...register(field)}
                    placeholder={definition.placeholder}
                    autoComplete={definition.autoComplete}
                    className={inputClassName}
                    aria-invalid={errorMessage ? "true" : "false"}
                    aria-describedby={errorMessage ? `${field}-error` : undefined}
                  />
                ) : (
                  <Input
                    {...register(field)}
                    placeholder={definition.placeholder}
                    autoComplete={definition.autoComplete}
                    className={inputClassName}
                    type={definition.type ?? (numericFields.has(field) ? "number" : "text")}
                    inputMode={definition.type === "number" || numericFields.has(field) ? "decimal" : undefined}
                    aria-invalid={errorMessage ? "true" : "false"}
                    aria-describedby={errorMessage ? `${field}-error` : undefined}
                  />
                )}
                {errorMessage ? (
                  <p id={`${field}-error`} className="text-sm text-destructive">
                    {errorMessage}
                  </p>
                ) : null}
              </div>
            )
          })}
        </div>

        <label className="flex items-start gap-3 text-sm text-muted-foreground">
          <input
            type="checkbox"
            value="true"
            className="mt-1 h-4 w-4 rounded border border-border"
            {...register("consent")}
          />
          <span>Acepto el uso de mis datos personales para contacto comercial y seguimiento.</span>
        </label>
        {errors.consent?.message ? (
          <p className="text-sm text-destructive">{errors.consent.message}</p>
        ) : null}

        <Button type="submit" className="w-full md:w-auto" disabled={isSubmitting}>
          {isSubmitting ? "Enviando..." : cta}
        </Button>
      </form>
    </div>
  )
}

function createDefaultValues(fields: string[]) {
  const values: Record<string, unknown> = { consent: false }
  for (const field of fields) {
    values[field] = ""
  }
  return values as FormSchema
}

function createSchema(fields: string[]) {
  const shape: Record<string, z.ZodTypeAny> = {}

  for (const field of fields) {
    const definition = fieldDefinitions[field] ?? { label: field }

    if (definition.type === "number" || numericFields.has(field)) {
      let schema: z.ZodTypeAny = z
        .string()
        .trim()
        .refine((value) => value === "" || !Number.isNaN(Number(value.replace(/,/g, "."))), {
          message: "Ingresa un número válido"
        })

      if (definition.optional) {
        schema = schema.optional().transform((value) => (value && value !== "" ? value : undefined))
      } else {
        schema = (schema as z.ZodString).min(1, "Ingresa un número válido")
      }

      shape[field] = schema
      continue
    }

    let schema: z.ZodTypeAny = z.string().trim()
    if (definition.type === "email") {
      schema = (schema as z.ZodString).email("Ingresa un correo válido")
    }
    if (definition.type === "tel") {
      schema = (schema as z.ZodString)
        .min(6, "Ingresa un teléfono válido")
        .max(20, "El teléfono es muy largo")
    }
    if (definition.type === "url") {
      schema = (schema as z.ZodString).url("Ingresa un enlace válido")
    }

    if (definition.optional) {
      shape[field] = schema.optional().transform((value) => {
        if (!value) {
          return undefined
        }
        const trimmed = (value as string).trim()
        return trimmed === "" ? undefined : trimmed
      })
    } else {
      const message = field === "nombre" ? "Ingresa tu nombre" : `Ingresa ${definition.label.toLowerCase()}`
      shape[field] = (schema as z.ZodString).min(1, message)
    }
  }

  shape.consent = z
    .union([z.literal("true"), z.boolean()])
    .transform((value) => value === true || value === "true")
    .refine((value) => value === true, { message: "Debes autorizar el uso de datos." })

  return z.object(shape)
}








