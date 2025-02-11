import { Suspense } from 'react'

import { TotalSales, ActiveAds, ActiveAdsSkeleton, ReservedAds, ReservedAdsSkeleton, TotalSalesSkeleton } from './index'

export const MeBigNumbers = () => {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3">
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
