import { ReactNode } from 'react'

import { Card } from '@/components/ui/card'
import { ScrollTable } from '@/components/ui/scroll-table'
import { TableBody } from '@/components/ui/table'

import { TableHeader } from './table-hader'

type AdvertisementsTableProps = {
  children: ReactNode
}

export const AdvertisementsTable = ({ children }: AdvertisementsTableProps) => {
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
