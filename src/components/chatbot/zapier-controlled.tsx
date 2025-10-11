'use client'

import { type HTMLAttributes, useCallback, useEffect, useMemo, useRef, useState } from 'react'
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
  const [debugMode, setDebugMode] = useState(false)
  const [scriptPresent, setScriptPresent] = useState(false)
  const [embedPresent, setEmbedPresent] = useState(false)
  const wrapperRef = useRef<HTMLDivElement | null>(null)

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

  const updatePosition = useCallback(() => {
    if (typeof window === 'undefined') {
      return
    }

    const wrapper = wrapperRef.current
    if (!wrapper) {
      return
    }

    const width = window.innerWidth
    const compact = width <= 360
    if (compact) {
      wrapper.dataset.compact = 'true'
    } else {
      delete wrapper.dataset.compact
    }

    const baseBottom = 16
    const baseSide = 16

    const whatsappFab = document.getElementById('whatsapp-fab') as HTMLElement | null
    const ctaFab = document.getElementById('cta-fab') as HTMLElement | null
    const presentFabs = [whatsappFab, ctaFab].filter((fab): fab is HTMLElement => Boolean(fab))

    const multipleFabs = presentFabs.length > 1
    const hasAnyFab = presentFabs.length > 0

    const moveLeft = width < 360 || multipleFabs
    wrapper.dataset.side = moveLeft ? 'left' : 'right'

    const extraOffset = hasAnyFab ? (width <= 420 ? 96 : 64) : 0
    const bottomValue = `calc(${baseBottom}px + ${extraOffset}px + env(safe-area-inset-bottom, 0px))`

    wrapper.style.bottom = bottomValue

    if (moveLeft) {
      wrapper.style.left = `${baseSide}px`
      wrapper.style.right = 'initial'
    } else {
      wrapper.style.left = 'initial'
      wrapper.style.right = `${baseSide}px`
    }

    if (debugMode) {
      console.info('ZapierWidget debug: wrapper position ->', {
        bottom: wrapper.style.bottom,
        right: wrapper.style.right,
        left: wrapper.style.left,
        compact,
        hasAnyFab,
        multipleFabs,
        open: wrapper.dataset.open
      })
    }
  }, [debugMode])

  useEffect(() => {
    if (!shouldRender || typeof document === 'undefined') {
      return
    }

    updatePosition()

    const observer = new MutationObserver(() => {
      updatePosition()
    })
    observer.observe(document.body, { childList: true, subtree: true })

    window.addEventListener('resize', updatePosition)

    return () => {
      observer.disconnect()
      window.removeEventListener('resize', updatePosition)
    }
  }, [shouldRender, updatePosition])

  useEffect(() => {
    if (!shouldRender || typeof document === 'undefined') {
      setEmbedPresent(false)
      return
    }

    const wrapper = wrapperRef.current
    const embed = wrapper?.querySelector('zapier-interfaces-chatbot-embed') as HTMLElement | null
    setEmbedPresent(Boolean(embed))

    if (!wrapper || !embed) {
      return
    }

    wrapper.dataset.open = wrapper.dataset.open ?? 'false'

    if (typeof ResizeObserver === 'undefined') {
      return
    }

    const resizeObserver = new ResizeObserver((entries) => {
      const entry = entries[0]
      if (!entry) {
        return
      }

      const { height } = entry.contentRect
      const isOpen = height > 120
      const host = wrapperRef.current
      if (!host) {
        return
      }
      host.dataset.open = isOpen ? 'true' : 'false'
      updatePosition()
    })

    resizeObserver.observe(embed)

    return () => resizeObserver.disconnect()
  }, [shouldRender, updatePosition])

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
  }, [debugMode, shouldRender, scriptPresent, embedPresent])

  const handleScriptLoad = () => {
    setScriptPresent(true)
    updatePosition()
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
        ref={wrapperRef}
        aria-label="Abrir asistente SG"
        className={cn('pointer-events-auto transition-transform')}
      >
        <zapier-interfaces-chatbot-embed
          is-popup="true"
          chatbot-id={CHATBOT_ID}
        ></zapier-interfaces-chatbot-embed>
      </div>
    </>
  )
}
