import { notFound } from 'next/navigation'

import type { ReactNode } from 'react'

import type { Locale } from '@/lib/i18n-config'
import { locales } from '@/lib/i18n-config'
import { getDictionary } from '@/i18n/get-dictionary'
import { LocaleProvider } from '@/i18n/locale-provider'

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

export default async function LocaleLayout({
  children,
  params
}: {
  children: ReactNode
  params: { locale: Locale }
}) {
  const { locale } = params

  if (!locales.includes(locale)) {
    notFound()
  }

  const messages = await getDictionary(locale)

  return <LocaleProvider locale={locale} messages={messages}>{children}</LocaleProvider>
}
