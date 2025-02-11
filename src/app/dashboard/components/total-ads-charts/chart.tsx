'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart'

import { abbreviateTime } from '@/utils/abbreviate-time'
import { formatDate } from '@/utils/format-date'
import { formatDistance } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { Area, AreaChart, CartesianGrid, XAxis } from 'recharts'

const chartConfig = {
  desktop: {
    label: 'Desktop',
    color: 'hsl(var(--chart-1))',
  },
} satisfies ChartConfig

type SallesChartProps = {
  chartData: Array<{
    salePrice?: number
    updatedAt: string
    price: number
  }>
}

export function SallesChart({ chartData }: SallesChartProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Vendas</CardTitle>
        <CardDescription>Relação de vendas em um período de datas.</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="max-h-[300px] w-full">
          <AreaChart
            accessibilityLayer
            data={chartData}
            margin={{
              top: 12,
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="updatedAt"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => abbreviateTime(formatDistance(value, new Date(), { locale: ptBR }))}
              name="Data da venda: "
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="line" />}
              labelFormatter={(label) => formatDate(label)}
            />
            <Area
              dataKey={(data) => data.salePrice ?? data.price}
              type="natural"
              fill="hsl(var(--chart-1))"
              fillOpacity={0.4}
              stroke="hsl(var(--chart-3))"
              name="Preço:"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
