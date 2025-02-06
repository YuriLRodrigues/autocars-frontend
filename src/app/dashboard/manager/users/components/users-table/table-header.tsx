import { ReactNode } from 'react'

import { Table, TableHead, TableHeader as TableHeaderRoot, TableRow } from '@/components/ui/table'

type TableHeaderProps = {
  children: ReactNode
}

export const TableHeader = (props: TableHeaderProps) => {
  const { children } = props
  return (
    <Table>
      <TableHeaderRoot>
        <TableRow className="*:text-center">
          <TableHead className="!text-left">Usuário</TableHead>
          <TableHead>Data de criação</TableHead>
          <TableHead>Permissão</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Ações</TableHead>
        </TableRow>
      </TableHeaderRoot>
      {children}
    </Table>
  )
}
