/* eslint-disable @typescript-eslint/no-unused-vars */

import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

import { dashboardLinks } from './components/interface/layouts/dashboard/sidebar/links'
import { profileLinks } from './components/interface/layouts/home/navbar/links'

import jwt from 'jsonwebtoken'

import { UserRoles } from './@types/user'
import { me } from './http/orval-generation/routes/user-controller/user-controller'
import { AUTH_COOKIE_NAME } from './utils/constants'

export async function middleware(request: NextRequest) {
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

  if (token && pathname.includes('/dashboard')) {
    const userPayload = await me()
    const userRoles: UserRoles[] = (userPayload?.user?.roles as UserRoles[]) || []
    const userRole = userRoles.find(
      (role) => role === UserRoles.Manager || role === UserRoles.Seller || role === UserRoles.Customer,
    )

    const isProfileUrl = pathname.includes('/dashboard/profile')

    const currentRoute = isProfileUrl
      ? profileLinks.find((link) => link.href === pathname)
      : dashboardLinks.find((link) => link.href === pathname)

    const isValidToUserAccess = currentRoute && userRole && currentRoute?.permissionRoles?.includes(userRole)

    if (!isValidToUserAccess) {
      return NextResponse.redirect(new URL('/', request.nextUrl.origin))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|assets/.*).*)'],
}
