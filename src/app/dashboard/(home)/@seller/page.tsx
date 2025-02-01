import { Suspense } from 'react'

import { TotalAdsCharts, TotalAdsChartsSkeleton } from '../../components/total-ads-charts'
import { BigNumbers } from './components/big-numbers'
import { Container } from '@/components/interface/container'

type SellerPageProps = {
  searchParams: Promise<{ referenceDate?: number }>
}

export default async function SellerPage({ searchParams }: SellerPageProps) {
  const { referenceDate } = await searchParams

  return (
    <Container.Content>
      <Container.Header>
        <Container.Title>Dashboard</Container.Title>
      </Container.Header>
      <BigNumbers />
      <section className="space-y-3">
        <h3 className="text-xl font-semibold">Anúncios/Vendas</h3>
        <Suspense fallback={<TotalAdsChartsSkeleton />}>
          <TotalAdsCharts referenceDate={referenceDate} isManager={false} />
        </Suspense>
      </section>
    </Container.Content>
  )
}
