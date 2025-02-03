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

import { me } from '@/http/orval-generation/routes/user-controller/user-controller'

import { profileLinks } from './links'
import { LogoutButton } from './logout-button'

export const UserProfile = async () => {
  const { user } = await me()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar>
          <AvatarImage
            src={user?.avatar || '/assets/default-user-avatar.webp'}
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

export const UserProfileSkeleton = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar className="size-8">
          <AvatarFallback>AC</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="space-y-2">
        {[...Array(5)].map((_, index) => (
          <DropdownMenuItem asChild key={index}>
            <Link href="#" className="text-gray-500 hover:text-gray-600">
              Loading...
            </Link>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
