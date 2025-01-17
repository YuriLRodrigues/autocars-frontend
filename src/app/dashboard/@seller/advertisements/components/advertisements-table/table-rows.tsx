import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Skeleton } from '@/components/ui/skeleton'
import { TableCell, TableRow as TableRowRoot } from '@/components/ui/table'

import { SoldStatus } from '@/@types/advertisement'
import { findAllOwnAdvertisements } from '@/http/orval-generation/routes/advertisement-controller/advertisement-controller'
import { formatDate } from '@/utils/format-date'
import { formatCurrencyBRL } from '@/utils/format-number'
import { mappingAdSoldStatus } from '@/utils/mappings'

type TableRowsProps = {
  limit?: number
  page?: number
  createdAt?: 'asc' | 'desc'
  title?: string
  price?: number
  endDate?: string
  startDate?: string
  soldStatus?: SoldStatus
}

export const TableRows = async ({
  limit,
  page,
  createdAt,
  endDate,
  price,
  startDate,
  title,
  soldStatus,
}: TableRowsProps) => {
  const { results } = await findAllOwnAdvertisements({
    limit,
    page,
    createdAt,
    endDate,
    startDate,
    price: Number(price),
    title,
    soldStatus,
  })

  if (!results || results.length === 0) {
    return (
      <TableRowRoot className="*:text-center">
        <TableCell className="p-6" colSpan={7}>
          Você não publicou nenhum anúncio atualmente.
        </TableCell>
      </TableRowRoot>
    )
  }

  return results.map((row) => (
    <TableRowRoot key={row.id} className="*:text-center">
      <TableCell className="!text-left">
        <div className="flex items-center gap-2">
          <Avatar>
            <AvatarImage src={row.thumbnail} />
            <AvatarFallback>AC</AvatarFallback>
          </Avatar>
          <span className="text-sm font-medium text-foreground">{row.title}</span>
        </div>
      </TableCell>
      <TableCell>{formatDate(row.createdAt)}</TableCell>
      <TableCell>
        <div className="flex flex-col">
          <s className="text-foreground/40">{formatCurrencyBRL(row.salePrice)}</s>
          <span className="font-semibold">{formatCurrencyBRL(row.price)}</span>
        </div>
      </TableCell>
      <TableCell>{mappingAdSoldStatus[row.soldStatus]}</TableCell>
      <TableCell></TableCell>
    </TableRowRoot>
  ))
}

export const TableRowsSkeleton = () => {
  return Array.from({ length: 9 }, (_, i) => (
    <TableRowRoot key={i} className="*:mx-auto">
      <TableCell className="!text-left">
        <div className="flex items-center gap-2">
          <Avatar>
            <AvatarFallback>
              <Skeleton />
            </AvatarFallback>
          </Avatar>
          <Skeleton className="h-5 w-28" />
        </div>
      </TableCell>
      <TableCell>
        <Skeleton className="mx-auto h-5 w-28" />
      </TableCell>
      <TableCell>
        <Skeleton className="mx-auto h-5 w-28" />
      </TableCell>
      <TableCell>
        <Skeleton className="mx-auto h-5 w-28" />
      </TableCell>
      <TableCell></TableCell>
    </TableRowRoot>
  ))
}
