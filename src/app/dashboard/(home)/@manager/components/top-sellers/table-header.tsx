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
          <TableHead>Permissões</TableHead>
          <TableHead>Valor vendido</TableHead>
          <TableHead>Quantidade de anúncios</TableHead>
        </TableRow>
      </TableHeaderRoot>
      {children}
    </Table>
  )
}
