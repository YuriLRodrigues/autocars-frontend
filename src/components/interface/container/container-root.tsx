import { ComponentProps } from 'react'

import { cn } from '@/lib/utils'

type ContainerRootProps = ComponentProps<'div'>

export const ContainerRoot = ({ className, ...props }: ContainerRootProps) => {
  return <main className={cn('pt-8 sm:pt-3', className)} {...props} />
}
