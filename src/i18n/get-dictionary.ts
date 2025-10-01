import { type Locale, defaultLocale } from '@/lib/i18n-config'

export async function getDictionary(locale: Locale) {
  switch (locale) {
    case 'en':
      return (await import('@/i18n/dictionaries/en')).default
    case 'es':
    default:
      return (await import('@/i18n/dictionaries/es')).default
  }
}

export async function getDefaultDictionary() {
  return getDictionary(defaultLocale)
}

