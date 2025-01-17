import Link from 'next/link'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

import { authToken } from '@/auth'

import { profileLinks } from './links'
import { LogoutButton } from './logout-button'

export const UserProfile = async () => {
  const userData = await authToken()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar className="size-8">
          <AvatarImage
            src={userData?.avatar || '/assets/default-user-avatar.webp'}
            className="object-cover object-center"
          />
          <AvatarFallback>AC</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="space-y-2">
        <DropdownMenuLabel>Minha conta</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {profileLinks.map((link) => (
          <DropdownMenuItem asChild key={link.href}>
            <Link href={link.href}>{link.label}</Link>
          </DropdownMenuItem>
        ))}
        <LogoutButton className="h-7" />
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
