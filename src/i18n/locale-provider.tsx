"use client"

import type { ReactNode } from 'react'

import { NextIntlClientProvider } from 'next-intl'

import type { Locale } from '@/lib/i18n-config'

type LocaleProviderProps = {
  locale: Locale
  messages: Record<string, unknown>
  children: ReactNode
}

export function LocaleProvider({ locale, messages, children }: LocaleProviderProps) {
  return (
    <NextIntlClientProvider locale={locale} messages={messages} timeZone="America/Lima">
      {children}
    </NextIntlClientProvider>
  )
}
