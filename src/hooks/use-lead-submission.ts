import { useCallback } from 'react'

import { useToast } from '@/components/ui/use-toast'

export type LeadSubmitOptions = {
  success?: {
    title: string
    description?: string
  }
  error?: {
    title: string
    description?: string
  }
  onSuccess?: () => void
  onError?: (message: string) => void
  showToast?: boolean
}

type LeadSubmitResult = {
  ok: boolean
  message?: string
  data?: unknown
}

export function useLeadSubmission() {
  const { toast } = useToast()

  const submitLead = useCallback(
    async (formData: FormData, options: LeadSubmitOptions = {}): Promise<LeadSubmitResult> => {
      const { success, error, onSuccess, onError, showToast = true } = options

      try {
        const response = await fetch('/api/lead', {
          method: 'POST',
          body: formData
        })

        const result = await response.json()
        if (!response.ok) {
          throw new Error(result.message ?? 'No pudimos enviar tu solicitud. Intenta nuevamente.')
        }

        if (showToast) {
          if (success) {
            toast({ title: success.title, description: success.description })
          } else {
            toast({ title: 'Solicitud enviada', description: 'Nuestro equipo te contactara a la brevedad.' })
          }
        }

        onSuccess?.()
        return { ok: true, data: result }
      } catch (error_) {
        const message = error_ instanceof Error ? error_.message : 'Intenta nuevamente en unos minutos.'

        if (showToast) {
          if (error) {
            toast({ title: error.title, description: error.description ?? message })
          } else {
            toast({ title: 'No pudimos enviar tu solicitud', description: message })
          }
        }

        onError?.(message)
        return { ok: false, message }
      }
    },
    [toast]
  )

  return { submitLead }
}
