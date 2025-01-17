'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ComponentPropsWithRef } from 'react'

import { Button } from '@/components/ui/button'
import { Icon } from '@/components/ui/icon'

import { cn } from '@/lib/utils'
import { AUTH_COOKIE_NAME } from '@/utils/constants'
import { getCookie } from 'cookies-next/client'

import { NavbarLinksProps } from './links'

type NavLinkProps = NavbarLinksProps & ComponentPropsWithRef<typeof Link>

export const NavLink = ({ label, href, highlight, isAuthOnly, iconName, className, ...props }: NavLinkProps) => {
  const currentPathname = usePathname()
  const isActive = currentPathname === href
  const isAuthenticated = getCookie(AUTH_COOKIE_NAME)

  return (
    <Button
      className={cn(
        'flex w-fit cursor-pointer text-black dark:text-white max-md:w-full max-md:justify-start',
        isActive && 'font-bold text-primary dark:text-primary max-md:bg-primary-foreground/5 max-md:shadow',
        isAuthenticated && isAuthOnly && 'hidden',
        isAuthOnly && 'h-8',
        className,
      )}
      variant={highlight ? 'default' : 'link'}
      effect={highlight ? 'shine' : 'hoverUnderline'}
      asChild
    >
      <Link href={href} {...props}>
        <li className="flex items-center justify-center gap-2">
          <Icon name={iconName} />
          {label}
        </li>
      </Link>
    </Button>
  )
}
