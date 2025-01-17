import { BigNumbers } from './components/big-numbers'
import { TotalAdsCharts } from './components/total-ads-charts'
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
      <TotalAdsCharts referenceDate={referenceDate} />
    </Container.Content>
  )
}
