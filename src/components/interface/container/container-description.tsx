import { ComponentProps } from 'react'

import { cn } from '@/lib/utils'

type ContainerDescritionProps = ComponentProps<'p'>

export const ContainerDescrition = ({ className, ...props }: ContainerDescritionProps) => {
  return <p className={cn('text-muted-foreground', className)} {...props} />
}
