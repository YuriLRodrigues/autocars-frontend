import { Suspense } from 'react'

import {
  TotalSales,
  ActiveAds,
  ActiveAdsSkeleton,
  ReservedAds,
  ReservedAdsSkeleton,
  TotalSalesSkeleton,
  TotalSellers,
  TotalSellersSkeleton,
} from './index'

export const ManagerBigNumbers = () => {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4">
      <Suspense fallback={<TotalSalesSkeleton />}>
        <TotalSales />
      </Suspense>
      <Suspense fallback={<ActiveAdsSkeleton />}>
        <ActiveAds />
      </Suspense>
      <Suspense fallback={<ReservedAdsSkeleton />}>
        <ReservedAds />
      </Suspense>
      <Suspense fallback={<TotalSellersSkeleton />}>
        <TotalSellers />
      </Suspense>
    </div>
  )
}
