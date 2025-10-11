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
const FAB_SIZE = 16

export function ZapierWidget() {
  const pathname = usePathname()
  const [mounted, setMounted] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const [viewportWidth, setViewportWidth] = useState<number>(typeof window !== 'undefined' ? window.innerWidth : 0)
  const [fabStyle, setFabStyle] = useState<CSSProperties>({
    bottom: `calc(env(safe-area-inset-bottom, 0px) + ${FAB_SIZE}px)`,
    right: `${FAB_SIZE}px`
  })
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

    let extra = 0
    if (document.getElementById('whatsapp-fab')) {
      extra += 64
    }
    if (document.getElementById('cta-fab')) {
      extra += 64
    }
    if (width <= 420) {
      extra += 16
    }

    const bottomValue = `calc(env(safe-area-inset-bottom, 0px) + ${FAB_SIZE}px + ${extra}px)`
    const moveLeft = width < 360 || extra >= 128

    setFabStyle({
      bottom: bottomValue,
      right: moveLeft ? 'initial' : `${FAB_SIZE}px`,
      left: moveLeft ? `${FAB_SIZE}px` : 'initial'
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

    const observer = new MutationObserver(() => computeFabPosition())
    observer.observe(document.body, { childList: true, subtree: true })

    window.addEventListener('resize', computeFabPosition)

    return () => {
      observer.disconnect()
      window.removeEventListener('resize', computeFabPosition)
    }
  }, [shouldRender, computeFabPosition])

  useEffect(() => {
    if (isOpen) {
      computeFabPosition()
    }
  }, [isOpen, computeFabPosition])

  if (!mounted || !shouldRender) {
    return null
  }

  const isMobile = viewportWidth < 768

  const panel = !isOpen
    ? null
    : (
        <>
          <div
            className="fixed inset-0 z-[79] bg-black/40"
            aria-hidden="true"
            onClick={() => setIsOpen(false)}
          />
          {isMobile ? (
            <div className="fixed inset-x-0 bottom-0 z-[80] flex justify-center">
              <div className="relative mx-auto w-[min(96vw,480px)] h-[min(88dvh,720px)] rounded-t-2xl border bg-background shadow-2xl overflow-hidden pb-[calc(env(safe-area-inset-bottom,0px)+12px)]">
                <div className="absolute left-1/2 top-2 h-1.5 w-12 -translate-x-1/2 rounded-full bg-muted" />
                <div className="block h-full w-full min-h-0"><zapier-interfaces-chatbot-embed chatbot-id={CHATBOT_ID}></zapier-interfaces-chatbot-embed></div>
              </div>
            </div>
          ) : (
            <div className="fixed z-[80] right-4 bottom-[calc(env(safe-area-inset-bottom,0px)+84px)]">
              <div className="relative w-[min(96vw,480px)] h-[min(88dvh,720px)] rounded-2xl border bg-background shadow-2xl overflow-hidden pb-[calc(env(safe-area-inset-bottom,0px)+12px)]">
                <div className="block h-full w-full min-h-0"><zapier-interfaces-chatbot-embed chatbot-id={CHATBOT_ID}></zapier-interfaces-chatbot-embed></div>
              </div>
            </div>
          )}
        </>
      )

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
        aria-label="Abrir asistente"
      >
        <span className="text-lg font-semibold">SG</span>
      </button>
      {panel}
    </>,
    document.body
  )
}
