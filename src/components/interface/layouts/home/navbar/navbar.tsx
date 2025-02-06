import Image from 'next/image'
import { Suspense } from 'react'

import { UserRoles } from '@/@types/user'
import AutoCarsLogo from '@/assets/images/autocars.svg'
import { isAuthenticated } from '@/auth'
import { me } from '@/http/orval-generation/routes/user-controller/user-controller'

import { navbarLinks } from './links'
import { MobileMenu, MobileMenuSkeleton } from './mobile-menu'
import { NavLink } from './nav-link'
import { UserProfile, UserProfileSkeleton } from './user-profile'

export const Navbar = async () => {
  const userAlreadyAuthenticated = await isAuthenticated()
  let userRoles: UserRoles[] = []

  if (userAlreadyAuthenticated) {
    const meUser = await me()
    userRoles = meUser.user.roles as UserRoles[]
  }

  return (
    <nav className="fixed z-[99] flex w-full items-center justify-between px-4 py-2 backdrop-blur-xl">
      <div className="flex items-center gap-3">
        <Image src={AutoCarsLogo} alt="Auto Cars Logo" className="h-auto w-8" width={80} height={80} />
        <span className="font-semibold text-primary">AutoCars</span>
      </div>
      <ul className="hidden items-center justify-center md:flex">
        {navbarLinks.map((link) => {
          const userRole =
            userRoles.find(
              (role) => role === UserRoles.Manager || role === UserRoles.Seller || role === UserRoles.Customer,
            ) ?? null

          const isValidToUserAccess =
            !link.permissionRoles || (userRole ? link.permissionRoles.includes(userRole) : false)

          if (!isValidToUserAccess) return null
          return (
            <NavLink
              label={link.label}
              href={link.href}
              iconName={link.iconName}
              isAuthOnly={link?.isAuthOnly}
              highlight={link?.highlight}
              key={link.label}
            />
          )
        })}
        {userAlreadyAuthenticated && (
          <Suspense fallback={<UserProfileSkeleton />}>
            <UserProfile />
          </Suspense>
        )}
      </ul>
      <Suspense fallback={<MobileMenuSkeleton />}>
        <MobileMenu />
      </Suspense>
    </nav>
  )
}

export const NavbarSkeleton = () => {
  return (
    <nav className="fixed z-[99] flex w-full items-center justify-between px-4 py-2 backdrop-blur-xl">
      <div className="flex items-center gap-3">
        <Image src={AutoCarsLogo} alt="Auto Cars Logo" className="h-auto w-8" width={80} height={80} />
        <span className="font-semibold text-primary">AutoCars</span>
      </div>
      <ul className="hidden items-center justify-center md:flex">
        {[...Array(2)].map((_, index) => (
          <NavLink label={`Skeleton`} isSkeleton={true} href="#" iconName="Loader" key={index} />
        ))}
        <UserProfileSkeleton />
      </ul>
    </nav>
  )
}
