/* eslint-disable @typescript-eslint/no-unused-vars */

import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

import jwt from 'jsonwebtoken'

import { AUTH_COOKIE_NAME } from './utils/constants'

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname
  const token = request.cookies.get(AUTH_COOKIE_NAME)?.value

  const pathIsAuth = ['/auth/sign-in', '/auth/sign-up', '/auth/forgot-password', '/auth/new-password'].includes(
    pathname,
  )

  if (token) {
    try {
      const decoded = jwt.decode(token) as { exp: number } | null

      if (decoded?.exp) {
        const now = Math.floor(Date.now() / 1000)

        if (decoded.exp < now) {
          return NextResponse.redirect(new URL('/auth/sign-in', request.nextUrl.origin))
        }
      }
    } catch (error) {
      return NextResponse.redirect(new URL('/auth/sign-in', request.nextUrl.origin))
    }

    if (pathIsAuth) return NextResponse.redirect(new URL('/', request.nextUrl.origin))
  }

  if (!token && (pathname.includes('/dashboard') || (pathname !== '/' && !pathIsAuth))) {
    return NextResponse.redirect(new URL('/auth/sign-in', request.nextUrl.origin))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|assets/.*).*)'],
}
