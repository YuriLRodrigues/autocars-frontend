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

import { DeleteAdvertisement } from '../actions/delete'
import { EditAdvertisement } from '../actions/edit/edit-advertisement'
import { EditAdvertisementForm } from '../actions/edit/form'
import { HandleStatus } from '../actions/handle-status'

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

export const ManagerTableRows = async ({
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
        <div className="line-clamp-1 flex items-center gap-2">
          <Avatar>
            <AvatarImage src={row.thumbnailUrl} className="object-cover object-center" />
            <AvatarFallback>AC</AvatarFallback>
          </Avatar>
          <p className="max-w-60 text-nowrap text-sm font-medium text-foreground">{row.title}</p>
        </div>
      </TableCell>
      <TableCell className="!text-left">
        <div className="mx-auto flex flex-row items-center gap-3">
          <Avatar>
            <AvatarImage
              src={row.user.avatar || '/assets/default-user-avatar.webp'}
              className="object-cover object-center"
            />
            <AvatarFallback>{row.user.name[0].toUpperCase()}</AvatarFallback>
          </Avatar>
          <span className="line-clamp-1 text-sm font-medium text-foreground">{row.user.name}</span>
        </div>
      </TableCell>
      <TableCell>
        <span className="mx-auto flex flex-row items-center gap-3">
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
          <EditAdvertisement>
            <EditAdvertisementForm advertisementId={row.id} />
          </EditAdvertisement>
          <HandleStatus advertisementId={row.id} />
        </div>
      </TableCell>
    </TableRowRoot>
  ))
}

export const ManagerTableRowsSkeleton = () => {
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
      <TableCell className="!text-left">
        <div className="mr-auto flex w-fit items-center justify-center gap-2">
          <Avatar>
            <AvatarFallback>
              <Skeleton />
            </AvatarFallback>
          </Avatar>
          <Skeleton className="h-5 w-28" />
        </div>
      </TableCell>
      <TableCell className="!text-left">
        <div className="mr-auto flex w-fit items-center justify-center gap-2">
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
        <div className="mx-auto flex w-fit items-center gap-3">
          <Skeleton className="mx-auto h-5 w-20" />
          <Skeleton className="mx-auto h-5 w-20" />
          <Skeleton className="mx-auto h-5 w-20" />
        </div>
      </TableCell>
    </TableRowRoot>
  ))
}
