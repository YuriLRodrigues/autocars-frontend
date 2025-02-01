import { Suspense } from 'react'

import { TotalAdsCharts, TotalAdsChartsSkeleton } from '../../components/total-ads-charts'
import { ManagerBigNumbers } from './components/manager-big-numbers'
import { MeBigNumbers } from './components/me-big-numbers'
import { TableRows, TableRowsSkeleton, TopSellersTable } from './components/top-sellers'
import { Container } from '@/components/interface/container'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

type ManagerPageProps = {
  searchParams: Promise<{ referenceDate?: number }>
}

export default async function ManagerPage({ searchParams }: ManagerPageProps) {
  const { referenceDate } = await searchParams

  return (
    <Container.Content>
      <Container.Header>
        <Container.Title>Dashboard</Container.Title>
        <Container.Description>
          Visualize as métricas no geral e, caso tenha anunciado algum veículo, também as suas métricas de venda.
        </Container.Description>
      </Container.Header>
      <Tabs defaultValue="manager" className="!mt-3 space-y-4">
        <TabsList>
          <TabsTrigger value="manager">Visão Geral</TabsTrigger>
          <TabsTrigger value="me">Minhas Métricas</TabsTrigger>
        </TabsList>
        <TabsContent value="manager" className="space-y-4">
          <ManagerBigNumbers />
          <section className="space-y-3">
            <h3 className="text-xl font-semibold">Anúncios/Vendas</h3>
            <Suspense fallback={<TotalAdsChartsSkeleton />}>
              <TotalAdsCharts referenceDate={referenceDate} isManager={true} />
            </Suspense>
          </section>
        </TabsContent>
        <TabsContent value="me" className="space-y-4">
          <MeBigNumbers />
          <section className="space-y-3">
            <h3 className="text-xl font-semibold">Meus Anúncios/Vendas</h3>
            <Suspense fallback={<TotalAdsChartsSkeleton />}>
              <TotalAdsCharts referenceDate={referenceDate} isManager={false} />
            </Suspense>
          </section>
        </TabsContent>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold">Top vendedores</h2>
          <TopSellersTable>
            <Suspense fallback={<TableRowsSkeleton />}>
              <TableRows />
            </Suspense>
          </TopSellersTable>
        </section>
      </Tabs>
    </Container.Content>
  )
}
