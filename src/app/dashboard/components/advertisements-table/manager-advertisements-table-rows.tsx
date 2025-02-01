import Image from 'next/image'
import { Fragment } from 'react'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Skeleton } from '@/components/ui/skeleton'
import { TableCell, TableRow as TableRowRoot } from '@/components/ui/table'

import { SoldStatus } from '@/@types/advertisement'
import { findAllManagerAdvertisements } from '@/http/orval-generation/routes/advertisement-controller/advertisement-controller'
import { formatDate } from '@/utils/format-date'
import { formatCurrencyBRL } from '@/utils/format-number'
import { mappingAdSoldStatus } from '@/utils/mappings'

import { DeleteAdvertisement } from './actions/delete/delete-advertisement'

type ManagerTableRowsProps = {
  limit?: number
  page?: number
  createdAt?: 'asc' | 'desc'
  title?: string
  price?: number
  endDate?: string
  startDate?: string
  soldStatus?: SoldStatus
  brandId?: string
}

export const ManagerAdvertisementsTableRows = async ({
  limit,
  page,
  createdAt,
  endDate,
  price,
  startDate,
  title,
  soldStatus,
  brandId,
}: ManagerTableRowsProps) => {
  const { results } = await findAllManagerAdvertisements(
    {
      limit,
      page,
      createdAt,
      endDate,
      startDate,
      price: Number(price),
      title,
      soldStatus,
      brandId,
    },
    {
      next: {
        tags: ['findAllManagerAdvertisements'],
      },
    },
  )

  if (!results || results.length === 0) {
    return (
      <TableRowRoot className="*:text-center">
        <TableCell className="p-6" colSpan={7}>
          Nenhum anúncio foi publicado ainda.
        </TableCell>
      </TableRowRoot>
    )
  }

  return results.map((row) => (
    <TableRowRoot key={row.id} className="*:text-center">
      <TableCell className="!text-left">
        <div className="flex items-center gap-2">
          <Avatar>
            <AvatarImage src={row.thumbnailUrl} className="object-cover object-center" />
            <AvatarFallback>AC</AvatarFallback>
          </Avatar>
          <span className="text-sm font-medium text-foreground">{row.title}</span>
        </div>
      </TableCell>
      <TableCell>
        <span className="mx-auto flex w-fit flex-row items-center gap-3">
          <Image
            src={row.brand.logoUrl}
            alt={`logo-${row.brand.name}`}
            width={100}
            height={100}
            className="size-7 rounded-full object-cover object-center"
          />
          <span>{row.brand.name}</span>
        </span>
      </TableCell>
      <TableCell>{formatDate(row.createdAt)}</TableCell>
      <TableCell>
        <div className="flex flex-col">
          {row.salePrice && (
            <Fragment>
              <s className="text-foreground/40">{formatCurrencyBRL(row.price)}</s>
              <span className="font-semibold">{formatCurrencyBRL(row.salePrice)}</span>
            </Fragment>
          )}
          {!row.salePrice && <span className="font-semibold">{formatCurrencyBRL(row.price)}</span>}
        </div>
      </TableCell>
      <TableCell>{mappingAdSoldStatus[row.soldStatus]}</TableCell>
      <TableCell>
        <div className="mx-auto flex w-fit items-center gap-3">
          <DeleteAdvertisement advertisementId={row.id} />
        </div>
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
        <Skeleton className="mx-auto h-5 w-28" />
      </TableCell>
      <TableCell>
        <Skeleton className="mx-auto h-5 w-28" />
      </TableCell>
      <TableCell>
        <div className="mx-auto flex w-fit items-center gap-3">
          <Skeleton className="mx-auto h-5 w-20" />
          <Skeleton className="mx-auto h-5 w-20" />
        </div>
      </TableCell>
    </TableRowRoot>
  ))
}
