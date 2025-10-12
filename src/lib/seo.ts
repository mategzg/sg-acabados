import type { Metadata } from 'next'

import { siteConfig } from '@/config/site'
import { defaultLocale, type Locale } from '@/lib/i18n-config'

type ImageOverride = {
  url: string
  width?: number
  height?: number
  alt?: string
}

const baseUrl = siteConfig.siteUrl.replace(/\/$/, '')
const defaultOgImage = {
  url: `${baseUrl}/images/og/sg-acabados.jpg`,
  width: 1200,
  height: 630,
  alt: 'Equipo de SG Acabados trabajando en obra'
}

export function resolvePath(locale: Locale, path: string) {
  const normalized = path.startsWith('/') ? path : `/${path}`

  if (normalized === '/') {
    return locale === defaultLocale ? '/' : `/${locale}`
  }

  return locale === defaultLocale ? normalized : `/${locale}${normalized}`
}

export function absoluteUrl(path: string) {
  return `${baseUrl}${path}`
}

function toAbsoluteImageUrl(url: string) {
  if (/^https?:\/\//.test(url)) {
    return url
  }

  const normalized = url.startsWith('/') ? url : `/${url}`
  return absoluteUrl(normalized)
}

export function createMetadata({
  locale,
  title,
  description,
  path,
  keywords = [],
  image
}: {
  locale: Locale
  title: string
  description: string
  path: string
  keywords?: string[]
  image?: ImageOverride
}): Metadata {
  const normalized = path.startsWith('/') ? path : `/${path}`
  const canonicalPath =
    locale === defaultLocale
      ? normalized
      : normalized === '/'
        ? `/${locale}`
        : `/${locale}${normalized}`
  const canonical = absoluteUrl(canonicalPath)
  const mergedKeywords = Array.from(new Set([...(siteConfig.keywords ?? []), ...keywords]))

  const ogImage = image
    ? {
        url: toAbsoluteImageUrl(image.url),
        width: image.width ?? defaultOgImage.width,
        height: image.height ?? defaultOgImage.height,
        alt: image.alt ?? `${title} - ${siteConfig.name}`
      }
    : defaultOgImage

  return {
    title,
    description,
    keywords: mergedKeywords,
    alternates: {
      canonical,
      languages: {
        'es-PE': absoluteUrl(normalized),
        'en-US': absoluteUrl(resolvePath('en', path))
      }
    },
    openGraph: {
      title,
      description,
      type: 'website',
      locale: locale === 'es' ? 'es_PE' : 'en_US',
      url: canonical,
      siteName: siteConfig.name,
      images: [ogImage]
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImage.url]
    }
  }
}
