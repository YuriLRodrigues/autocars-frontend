import { UserRoles } from '@/@types/user'
import { icons } from 'lucide-react'

type DashboardLinksProps = {
  href: string
  label: string
  iconName: keyof typeof icons
  permissionRoles: UserRoles[]
}

export const dashboardLinks: DashboardLinksProps[] = [
  {
    href: '/',
    label: 'Home',
    iconName: 'House',
    permissionRoles: [UserRoles.Manager, UserRoles.Seller, UserRoles.Customer],
  },
  {
    href: '/dashboard',
    label: 'Dashboard',
    iconName: 'LayoutDashboard',
    permissionRoles: [UserRoles.Manager, UserRoles.Seller],
  },
  {
    href: '/dashboard/advertisements',
    label: 'Anúncios',
    iconName: 'BadgePercent',
    permissionRoles: [UserRoles.Manager, UserRoles.Seller],
  },
  {
    href: '/dashboard/users',
    label: 'Usuários',
    iconName: 'User',
    permissionRoles: [UserRoles.Manager],
  },
  {
    href: '/dashboard/brands',
    label: 'Marcas',
    iconName: 'Shell',
    permissionRoles: [UserRoles.Manager],
  },
  {
    href: '/dashboard/favorites',
    label: 'Favoritos',
    iconName: 'Star',
    permissionRoles: [UserRoles.Manager, UserRoles.Seller, UserRoles.Customer],
  },
  {
    href: '/dashboard/likes',
    label: 'Curtidas',
    iconName: 'Heart',
    permissionRoles: [UserRoles.Manager, UserRoles.Seller, UserRoles.Customer],
  },
]

export const dashboardProfileLinks: DashboardLinksProps[] = [
  {
    href: '/dashboard/profile',
    label: 'Perfil',
    iconName: 'User',
    permissionRoles: [UserRoles.Manager, UserRoles.Seller, UserRoles.Customer],
  },
  {
    href: '/dashboard/profile/address',
    label: 'Endereço',
    iconName: 'MapPinHouse',
    permissionRoles: [UserRoles.Manager, UserRoles.Seller, UserRoles.Customer],
  },
]
