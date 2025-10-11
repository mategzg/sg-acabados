'use client'

import { useCallback } from 'react'
import { LocalizedLink as Link } from '@/components/localized-link'
import { ClipboardList, MessageCircle } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { siteConfig } from '@/config/site'
import { sendEvent, trackWhatsapp } from '@/lib/gtag'

const QUOTE_EVENT = {
  context: 'sticky-cta',
  destination: 'cotizar'
} as const

const WHATSAPP_MESSAGE = 'Hola, quisiera hablar con SG Acabados sobre un proyecto.'
const WHATSAPP_URL = `${siteConfig.whatsapp.link}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`

export function StickyCTA() {
  const handleQuoteClick = useCallback(() => {
    sendEvent('click_cta', QUOTE_EVENT)
  }, [])

  const handleWhatsappClick = useCallback(() => {
    trackWhatsapp('sticky-cta')
  }, [])

  return (
    <div
      id="cta-fab"
      className="fixed bottom-4 left-4 right-4 z-50 flex flex-col gap-space-sm rounded-3xl bg-white/95 p-space-sm shadow-soft backdrop-blur-sm sm:inset-auto sm:bottom-4 sm:left-4 sm:right-auto sm:w-auto sm:flex-row sm:items-center"
      role="region"
      aria-live="polite"
      aria-label="Atajos de contacto"
    >
      <Button asChild size="sm" className="w-full shadow-none sm:w-auto">
        <Link href="/cotizar" aria-label="Abrir formulario de cotizacion" onClick={handleQuoteClick}>
          <span className="flex items-center justify-center gap-2">
            <ClipboardList className="h-4 w-4" aria-hidden="true" />
            Solicitar cotizacion
          </span>
        </Link>
      </Button>
      <Button asChild size="sm" variant="outline" className="w-full bg-white shadow-none sm:w-auto">
        <a
          id="whatsapp-fab"
          href={WHATSAPP_URL}
          target="_blank"
          rel="noreferrer"
          aria-label="Contactar via WhatsApp"
          onClick={handleWhatsappClick}
        >
          <span className="flex items-center justify-center gap-2">
            <MessageCircle className="h-4 w-4" aria-hidden="true" />
            WhatsApp
          </span>
        </a>
      </Button>
    </div>
  )
}

