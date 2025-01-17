import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

import { AUTH_COOKIE_NAME } from './utils/constants'

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname
  const token = request.cookies.get(AUTH_COOKIE_NAME)?.value

  const pathIsAuth = ['/auth/sign-in', '/auth/sign-up', '/auth/forgot-password', '/auth/new-password'].includes(
    pathname,
  )

  if (token && pathIsAuth) return NextResponse.redirect(new URL('/', request.nextUrl.origin))

  if (!token && (pathname.includes('/dashboard') || (pathname !== '/' && !pathIsAuth))) {
    return NextResponse.redirect(new URL('/auth/sign-in', request.nextUrl.origin))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|assets/.*).*)'],
}
