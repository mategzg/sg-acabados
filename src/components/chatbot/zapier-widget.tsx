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
  const [shouldLoadScript, setShouldLoadScript] = useState(false)
  const [offsetClass, setOffsetClass] = useState<'bottom-5' | 'bottom-24'>('bottom-5')
  const [debugMode, setDebugMode] = useState(false)
  const [scriptPresent, setScriptPresent] = useState(false)
  const [embedPresent, setEmbedPresent] = useState(false)

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
    if (typeof window === 'undefined') {
      return
    }
    const params = new URLSearchParams(window.location.search)
    const isDebug = params.get('debug') === 'chatbot'
    setDebugMode(isDebug)

    if (isDebug) {
      console.table({ id: CHATBOT_ID || '(missing)', src: EMBED_SRC || '(missing)' })
      if (!EMBED_SRC || !CHATBOT_ID) {
        console.warn('ZapierWidget debug: faltan variables NEXT_PUBLIC_ZAPIER_CHATBOT_ID o NEXT_PUBLIC_ZAPIER_EMBED_SRC; no se renderizara el widget.')
      }
    }
  }, [])

  useEffect(() => {
    if (!shouldRender || typeof document === 'undefined' || !EMBED_SRC) {
      setScriptPresent(false)
      setShouldLoadScript(false)
      return
    }

    const existingScript = document.querySelector<HTMLScriptElement>(`script[src="${EMBED_SRC}"]`)
    const hasScript = Boolean(existingScript)
    setScriptPresent(hasScript)
    setShouldLoadScript(!hasScript)
  }, [shouldRender])

  useEffect(() => {
    if (!shouldRender || typeof window === 'undefined' || typeof document === 'undefined') {
      setOffsetClass('bottom-5')
      return
    }

    const computeOffset = () => {
      if (typeof window === 'undefined') {
        setOffsetClass('bottom-5')
        return
      }

      const isOnRightSide = (element: HTMLElement | null) => {
        if (!element) {
          return false
        }
        const rect = element.getBoundingClientRect()
        return rect.left >= window.innerWidth / 2
      }

      const fabElements = [
        document.getElementById('whatsapp-fab') as HTMLElement | null,
        document.getElementById('cta-fab') as HTMLElement | null
      ]

      const hasOtherFab = fabElements.some(isOnRightSide)
      setOffsetClass(hasOtherFab ? 'bottom-24' : 'bottom-5')
    }

    computeOffset()

    const observer = new MutationObserver(computeOffset)
    observer.observe(document.body, { childList: true, subtree: true })

    window.addEventListener('resize', computeOffset)

    return () => {
      observer.disconnect()
      window.removeEventListener('resize', computeOffset)
    }
  }, [shouldRender])

  useEffect(() => {
    if (!shouldRender || typeof document === 'undefined') {
      setEmbedPresent(false)
      return
    }

    const checkEmbed = () => {
      setEmbedPresent(Boolean(document.querySelector('zapier-interfaces-chatbot-embed')))
    }

    checkEmbed()

    const observer = new MutationObserver(checkEmbed)
    observer.observe(document.body, { childList: true, subtree: true })

    return () => observer.disconnect()
  }, [shouldRender])

  useEffect(() => {
    if (!debugMode) {
      return
    }

    if (!shouldRender) {
      console.info('ZapierWidget debug: widget oculto (ruta sensible o variables faltantes).')
      return
    }

    console.info('ZapierWidget debug: script presente ->', scriptPresent)
    console.info('ZapierWidget debug: embed presente ->', embedPresent)
    console.info('ZapierWidget debug: offset ->', offsetClass)
  }, [debugMode, shouldRender, scriptPresent, embedPresent, offsetClass])

  const handleScriptLoad = () => {
    setScriptPresent(true)
    if (debugMode) {
      console.info('ZapierWidget debug: script de Zapier cargado correctamente.')
    }
  }

  const handleScriptError = () => {
    if (debugMode) {
      console.error('ZapierWidget debug: error al cargar el script de Zapier.')
    }
  }

  if (!shouldRender) {
    return null
  }

  return (
    <>
      {shouldLoadScript ? (
        <Script id="zapier-chatbot-script" src={EMBED_SRC} strategy="afterInteractive" type="module" onLoad={handleScriptLoad} onError={handleScriptError} />
      ) : null}
      <div
        id="zapier-fab"
        aria-label="Abrir asistente SG"
        className={cn('fixed right-5 z-[60] pointer-events-auto transition-all', offsetClass)}
      >
        <zapier-interfaces-chatbot-embed is-popup="true" chatbot-id={CHATBOT_ID}></zapier-interfaces-chatbot-embed>
      </div>
    </>
  )
}



