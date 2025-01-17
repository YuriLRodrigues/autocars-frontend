import { ComponentProps } from 'react'

import { cn } from '@/lib/utils'

type ContainerTitleProps = ComponentProps<'h3'>

export const ContainerTitle = ({ className, ...props }: ContainerTitleProps) => {
  return <p className={cn('text-4xl font-bold tracking-tight', className)} {...props} />
}
