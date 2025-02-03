import { ReactNode } from 'react'

import { Card } from '@/components/ui/card'
import { ScrollTable } from '@/components/ui/scroll-table'
import { TableBody } from '@/components/ui/table'

import { ManagerTableHeader } from './manager-table-header'

type ManagerTableProps = {
  children: ReactNode
}

export const ManagerTable = ({ children }: ManagerTableProps) => {
  return (
    <Card>
      <ScrollTable>
        <ManagerTableHeader>
          <TableBody>{children}</TableBody>
        </ManagerTableHeader>
      </ScrollTable>
    </Card>
  )
}
