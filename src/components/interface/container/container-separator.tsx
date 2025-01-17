import { ComponentProps } from 'react'

import { Separator } from '@/components/ui/separator'

import { cn } from '@/lib/utils'

type ContainerSeparatorProps = ComponentProps<typeof Separator>

export const ContainerSeparator = ({ className, ...props }: ContainerSeparatorProps) => {
  return <Separator className={cn('my-6', className)} {...props} />
}
