import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { locales } from '@/lib/i18n-config'

// Redirect root to Spanish and rewrite non-locale paths to "/es" equivalents.
export function middleware(request: NextRequest) {
  const { nextUrl } = request
  const { pathname } = nextUrl

  // a) If exactly "/", issue a 308 redirect to "/es"
  if (pathname === '/') {
    const dest = new URL('/es', request.url)
    return NextResponse.redirect(dest, 308)
  }

  // If path already starts with a supported locale (e.g., /es or /en), proceed.
  if (locales.some((l) => pathname === `/${l}` || pathname.startsWith(`/${l}/`))) {
    return NextResponse.next()
  }

  // b) For any other path not beginning with a locale, rewrite to "/es{pathname}"
  const rewriteUrl = nextUrl.clone()
  rewriteUrl.pathname = `/es${pathname}`
  return NextResponse.rewrite(rewriteUrl)
}

export const config = {
  matcher: [
    "/((?!_next|api|images|logos|favicon.ico|favicon.png|robots.txt|sitemap.xml).*)"
  ]
}
