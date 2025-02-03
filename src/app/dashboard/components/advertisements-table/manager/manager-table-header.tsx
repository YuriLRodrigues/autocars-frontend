import { ReactNode } from 'react'

import { Table, TableHead, TableHeader as TableHeaderRoot, TableRow } from '@/components/ui/table'

type ManagerTableHeaderProps = {
  children: ReactNode
}

export const ManagerTableHeader = (props: ManagerTableHeaderProps) => {
  const { children } = props
  return (
    <Table>
      <TableHeaderRoot>
        <TableRow className="*:text-center">
          <TableHead className="!text-left">Anúncio</TableHead>
          <TableHead>Usuário</TableHead>
          <TableHead>Marca</TableHead>
          <TableHead>Data de publicação</TableHead>
          <TableHead>Preço/Promo</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Ações</TableHead>
        </TableRow>
      </TableHeaderRoot>
      {children}
    </Table>
  )
}
