import { ReactNode } from 'react'

import { Card } from '@/components/ui/card'
import { ScrollTable } from '@/components/ui/scroll-table'
import { TableBody } from '@/components/ui/table'

import { TableHeader } from './table-header'

type TopSellersTableProps = {
  children: ReactNode
}

export const TopSellersTable = ({ children }: TopSellersTableProps) => {
  return (
    <Card>
      <ScrollTable>
        <TableHeader>
          <TableBody>{children}</TableBody>
        </TableHeader>
      </ScrollTable>
    </Card>
  )
}
