'use client'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'

import { useFindAllSoldAds } from '@/http/orval-generation/routes/advertisement-controller/advertisement-controller'

import { SallesChart } from './chart'
import { SelectMonthForm } from './form/form'

type TotalAdsChartsProps = {
  referenceDate?: number
  isManager: boolean
}

export const TotalAdsCharts = ({ referenceDate, isManager }: TotalAdsChartsProps) => {
  const { data, isLoading } = useFindAllSoldAds({ referenceDate, isManager })

  if (isLoading) return <TotalAdsChartsSkeleton />

  const results = data?.results || []

  return (
    <section className="relative">
      <SelectMonthForm />
      <SallesChart chartData={results} />
    </section>
  )
}

export const TotalAdsChartsSkeleton = () => {
  return (
    <Card>
      <CardHeader>
        <div className="space-y-2">
          <Skeleton className="h-4 w-1/4" />
          <Skeleton className="h-3 w-3/5" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex max-h-[300px] w-full flex-col items-center justify-center space-y-4">
          <Skeleton className="h-44 w-full rounded-md" />
        </div>
      </CardContent>
    </Card>
  )
}
