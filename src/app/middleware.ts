import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export default function authMiddleware(request: NextRequest) {
  const tokenCookie = request.cookies.get('autocars.token-cookie')

  if (!tokenCookie) {
    return NextResponse.redirect(new URL('/auth/sign-in', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|auth/sign-in|auth/sign-up|public/.*|$).*)',
  ],
}
