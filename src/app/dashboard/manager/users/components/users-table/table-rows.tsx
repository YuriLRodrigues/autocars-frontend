import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Skeleton } from '@/components/ui/skeleton'
import { TableCell, TableRow as TableRowRoot } from '@/components/ui/table'

import { UserRoles } from '@/@types/user'
import { findAllUsers } from '@/http/orval-generation/routes/user-controller/user-controller'
import { formatDate } from '@/utils/format-date'
import { mappingUserRoles } from '@/utils/mappings'

import { DeleteUser } from './actions/delete/delete-user'
import { HandleActiveUser } from './actions/handle-active/handle-active-user'

type TableRowsProps = {
  limit?: number
  page?: number
  createdAt?: 'asc' | 'desc'
  name?: 'asc' | 'desc'
  role?: UserRoles
  title?: string
  status?: 'ACTIVE' | 'INACTIVE'
}

export const TableRows = async ({ limit, page, createdAt, name, role, title, status }: TableRowsProps) => {
  const { results } = await findAllUsers(
    {
      limit,
      page,
      createdAt,
      name,
      role,
      title,
      status,
    },
    { next: { tags: ['findAllUsers'] } },
  )

  if (!results || results.length === 0) {
    return (
      <TableRowRoot className="*:text-center">
        <TableCell className="p-6" colSpan={5}>
          Nenhum usuário encontrado.
        </TableCell>
      </TableRowRoot>
    )
  }

  return results.map((row) => {
    const userRoles = row.roles.map((role) => mappingUserRoles[role as UserRoles]).join(' & ')

    return (
      <TableRowRoot key={row.id} className="*:text-center">
        <TableCell className="!text-left">
          <div className="flex items-center gap-2">
            <Avatar>
              <AvatarImage
                src={row.avatar || '/assets/default-user-avatar.webp'}
                className="object-cover object-center"
              />
              <AvatarFallback>AC</AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <span className="text-sm font-medium text-foreground">{row.name}</span>
              <span className="text-xs text-foreground/40">{row.email}</span>
            </div>
          </div>
        </TableCell>
        <TableCell>{formatDate(row.createdAt)}</TableCell>
        <TableCell>{userRoles}</TableCell>
        <TableCell>
          {row.disabled && (
            <div className="flex items-center justify-center gap-3">
              <Badge variant="danger" className="h-3.5 w-3.5 animate-pulse rounded-full px-0 py-0" />
              <p>Inativo</p>
            </div>
          )}
          {!row.disabled && (
            <div className="flex items-center justify-center gap-3">
              <Badge variant="success" className="h-3.5 w-3.5 animate-pulse rounded-full px-0 py-0" />
              <p>Ativo</p>
            </div>
          )}
        </TableCell>
        <TableCell>
          <div className="mx-auto flex w-fit items-center gap-3">
            <DeleteUser userId={row.id} />
            <HandleActiveUser userId={row.id} isDisabled={!!row.disabled} />
          </div>
        </TableCell>
      </TableRowRoot>
    )
  })
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
          <div className="flex flex-col gap-0.5">
            <Skeleton className="h-5 w-28" />
            <Skeleton className="h-3 w-24" />
          </div>
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
        </div>
      </TableCell>
    </TableRowRoot>
  ))
}
