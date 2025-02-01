import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Skeleton } from '@/components/ui/skeleton'
import { TableCell, TableRow as TableRowRoot } from '@/components/ui/table'

import { findAllTopSellers } from '@/http/orval-generation/routes/user-controller/user-controller'
import { formatCurrencyBRL, formatNumber } from '@/utils/format-number'

export const TableRows = async () => {
  const results = await findAllTopSellers()

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
            <AvatarImage
              src={row.profileImg || '/assets/default-user-avatar.webp'}
              className="object-cover object-center"
            />
            <AvatarFallback>AC</AvatarFallback>
          </Avatar>
          <span className="text-sm font-medium text-foreground">{row.name}</span>
        </div>
      </TableCell>
      <TableCell>{formatCurrencyBRL(row.amountSold)}</TableCell>
      <TableCell>{formatNumber(row.quantitySold)}</TableCell>
      <TableCell>
        <div className="mx-auto flex w-fit items-center gap-3"></div>
      </TableCell>
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
        <div className="mx-auto flex w-fit items-center gap-3">
          <Skeleton className="mx-auto h-5 w-20" />
        </div>
      </TableCell>
    </TableRowRoot>
  ))
}
