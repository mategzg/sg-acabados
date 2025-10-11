'use client'

import { type HTMLAttributes, useEffect, useMemo, useRef, useState } from 'react'
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
  const [scriptLoaded, setScriptLoaded] = useState(false)
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
    if (!shouldRender || typeof window === 'undefined') {
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

    const whatsappFab = document.getElementById('whatsapp-fab')
    const ctaFab = document.getElementById('cta-fab')
    const presentFabs = [whatsappFab, ctaFab].filter(Boolean) as HTMLElement[]

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
  }, [shouldRender, scriptLoaded])

  if (!shouldRender) {
    return null
  }

  return (
    <>
      <Script
        id="zapier-chatbot-script"
        src={EMBED_SRC}
        strategy="afterInteractive"
        type="module"
        onLoad={() => setScriptLoaded(true)}
      />
      <div
        id="zapier-fab"
        ref={wrapperRef}
        aria-label="Abrir asistente SG"
        className={cn('pointer-events-auto transition-transform')}
      >
        <zapier-interfaces-chatbot-embed chatbot-id={CHATBOT_ID}></zapier-interfaces-chatbot-embed>
      </div>
    </>
  )
}
