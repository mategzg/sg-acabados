import type { Locale } from '@/lib/i18n-config'

const ASSET_PREFIXES = ['/logos/', '/images/', '/descargas/', '/favicon'] as const

export function isAssetPath(path: string | null | undefined) {
  if (!path) {
    return false
  }

  const normalized = path.startsWith('/') ? path : `/${path}`
  return ASSET_PREFIXES.some((prefix) => normalized.startsWith(prefix))
}

export function localizePath(locale: Locale, path: string) {
  if (!path) {
    return `/${locale}`
  }

  if (
    path.startsWith('http://') ||
    path.startsWith('https://') ||
    path.startsWith('mailto:') ||
    path.startsWith('tel:') ||
    path.startsWith('#')
  ) {
    return path
  }

  if (isAssetPath(path)) {
    return path.startsWith('/') ? path : `/${path}`
  }

  if (!locale) {
    return path
  }

  const normalized = path.startsWith('/') ? path : `/${path}`

  if (normalized === `/${locale}` || normalized.startsWith(`/${locale}/`)) {
    return normalized
  }

  return `/${locale}${normalized}`
}
