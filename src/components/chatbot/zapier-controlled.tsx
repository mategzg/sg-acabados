"use client"

import { type CSSProperties, type HTMLAttributes, useCallback, useEffect, useMemo, useRef, useState } from 'react'
import Script from 'next/script'
import { usePathname } from 'next/navigation'
import { createPortal } from 'react-dom'

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
  const [mounted, setMounted] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const [viewportWidth, setViewportWidth] = useState<number | null>(null)
  const [fabStyle, setFabStyle] = useState<CSSProperties>({ bottom: '16px', right: '16px' })
  const fabRef = useRef<HTMLButtonElement | null>(null)

  useEffect(() => {
    setMounted(true)
  }, [])

  const shouldRender = useMemo(() => {
    if (!EMBED_SRC || !CHATBOT_ID) {
      return false
    }
    if (!pathname) {
      return true
    }
    return !pathname.startsWith('/es/cotizar')
  }, [pathname])

  const updateViewportWidth = useCallback(() => {
    if (typeof window !== 'undefined') {
      setViewportWidth(window.innerWidth)
    }
  }, [])

  useEffect(() => {
    updateViewportWidth()
    if (typeof window === 'undefined') {
      return
    }
    window.addEventListener('resize', updateViewportWidth)
    return () => window.removeEventListener('resize', updateViewportWidth)
  }, [updateViewportWidth])

  const computeFabPosition = useCallback(() => {
    if (typeof window === 'undefined') {
      return
    }

    const width = window.innerWidth
    const baseBottom = 16
    const baseSide = 16

    const whatsappFab = document.getElementById('whatsapp-fab')
    const ctaFab = document.getElementById('cta-fab')
    const presentFabs = [whatsappFab, ctaFab].filter(Boolean) as HTMLElement[]

    const multipleFabs = presentFabs.length > 1
    const hasAnyFab = presentFabs.length > 0

    const moveLeft = width < 360 || multipleFabs
    const extraOffset = hasAnyFab ? (width <= 420 ? 96 : 64) : 0
    const bottomValue = `calc(${baseBottom}px + ${extraOffset}px + env(safe-area-inset-bottom, 0px))`

    setFabStyle({
      bottom: bottomValue,
      right: moveLeft ? 'initial' : `${baseSide}px`,
      left: moveLeft ? `${baseSide}px` : 'initial'
    })

    const fab = fabRef.current
    if (fab) {
      fab.dataset.side = moveLeft ? 'left' : 'right'
    }
  }, [])

  useEffect(() => {
    if (!shouldRender || typeof window === 'undefined') {
      return
    }

    computeFabPosition()

    const observer = new MutationObserver(() => {
      computeFabPosition()
    })
    observer.observe(document.body, { childList: true, subtree: true })

    window.addEventListener('resize', computeFabPosition)

    return () => {
      observer.disconnect()
      window.removeEventListener('resize', computeFabPosition)
    }
  }, [shouldRender, computeFabPosition])

  if (!mounted || !shouldRender) {
    return null
  }

  const isMobile = (viewportWidth ?? 0) < 768

  const panel = isOpen ? (
    <div className="fixed inset-0 z-[80]">
      <button
        type="button"
        aria-label="Cerrar asistente"
        className="absolute inset-0 bg-black/40"
        onClick={() => setIsOpen(false)}
      />
      {isMobile ? (
        <div className="absolute inset-x-0 bottom-0 z-[81] rounded-t-2xl bg-background shadow-2xl">
          <div className="absolute -top-3 left-1/2 h-1.5 w-12 -translate-x-1/2 rounded-full bg-muted" />
          <div className="h-[85dvh] max-h-[720px] w-full overflow-hidden rounded-t-2xl pb-[calc(env(safe-area-inset-bottom,0px)+16px)]">
            <zapier-interfaces-chatbot-embed chatbot-id={CHATBOT_ID}></zapier-interfaces-chatbot-embed>
          </div>
        </div>
      ) : (
        <div className="absolute bottom-[calc(16px+env(safe-area-inset-bottom,0px))] right-4 z-[81] w-[420px] max-h-[720px] overflow-hidden rounded-2xl bg-background shadow-2xl ring-1 ring-border">
          <zapier-interfaces-chatbot-embed chatbot-id={CHATBOT_ID}></zapier-interfaces-chatbot-embed>
        </div>
      )}
    </div>
  ) : null

  return createPortal(
    <>
      <Script id="zapier-chatbot-script" src={EMBED_SRC} strategy="afterInteractive" type="module" />
      <button
        type="button"
        id="chatbot-fab"
        ref={fabRef}
        style={fabStyle}
        className="fixed bottom-4 right-4 z-[70] inline-flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg transition-transform hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
        onClick={() => setIsOpen(true)}
        aria-expanded={isOpen}
        aria-controls="zapier-chat-panel"
        aria-label="Abrir asistente"
      >
        <span className="text-lg font-semibold">SG</span>
      </button>
      {panel}
    </>,
    document.body
  )
}

