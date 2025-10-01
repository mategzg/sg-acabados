"use client"

import type { AnchorHTMLAttributes, ForwardedRef } from 'react'
import { forwardRef } from 'react'
import NextLink, { type LinkProps } from 'next/link'
import { useParams } from 'next/navigation'

import type { Locale } from '@/lib/i18n-config'
import { isAssetPath, localizePath } from '@/lib/routing'

type LocalizedLinkProps = LinkProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> & {
    href: string
    locale?: Locale
  }

function isExternalHref(href: string) {
  if (!href) return true

  if (
    href.startsWith('http://') ||
    href.startsWith('https://') ||
    href.startsWith('mailto:') ||
    href.startsWith('tel:') ||
    href.startsWith('#')
  ) {
    return true
  }

  return /\.(pdf|docx?|xlsx?|zip|rar|7z|png|jpe?g|webp)(\?|$)/i.test(href)
}

function normalizeAssetHref(href: string) {
  return href.startsWith('/') ? href : `/${href}`
}

function LocalizedLinkBase(
  { href, locale, ...props }: LocalizedLinkProps,
  ref: ForwardedRef<HTMLAnchorElement>
) {
  const params = useParams() as { locale?: string } | null
  const resolvedLocale = locale ?? (params?.locale as Locale | undefined)

  const assetHref = isAssetPath(href) ? normalizeAssetHref(href) : null
  const finalHref =
    assetHref ?? (!resolvedLocale || isExternalHref(href) ? href : localizePath(resolvedLocale, href))

  return <NextLink ref={ref} href={finalHref} {...props} />
}

export const LocalizedLink = forwardRef<HTMLAnchorElement, LocalizedLinkProps>(LocalizedLinkBase)
LocalizedLink.displayName = 'LocalizedLink'
