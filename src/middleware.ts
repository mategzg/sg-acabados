import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

const EXCLUDE_PREFIXES = [
  '/_next',
  '/api',
  '/favicon',
  '/robots.txt',
  '/sitemap.xml',
  '/sitemap-0.xml',
  '/images',
  '/logos',
  '/og',
  '/assets',
  '/fonts'
]

const OTHER_LOCALES = ['en']
const PUBLIC_FILE = /\.[^/]+$/

export function middleware(req: NextRequest) {
  const { pathname, search } = req.nextUrl

  if (
    EXCLUDE_PREFIXES.some((prefix) => pathname.startsWith(prefix)) ||
    PUBLIC_FILE.test(pathname)
  ) {
    return NextResponse.next()
  }

  if (pathname === '/es' || pathname.startsWith('/es/')) {
    const stripped = pathname.replace(/^\/es(?=\/|$)/, '') || '/'
    const url = new URL(`${stripped}${search}`, req.url)
    return NextResponse.redirect(url, 308)
  }

  if (OTHER_LOCALES.some((locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`))) {
    return NextResponse.next()
  }

  const targetPath = pathname === '/' ? '/es' : `/es${pathname}`
  const target = new URL(`${targetPath}${search}`, req.url)

  return NextResponse.rewrite(target)
}

export const config = {
  matcher: [
    '/((?!_next|api|favicon|robots.txt|sitemap.xml|sitemap-0.xml|images|logos|og|assets|fonts).*)'
  ]
}
