import { Pagination } from '@/components/ui/pagination'

import { UserRoles } from '@/@types/user'
import { findAllUsers } from '@/http/orval-generation/routes/user-controller/user-controller'

type PaginationUsersProps = {
  limit?: number
  page?: number
  createdAt?: 'asc' | 'desc'
  name?: 'asc' | 'desc'
  role?: UserRoles
  title?: string
  status?: 'ACTIVE' | 'INACTIVE'
}

export const PaginationUsers = async (props: PaginationUsersProps) => {
  const { limit, page, createdAt, name, role, title, status } = props
  const { meta } = await findAllUsers({ limit, page, createdAt, name, role, title, status })

  if (meta.perPage > meta.totalCount) return null

  return <Pagination page={meta.page} totalCount={meta.totalCount} perPage={meta.perPage} />
}
