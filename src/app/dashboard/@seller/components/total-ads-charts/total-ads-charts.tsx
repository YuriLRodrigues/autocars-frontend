import { findAllSoldAds } from '@/http/orval-generation/routes/advertisement-controller/advertisement-controller'

import { SallesChart } from './chart'
import { SelectMonthForm } from './form/form'

type TotalAdsChartsProps = {
  referenceDate?: number
}

export const TotalAdsCharts = async ({ referenceDate }: TotalAdsChartsProps) => {
  const { results } = await findAllSoldAds({ referenceDate }, { next: {} })

  return (
    <section className="relative">
      <SelectMonthForm />
      <SallesChart chartData={results} />
    </section>
  )
}
