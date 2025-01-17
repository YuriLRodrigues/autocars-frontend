import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Icon } from '@/components/ui/icon'
import { Skeleton } from '@/components/ui/skeleton'

import { poppinsFont } from '@/app/layout'
import { findAdvertisementsMetricsByUserId } from '@/http/orval-generation/routes/advertisement-controller/advertisement-controller'
import { formatNumber } from '@/utils/format-number'

export const TotalSales = async () => {
  const { soldAdvertisements } = await findAdvertisementsMetricsByUserId()

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-lg font-semibold">Total Vendas</CardTitle>
        <Icon name="ShoppingCart" className="size-5" />
      </CardHeader>
      <CardContent>
        <span className={`${poppinsFont.className}`}>{`${formatNumber(soldAdvertisements)}`}</span>
      </CardContent>
    </Card>
  )
}

export const TotalSalesSkeleton = () => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-lg font-semibold">Total Vendas</CardTitle>
        <Icon name="ShoppingCart" className="size-5" />
      </CardHeader>
      <CardContent>
        <Skeleton className="h-6 w-16" />
      </CardContent>
    </Card>
  )
}
