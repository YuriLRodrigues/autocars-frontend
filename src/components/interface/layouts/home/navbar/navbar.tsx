import Image from 'next/image'

import AutoCarsLogo from '@/assets/images/autocars.svg'
import { isAuthenticated } from '@/auth'

import { navbarLinks } from './links'
import { MobileMenu } from './mobile-menu'
import { NavLink } from './nav-link'
import { UserProfile } from './user-profile'

export const Navbar = async () => {
  const userAlreadyAuthenticated = await isAuthenticated()

  return (
    <nav className="fixed z-[99] flex w-full items-center justify-between px-4 py-2 backdrop-blur-xl">
      <div className="flex items-center gap-3">
        <Image src={AutoCarsLogo} alt="Auto Cars Logo" className="h-auto w-8" width={80} height={80} />
        <span className="font-semibold text-primary">AutoCars</span>
      </div>
      <ul className="hidden items-center justify-center md:flex">
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
        {userAlreadyAuthenticated && <UserProfile />}
      </ul>
      <MobileMenu />
    </nav>
  )
}
