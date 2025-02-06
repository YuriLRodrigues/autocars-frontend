'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { Icon } from '@/components/ui/icon'
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar'

import { UserRoles } from '@/@types/user'
import { cn } from '@/lib/utils'

import { dashboardLinks } from './links'

type SidebarMainProps = {
  userRoles: UserRoles[]
}

export const SidebarMain = ({ userRoles }: SidebarMainProps) => {
  const pathName = usePathname()

  return (
    <SidebarGroup>
      <SidebarGroupContent>
        <SidebarMenu>
          {dashboardLinks.map((link) => {
            const isLinkActive = link.href === pathName
            const isValidToUserAccess = userRoles.some((role) => link.permissionRoles.includes(role))

            if (!isValidToUserAccess) return null

            return (
              <SidebarMenuItem key={link.label}>
                <SidebarMenuButton
                  tooltip={link.label}
                  asChild
                  className="duration-200 hover:bg-foreground/10 hover:text-primary"
                >
                  <Link href={link.href} className={cn(isLinkActive && 'bg-foreground/5 font-semibold text-primary')}>
                    <Icon name={link.iconName} />
                    <span>{link.label}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            )
          })}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  )
}

export const SidebarMainSkeleton = () => {
  return (
    <SidebarGroup>
      <SidebarGroupContent>
        <SidebarMenu>
          {[...Array(5)].map((_, index) => (
            <SidebarMenuItem key={index}>
              <SidebarMenuButton>
                <Icon name="Loader" className="size-5 animate-spin" />
                <span>Loading...</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  )
}
