import { cn } from '@/lib/utils'

import { ScrollArea, ScrollBar } from './scroll-area'

type ScrollTableProps = {
  children: React.ReactNode
  className?: string
  orientation?: 'horizontal' | 'vertical'
}

export const ScrollTable = ({ children, className, orientation = 'horizontal' }: ScrollTableProps) => {
  return (
    <div className={cn('grid', className)}>
      <ScrollArea
        className={cn('w-full whitespace-nowrap max-sm:pb-3', orientation === 'horizontal' ? 'pb-3' : 'pr-3')}
      >
        {children}
        <ScrollBar orientation={orientation} />
      </ScrollArea>
    </div>
  )
}
