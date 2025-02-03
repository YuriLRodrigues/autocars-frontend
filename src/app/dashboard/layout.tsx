import type React from 'react'
import { Suspense } from 'react'

import { DashboardBreadCrumb } from './components/dashboard-breadcrumb'
import { Container } from '@/components/interface/container'
import { DashboardSidebar, DashboardSidebarSkeleton } from '@/components/interface/layouts/dashboard/sidebar/sidebar'
import { Separator } from '@/components/ui/separator'
import { SidebarInset, SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'

import { UserRoles } from '@/@types/user'
import { authToken } from '@/auth'

export default async function DashboardLayout({
  manager,
  seller,
  customer,
  children,
}: {
  manager?: React.ReactNode
  seller?: React.ReactNode
  customer?: React.ReactNode
  children?: React.ReactNode
}) {
  const auth = await authToken()
  const roles = auth?.roles || []

  if (roles.includes(UserRoles.Manager) && manager) {
    return <DefaultDashboardSidebar>{manager}</DefaultDashboardSidebar>
  }

  if (roles.includes(UserRoles.Seller) && seller) {
    return <DefaultDashboardSidebar>{seller}</DefaultDashboardSidebar>
  }

  if (roles.includes(UserRoles.Customer) && customer) {
    return <DefaultDashboardSidebar>{customer}</DefaultDashboardSidebar>
  }

  return <>{children}</>
}

function DefaultDashboardSidebar({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <Suspense fallback={<DashboardSidebarSkeleton />}>
        <DashboardSidebar />
      </Suspense>
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <DashboardBreadCrumb />
          </div>
        </header>
        <Container.Root className="px-4 pt-0 sm:pt-0">{children}</Container.Root>
      </SidebarInset>
    </SidebarProvider>
  )
}
