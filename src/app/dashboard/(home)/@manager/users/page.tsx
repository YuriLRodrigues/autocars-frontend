import { Suspense } from 'react'

import { FilterUsers } from './components/filter-users'
import { InputTitleForm } from './components/filter-users/form/input-title-form'
import { PaginationUsers } from './components/pagination-users'
import { TableRows, TableRowsSkeleton, UsersTable } from './components/users-table'
import { Container } from '@/components/interface/container'

import { UserRoles } from '@/@types/user'

type UsersPageProps = {
  searchParams: Promise<{
    limit?: number
    page?: number
    createdAt?: 'asc' | 'desc'
    name?: 'asc' | 'desc'
    role?: UserRoles
    title?: string
    status?: 'ACTIVE' | 'INACTIVE'
  }>
}

export default async function UsersPage({ searchParams }: UsersPageProps) {
  const { limit, page, createdAt, name, role, status, title } = await searchParams

  return (
    <Container.Content>
      <Container.Header>
        <Container.Title>Usuários</Container.Title>
        <Container.Description>
          Aqui você pode visualizar uma listagem de todos os usuários e filtrar de acordo com seu gosto.
        </Container.Description>
      </Container.Header>

      <div className="flex flex-wrap justify-between gap-y-2 sm:flex-row sm:items-center">
        <FilterUsers />
        <InputTitleForm className="hidden sm:flex" />
      </div>

      <UsersTable>
        <Suspense fallback={<TableRowsSkeleton />}>
          <TableRows
            limit={Number(limit) || undefined}
            page={Number(page) || 1}
            createdAt={createdAt}
            name={name}
            role={role}
            status={status}
            title={title}
          />
        </Suspense>
      </UsersTable>

      <Suspense fallback={null}>
        <PaginationUsers
          limit={Number(limit) || undefined}
          page={Number(page) || 1}
          createdAt={createdAt}
          name={name}
          role={role}
          status={status}
          title={title}
        />
      </Suspense>
    </Container.Content>
  )
}
