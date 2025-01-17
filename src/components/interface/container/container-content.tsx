import { ComponentProps } from 'react'

import { cn } from '@/lib/utils'

type ContainerContentProps = ComponentProps<'div'>

export const ContainerContent = ({ className, ...props }: ContainerContentProps) => {
  return <section className={cn('mx-auto max-w-[1920px] space-y-7 px-4 py-8', className)} {...props} />
}
