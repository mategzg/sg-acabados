import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const PUBLIC_FILE = /\.(.*)$/
const IGNORED_PATHS = new Set([
  '/robots.txt',
  '/sitemap.xml',
  '/sitemap-0.xml',
  '/favicon.ico',
  '/favicon.png'
])
const IGNORED_PREFIXES = ['/_next', '/api', '/_vercel']
const LOCALES = new Set(['es', 'en'])
const DEFAULT_LOCALE = 'es'

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl

  if (
    IGNORED_PATHS.has(pathname) ||
    IGNORED_PREFIXES.some((prefix) => pathname.startsWith(prefix)) ||
    PUBLIC_FILE.test(pathname)
  ) {
    return NextResponse.next()
  }

  const segments = pathname.split('/').filter(Boolean)
  const locale = segments[0]

  if (locale === DEFAULT_LOCALE) {
    const url = req.nextUrl.clone()
    const rest = segments.slice(1)
    url.pathname = rest.length ? `/${rest.join('/')}` : '/'
    return NextResponse.redirect(url, 308)
  }

  if (locale && LOCALES.has(locale)) {
    return NextResponse.next()
  }

  const url = req.nextUrl.clone()
  url.pathname = pathname === '/' ? `/${DEFAULT_LOCALE}` : `/${DEFAULT_LOCALE}${pathname}`

  return NextResponse.rewrite(url)
}

export const config = {
  matcher: ['/:path*']
}
