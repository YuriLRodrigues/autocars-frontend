import { icons } from 'lucide-react'

export type NavbarLinksProps = {
  iconName: keyof typeof icons
  href: string
  label: string
  highlight?: boolean
  isAuthOnly?: boolean
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
    href: '/dashboard',
    label: 'Painel',
    iconName: 'LayoutDashboard',
  },
  {
    href: '/profile',
    label: 'Perfil',
    iconName: 'User',
  },
  {
    href: '/profile/address',
    label: 'Endereço',
    iconName: 'MapPinHouse',
  },
]
