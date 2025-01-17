import { DashboardBreadCrumb } from './components/dashboard-breadcrumb'
import { Container } from '@/components/interface/container'
import { DashboardSidebar } from '@/components/interface/layouts/dashboard/sidebar/sidebar'
import { Separator } from '@/components/ui/separator'
import { SidebarInset, SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'

import { UserRoles } from '@/@types/user'
import { authToken } from '@/auth'

export default async function DashboardLayout({
  manager,
  customer,
  seller,
}: {
  manager: React.ReactNode
  seller: React.ReactNode
  customer: React.ReactNode
}) {
  const auth = await authToken()
  const isManager = auth?.roles.includes(UserRoles.Manager)
  const isSeller = auth?.roles.includes(UserRoles.Seller)
  const isCustomer = auth?.roles.includes(UserRoles.Customer)

  return (
    <SidebarProvider>
      <DashboardSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <DashboardBreadCrumb />
          </div>
        </header>
        <Container.Root className="px-4 pt-0 sm:pt-0">
          {isCustomer && customer}
          {isSeller && seller}
          {isManager && manager}
        </Container.Root>
      </SidebarInset>
    </SidebarProvider>
  )
}
