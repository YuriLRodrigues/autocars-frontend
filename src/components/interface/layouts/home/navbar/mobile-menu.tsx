import Image from 'next/image'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Icon } from '@/components/ui/icon'
import { Separator } from '@/components/ui/separator'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'

import AutoCarsLogo from '@/assets/images/autocars.svg'
import { authToken, isAuthenticated } from '@/auth'

import { navbarLinks } from './links'
import { NavLink } from './nav-link'
import { UserProfile } from './user-profile'

export const MobileMenu = async () => {
  const userAlreadyAuthenticated = await isAuthenticated()

  const userData = await authToken()

  return (
    <Sheet>
      <SheetTrigger className="flex items-center justify-center gap-2 md:hidden">
        <Icon name="Menu" className="size-5" />
        {userAlreadyAuthenticated && <UserProfile />}
      </SheetTrigger>
      <SheetContent className="flex flex-col space-y-6">
        <SheetHeader>
          <SheetTitle className="flex w-full items-center justify-center gap-3">
            <Image src={AutoCarsLogo} alt="Auto Cars Logo" className="h-auto w-8" width={80} height={80} />
            <span className="font-semibold text-primary">AutoCars</span>
          </SheetTitle>
        </SheetHeader>
        <ul className="flex flex-1 flex-col gap-3">
          {navbarLinks.map((link) => (
            <NavLink
              label={link.label}
              href={link.href}
              iconName={link.iconName}
              isAuthOnly={link?.isAuthOnly}
              highlight={link?.highlight}
              key={link.label}
            />
          ))}
        </ul>
        {userAlreadyAuthenticated && (
          <div className="space-y-3">
            <Separator />
            <div className="flex items-center gap-2">
              <Avatar>
                <AvatarImage
                  src={userData?.avatar || '/assets/default-user-avatar.webp'}
                  className="object-cover object-center"
                />
                <AvatarFallback>AC</AvatarFallback>
              </Avatar>

              <div>
                <span className="line-clamp-1 text-sm font-medium text-foreground">{userData?.name}</span>
                <span className="text-xs font-medium text-gray-500">{userData?.email}</span>
              </div>
            </div>
          </div>
        )}
      </SheetContent>
    </Sheet>
  )
}

export const MobileMenuSkeleton = () => {
  return (
    <Sheet>
      <SheetTrigger className="flex items-center justify-center gap-2 md:hidden">
        <Icon name="Menu" className="size-5" />
        <Avatar className="size-8">
          <AvatarFallback>AC</AvatarFallback>
        </Avatar>
      </SheetTrigger>
      <SheetContent className="flex flex-col space-y-6">
        <SheetHeader>
          <SheetTitle className="flex w-full items-center justify-center gap-3">
            <Image src={AutoCarsLogo} alt="Auto Cars Logo" className="h-auto w-8" width={80} height={80} />
            <span className="font-semibold text-primary">AutoCars</span>
          </SheetTitle>
        </SheetHeader>
        <ul className="flex flex-1 flex-col gap-3">
          {navbarLinks.map((link) => (
            <NavLink
              label={link.label}
              href={link.href}
              iconName={link.iconName}
              isAuthOnly={link?.isAuthOnly}
              highlight={link?.highlight}
              key={link.label}
            />
          ))}
        </ul>
      </SheetContent>
    </Sheet>
  )
}
