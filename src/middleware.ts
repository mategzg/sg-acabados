import { NextRequest, NextResponse } from 'next/server'
import { locales } from '@/lib/i18n-config'

// Redirect root to Spanish and rewrite non-locale paths to "/es" equivalents.
export function middleware(request: NextRequest) {
  const { nextUrl } = request
  const { pathname } = nextUrl

  // 1) If exactly "/", issue a 308 redirect to "/es"
  if (pathname === '/') {
    const dest = new URL('/es', request.url)
    return NextResponse.redirect(dest, 308)
  }

  // Bypass for system/static paths
  const isExcluded =
    pathname.startsWith('/api/') ||
    pathname.startsWith('/_next/') ||
    pathname.startsWith('/images/') ||
    pathname.startsWith('/logos/') ||
    pathname.startsWith('/favicon') ||
    pathname === '/robots.txt' ||
    pathname === '/sitemap.xml'

  if (isExcluded) {
    return NextResponse.next()
  }

  // If path already starts with a supported locale (e.g., /es or /en), proceed.
  if (locales.some((l) => pathname === `/${l}` || pathname.startsWith(`/${l}/`))) {
    return NextResponse.next()
  }

  // 2) For any other path not beginning with "/es" (or any locale), rewrite to "/es{pathname}"
  const rewriteUrl = nextUrl.clone()
  rewriteUrl.pathname = `/es${pathname}`
  return NextResponse.rewrite(rewriteUrl)
}

