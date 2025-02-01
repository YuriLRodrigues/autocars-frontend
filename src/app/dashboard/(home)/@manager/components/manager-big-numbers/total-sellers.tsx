import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Icon } from '@/components/ui/icon'
import { Skeleton } from '@/components/ui/skeleton'

import { poppinsFont } from '@/app/layout'
import { findAdvertisementsMetrics } from '@/http/orval-generation/routes/advertisement-controller/advertisement-controller'
import { formatNumber } from '@/utils/format-number'

export const TotalSellers = async () => {
  const { totalSellers } = await findAdvertisementsMetrics()

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-lg font-semibold">Total de vendedores</CardTitle>
        <Icon name="User" className="size-5" />
      </CardHeader>
      <CardContent>
        <span className={`${poppinsFont.className}`}>{`${formatNumber(totalSellers)}`}</span>
      </CardContent>
    </Card>
  )
}

export const TotalSellersSkeleton = () => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-lg font-semibold">Total de vendedores</CardTitle>
        <Icon name="User" className="size-5" />
      </CardHeader>
      <CardContent className="flex items-center gap-1">
        <Skeleton className="h-6 w-16" />
      </CardContent>
    </Card>
  )
}
