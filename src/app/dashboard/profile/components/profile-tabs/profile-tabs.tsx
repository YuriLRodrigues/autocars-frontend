'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { Icon } from '@/components/ui/icon'

import { cn } from '@/lib/utils'

export const ProfileTabs = () => {
  const pathname = usePathname()
  const isAddress = pathname.includes('/address')

  return (
    <section className="flex w-fit flex-col gap-y-2">
      <Link
        href="/dashboard/profile"
        className={cn(
          'flex cursor-pointer items-center gap-2 rounded-md p-2 transition-all duration-200 hover:bg-muted',
          !isAddress && 'bg-muted/50 font-semibold text-primary',
        )}
      >
        <Icon name="User" className="size-5" /> Informações pessoais
      </Link>
      <Link
        href="/dashboard/profile/address"
        className={cn(
          'flex cursor-pointer items-center gap-2 rounded-md p-2 transition-all duration-200 hover:bg-muted',
          isAddress && 'font-semibold text-primary',
        )}
      >
        <Icon name="House" className="size-5" /> Endereço
      </Link>
    </section>
  )
}
