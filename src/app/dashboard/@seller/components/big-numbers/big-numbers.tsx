import { ActiveAds } from './active-ads'
import { ReservedAds } from './reserved-ads'
import { TotalSales } from './total-sales'

export const BigNumbers = () => {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
      <TotalSales />
      <ActiveAds />
      <ReservedAds />
    </div>
  )
}
