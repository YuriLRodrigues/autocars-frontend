import { Suspense } from 'react'

import { CustomBreadCrumb } from '../../components/ui/custom-breadcrumb'
import { Container } from '@/components/interface/container'
import { DashboardSidebar, DashboardSidebarSkeleton } from '@/components/interface/layouts/dashboard/sidebar/sidebar'
import { Separator } from '@/components/ui/separator'
import { SidebarInset, SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
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
            <CustomBreadCrumb />
          </div>
        </header>
        <Container.Root className="px-4 pt-0 sm:pt-0">{children}</Container.Root>
      </SidebarInset>
    </SidebarProvider>
  )
}
