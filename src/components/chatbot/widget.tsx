'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

import { FallbackWidget } from './fallback-widget'

export function ChatbotWidget() {
  const pathname = usePathname()
  const publicUrl = (process.env.NEXT_PUBLIC_ZAPIER_PUBLIC_URL || '').trim()

  useEffect(() => {
    if (!publicUrl) {
      console.warn('ChatbotWidget: defina NEXT_PUBLIC_ZAPIER_PUBLIC_URL para habilitar el widget.')
    }
  }, [publicUrl])

  if (!publicUrl) {
    return null
  }

  if (!pathname || pathname.startsWith('/es/cotizar')) {
    return null
  }

  return <FallbackWidget />
}

