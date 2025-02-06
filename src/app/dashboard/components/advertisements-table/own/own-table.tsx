import { ReactNode } from 'react'

import { Card } from '@/components/ui/card'
import { ScrollTable } from '@/components/ui/scroll-table'
import { TableBody } from '@/components/ui/table'

import { OwnTableHeader } from './own-table-header'

type OwnTableProps = {
  children: ReactNode
}

export const OwnTable = ({ children }: OwnTableProps) => {
  return (
    <Card>
      <ScrollTable>
        <OwnTableHeader>
          <TableBody>{children}</TableBody>
        </OwnTableHeader>
      </ScrollTable>
    </Card>
  )
}
