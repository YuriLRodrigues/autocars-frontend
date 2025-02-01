import Image from 'next/image'
import Link from 'next/link'

import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader } from '@/components/ui/sidebar'

import { UserRoles } from '@/@types/user'
import AutoCarsLogo from '@/assets/images/autocars.svg'
import { me } from '@/http/orval-generation/routes/user-controller/user-controller'

import { SidebarMain, SidebarMainSkeleton } from './sidebar-main'
import { NavUser } from './sidebar-user'

export async function DashboardSidebar() {
  const { user } = await me()
  return (
    <Sidebar collapsible="icon" className="group/sidebar">
      <SidebarHeader>
        <Link href="/" className="flex w-full items-center justify-center gap-2 group-data-[state=collapsed]:gap-0">
          <Image
            src={AutoCarsLogo}
            alt="Auto Cars Logo"
            className="h-auto w-8 group-data-[state=collapsed]:w-6"
            width={80}
            height={80}
          />
          <span className="font-semibold text-primary group-data-[state=collapsed]:hidden">AutoCars</span>
        </Link>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMain userRoles={(user.roles as UserRoles[]) || []} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={{ avatar: user?.avatar, email: user.email, name: user.name }} />
      </SidebarFooter>
    </Sidebar>
  )
}

export const DashboardSidebarSkeleton = () => {
  return (
    <Sidebar collapsible="icon" className="group/sidebar">
      <SidebarHeader>
        <div className="flex w-full items-center justify-center gap-2 group-data-[state=collapsed]:gap-0">
          <Image
            src="/loading.svg"
            alt="Auto Cars Logo"
            className="h-auto w-8 group-data-[state=collapsed]:w-6"
            width={80}
            height={80}
          />
          <span className="font-semibold text-primary group-data-[state=collapsed]:hidden">AutoCars</span>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMainSkeleton />
      </SidebarContent>
    </Sidebar>
  )
}
