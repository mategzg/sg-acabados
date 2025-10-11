'use client'

import { type HTMLAttributes, useEffect, useMemo, useState } from 'react'
import Script from 'next/script'
import { usePathname } from 'next/navigation'

import { cn } from '@/lib/utils'

/* eslint-disable @typescript-eslint/no-namespace */
declare global {
  namespace JSX {
    interface IntrinsicElements {
      'zapier-interfaces-chatbot-embed': HTMLAttributes<HTMLElement>
    }
  }
}
/* eslint-enable @typescript-eslint/no-namespace */

const EMBED_SRC = (process.env.NEXT_PUBLIC_ZAPIER_EMBED_SRC || '').trim()
const CHATBOT_ID = (process.env.NEXT_PUBLIC_ZAPIER_CHATBOT_ID || '').trim()

export function ZapierWidget() {
  const pathname = usePathname()
  const [shouldLoadScript, setShouldLoadScript] = useState(true)
  const [hasWhatsappFab, setHasWhatsappFab] = useState(false)

  const shouldRender = useMemo(() => {
    if (!EMBED_SRC || !CHATBOT_ID) {
      return false
    }
    if (!pathname) {
      return true
    }
    return !pathname.startsWith('/es/cotizar')
  }, [pathname])

  useEffect(() => {
    if (!shouldRender || !EMBED_SRC) {
      setShouldLoadScript(false)
      return
    }

    const existingScript = document.querySelector<HTMLScriptElement>(`script[src="${EMBED_SRC}"]`)
    if (existingScript) {
      setShouldLoadScript(false)
    } else {
      setShouldLoadScript(true)
    }
  }, [shouldRender])

  useEffect(() => {
    if (!shouldRender) {
      return
    }
    setHasWhatsappFab(Boolean(document.getElementById('whatsapp-fab')))
  }, [shouldRender])

  if (!shouldRender) {
    return null
  }

  const bottomClass = hasWhatsappFab ? 'bottom-20' : 'bottom-5'

  return (
    <>
      {shouldLoadScript ? (
        <Script id="zapier-chatbot-script" src={EMBED_SRC} strategy="afterInteractive" />
      ) : null}
      <div aria-label="Abrir asistente SG" className={cn('fixed right-5 z-[60] pointer-events-auto md:bottom-5', bottomClass)}>
        <zapier-interfaces-chatbot-embed is-popup="true" chatbot-id={CHATBOT_ID}></zapier-interfaces-chatbot-embed>
      </div>
    </>
  )
}
