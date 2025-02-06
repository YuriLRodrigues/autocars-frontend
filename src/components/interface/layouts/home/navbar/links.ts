import { UserRoles } from '@/@types/user'
import { icons } from 'lucide-react'

export type NavbarLinksProps = {
  iconName: keyof typeof icons
  href: string
  label: string
  highlight?: boolean
  isAuthOnly?: boolean
  permissionRoles?: UserRoles[]
}

export const navbarLinks: NavbarLinksProps[] = [
  {
    href: '/',
    label: 'Home',
    iconName: 'House',
  },
  {
    href: '/cars',
    label: 'Carros',
    iconName: 'Car',
  },
  {
    href: '/auth/sign-in',
    label: 'Acessar',
    isAuthOnly: true,
    highlight: true,
    iconName: 'LogIn',
  },
]

export const profileLinks: NavbarLinksProps[] = [
  {
    href: '/dashboard/manager',
    label: 'Painel',
    iconName: 'LayoutDashboard',
    permissionRoles: [UserRoles.Manager],
  },
  {
    href: '/dashboard/seller',
    label: 'Painel',
    iconName: 'LayoutDashboard',
    permissionRoles: [UserRoles.Seller],
  },
  {
    href: '/dashboard/customer',
    label: 'Painel',
    iconName: 'LayoutDashboard',
    permissionRoles: [UserRoles.Customer],
  },
  {
    href: '/dashboard/profile',
    label: 'Perfil',
    iconName: 'User',
    permissionRoles: [UserRoles.Customer, UserRoles.Manager, UserRoles.Seller],
  },
  {
    href: '/dashboard/profile/address',
    label: 'Endereço',
    iconName: 'MapPinHouse',
    permissionRoles: [UserRoles.Customer, UserRoles.Manager, UserRoles.Seller],
  },
]
