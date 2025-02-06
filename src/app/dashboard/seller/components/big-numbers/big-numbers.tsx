import { Suspense } from 'react'

import { TotalSales, ActiveAds, ActiveAdsSkeleton, ReservedAds, ReservedAdsSkeleton, TotalSalesSkeleton } from './index'

export const BigNumbers = () => {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
      <Suspense fallback={<TotalSalesSkeleton />}>
        <TotalSales />
      </Suspense>
      <Suspense fallback={<ActiveAdsSkeleton />}>
        <ActiveAds />
      </Suspense>
      <Suspense fallback={<ReservedAdsSkeleton />}>
        <ReservedAds />
      </Suspense>
    </div>
  )
}
