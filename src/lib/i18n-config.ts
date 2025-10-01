export const locales = ['es', 'en'] as const
export type Locale = (typeof locales)[number]

export const defaultLocale: Locale = 'es'

export const localeLabels: Record<Locale, string> = {
  es: 'Espanol',
  en: 'English'
}

export const rtlLocales: Locale[] = []

