import { ComponentProps } from 'react'

import { cn } from '@/lib/utils'

type ContainerHeaderProps = ComponentProps<'div'>

export const ContainerHeader = ({ className, ...props }: ContainerHeaderProps) => {
  return <div className={cn('w-full space-y-0.5 min-[1280px]:mx-auto', className)} {...props} />
}
