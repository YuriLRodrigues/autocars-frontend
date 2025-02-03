import { ReactNode } from 'react'

import { Card } from '@/components/ui/card'
import { ScrollTable } from '@/components/ui/scroll-table'
import { TableBody } from '@/components/ui/table'

import { ManagerTableHeader } from '../manager/manager-table-header'

type OwnTableProps = {
  children: ReactNode
}

export const OwnTable = ({ children }: OwnTableProps) => {
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
