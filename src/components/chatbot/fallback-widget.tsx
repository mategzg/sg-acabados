'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { MessageCircle, X } from 'lucide-react'

import { cn } from '@/lib/utils'

const STORAGE_KEY = 'chatbot:minimized'

export function FallbackWidget() {
  const publicUrl = (process.env.NEXT_PUBLIC_ZAPIER_PUBLIC_URL || '').trim()
  const [isMounted, setIsMounted] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const [offsetClass, setOffsetClass] = useState('bottom-5')
  const [iframeError, setIframeError] = useState(false)
  const headerRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  useEffect(() => {
    if (!publicUrl) {
      console.warn('ChatbotWidget: defina NEXT_PUBLIC_ZAPIER_PUBLIC_URL para habilitar el widget.')
    }
  }, [publicUrl])

  useEffect(() => {
    if (!publicUrl || typeof window === 'undefined') {
      return
    }
    const stored = window.localStorage.getItem(STORAGE_KEY)
    if (stored === 'false') {
      setIsOpen(true)
    }
  }, [publicUrl])

  useEffect(() => {
    if (typeof window === 'undefined') {
      return
    }
    const computeOffset = () => {
      setOffsetClass(window.innerWidth < 768 ? 'bottom-20' : 'bottom-5')
    }
    computeOffset()
    window.addEventListener('resize', computeOffset)
    return () => window.removeEventListener('resize', computeOffset)
  }, [])

  useEffect(() => {
    if (!publicUrl || typeof window === 'undefined') {
      return
    }
    window.localStorage.setItem(STORAGE_KEY, isOpen ? 'false' : 'true')
  }, [isOpen, publicUrl])

  useEffect(() => {
    if (!isOpen) {
      return
    }
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen])

  useEffect(() => {
    if (isOpen) {
      headerRef.current?.focus()
    }
  }, [isOpen])

  const togglePanel = useCallback(() => {
    setIsOpen((prev) => !prev)
    setIframeError(false)
  }, [])

  const closePanel = useCallback(() => {
    setIsOpen(false)
  }, [])

  const handleIframeError = useCallback(() => {
    setIframeError(true)
  }, [])

  if (!publicUrl || !isMounted) {
    return null
  }

  return (
    <>
      <button
        type="button"
        className="fixed bottom-5 right-5 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-black text-white shadow-lg transition-transform duration-200 hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2"
        aria-expanded={isOpen}
        aria-label={isOpen ? 'Minimizar asistente de chat' : 'Abrir asistente de chat'}
        onClick={togglePanel}
      >
        <MessageCircle className={cn('h-6 w-6 transition-transform', isOpen && 'scale-90 opacity-80')} aria-hidden="true" />
        <span className="sr-only">Asistente SG</span>
      </button>

      <div
        className={cn(
          'fixed right-5 z-50 flex origin-bottom-right transform flex-col overflow-hidden rounded-2xl border bg-background shadow-2xl outline-none transition-all duration-200 ease-out',
          offsetClass,
          'w-[360px] h-[560px] md:w-[380px] md:h-[600px]',
          'max-[399px]:inset-0 max-[399px]:bottom-0 max-[399px]:right-0 max-[399px]:h-full max-[399px]:w-full max-[399px]:rounded-none',
          isOpen ? 'pointer-events-auto scale-100 opacity-100' : 'pointer-events-none scale-95 opacity-0'
        )}
        role="dialog"
        aria-modal="true"
        aria-label="Asistente SG"
      >
        <div
          ref={headerRef}
          tabIndex={-1}
          className="flex items-center justify-between bg-muted px-4 py-3 text-sm font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-muted"
        >
          <span>Asistente SG</span>
          <button
            type="button"
            onClick={closePanel}
            aria-label="Cerrar"
            className="flex h-8 w-8 items-center justify-center rounded-full transition-colors hover:bg-muted-foreground/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-muted"
          >
            <X className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>
        <div className="flex flex-1 flex-col bg-background">
          {iframeError ? (
            <a
              className="m-4 inline-flex items-center justify-center rounded-lg border border-dashed px-4 py-3 text-sm font-medium text-primary underline-offset-2 transition-colors hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              href={publicUrl}
              target="_blank"
              rel="noreferrer"
            >
              Abrir chat en una pestaña nueva
            </a>
          ) : (
            <iframe
              src={publicUrl}
              title="Asistente SG"
              className="h-full w-full border-0"
              loading="lazy"
              referrerPolicy="no-referrer"
              onError={handleIframeError}
            />
          )}
        </div>
      </div>
    </>
  )
}

