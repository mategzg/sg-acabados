"use client"

import { useState, type ReactNode } from 'react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { useToast } from '@/components/ui/use-toast'
import { trackLead } from '@/lib/ga'

type FieldProps = {
  label: string
  children: ReactNode
  optional?: boolean
}

function Field({ label, children, optional }: FieldProps) {
  return (
    <div className="space-y-2">
      <Label className="text-sm text-foreground">
        {label}
        {optional ? <span className="ml-1 text-xs text-muted-foreground">(opcional)</span> : null}
      </Label>
      {children}
    </div>
  )
}

export function ContactLeadForm() {
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const form = event.currentTarget
    const formData = new FormData(form)

    const consent = formData.get('consent') === 'true'
    if (!consent) {
      toast({ title: 'Debes aceptar el uso de datos', description: 'Marca la casilla de consentimiento para continuar.' })
      return
    }

    const name = (formData.get('name') ?? '').toString().trim()
    const email = (formData.get('email') ?? '').toString().trim()
    const phone = (formData.get('phone') ?? '').toString().trim()
    const companyValue = (formData.get('company') ?? '').toString().trim()
    const city = (formData.get('city') ?? '').toString().trim()
    const messageValue = (formData.get('message') ?? '').toString().trim()

    const payload = {
      type: 'contacto',
      name,
      email,
      phone,
      company: companyValue || undefined,
      city,
      message: messageValue || undefined,
      consent
    }

    setIsSubmitting(true)

    try {
      const response = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      })

      const result = (await response.json().catch(() => null)) as { ok?: boolean; error?: string } | null

      if (!response.ok || !result?.ok) {
        throw new Error(result?.error ?? 'No pudimos enviar tu mensaje. Intenta nuevamente en unos minutos.')
      }

      toast({ title: 'Enviado', description: 'Te responderemos dentro del mismo dia habil.' })
      trackLead({ origin: 'contact-form', city })
      form.reset()
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Intenta nuevamente en unos minutos.'
      toast({ title: 'No pudimos enviar tu mensaje', description: message })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form className="space-y-space-md" onSubmit={handleSubmit}>
      <div className="grid gap-space-md md:grid-cols-2">
        <Field label="Nombre">
          <Input name="name" required placeholder="Nombre y apellidos" autoComplete="name" />
        </Field>
        <Field label="Correo">
          <Input type="email" name="email" required placeholder="nombre@empresa.pe" autoComplete="email" />
        </Field>
        <Field label="Telefono">
          <Input name="phone" required placeholder="+51 999 999 999" autoComplete="tel" />
        </Field>
        <Field label="Empresa" optional>
          <Input name="company" placeholder="Nombre de la empresa" autoComplete="organization" />
        </Field>
      </div>
      <Field label="Ciudad">
        <Input name="city" required placeholder="Arequipa, Cusco, etc." autoComplete="address-level2" />
      </Field>
      <Field label="Mensaje">
        <Textarea name="message" required rows={4} placeholder="Cuentanos como podemos ayudarte" />
      </Field>
      <label className="flex items-start gap-3 text-sm text-muted-foreground">
        <input type="checkbox" name="consent" value="true" required className="mt-1 h-4 w-4 rounded border border-border" />
        <span>Acepto el uso de mis datos personales para fines de contacto y seguimiento comercial.</span>
      </label>
      <Button type="submit" className="w-full md:w-auto" disabled={isSubmitting}>
        {isSubmitting ? 'Enviando' : 'Enviar mensaje'}
      </Button>
    </form>
  )
}
