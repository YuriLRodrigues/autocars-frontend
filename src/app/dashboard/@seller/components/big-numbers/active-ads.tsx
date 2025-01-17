import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Icon } from '@/components/ui/icon'
import { Skeleton } from '@/components/ui/skeleton'

import { poppinsFont } from '@/app/layout'
import { findAdvertisementsMetricsByUserId } from '@/http/orval-generation/routes/advertisement-controller/advertisement-controller'
import { formatNumber } from '@/utils/format-number'

export const ActiveAds = async () => {
  const { activesAdvertisements, totalAdvertisements } = await findAdvertisementsMetricsByUserId()

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-lg font-semibold">Anúncios ativos</CardTitle>
        <Icon name="MonitorCheck" className="size-5" />
      </CardHeader>
      <CardContent>
        <span
          className={`${poppinsFont.className}`}
        >{`${formatNumber(activesAdvertisements)}/${formatNumber(totalAdvertisements)}`}</span>
      </CardContent>
    </Card>
  )
}

export const ActiveAdsSkeleton = () => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-lg font-semibold">Anúncios ativos</CardTitle>
        <Icon name="MonitorCheck" className="size-5" />
      </CardHeader>
      <CardContent className="flex items-center gap-1">
        <Skeleton className="h-6 w-16" />
        <span>/</span>
        <Skeleton className="h-6 w-16" />
      </CardContent>
    </Card>
  )
}
