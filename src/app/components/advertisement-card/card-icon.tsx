import { ComponentProps, ReactNode } from 'react'

import { Icon } from '@/components/ui/icon'
import { Skeleton } from '@/components/ui/skeleton'

import { cn } from '@/lib/utils'
import { icons } from 'lucide-react'

type CardIconProps = {
  iconName: keyof typeof icons
  children: ReactNode
} & ComponentProps<'span'>

export const CardIcon = ({ children, iconName, className, ...props }: CardIconProps) => {
  return (
    <span className={cn('mx-auto flex flex-col items-center justify-center font-semibold', className)} {...props}>
      <Icon name={iconName} className="size-5 flex-none" />
      <span className="line-clamp-1">{children}</span>
    </span>
  )
}

export const CardIconSkeleton = () => {
  return (
    <div className="mx-auto flex flex-col items-center justify-center space-y-2 font-semibold">
      <Icon name="Loader" className="size-5 flex-none animate-spin" />
      <Skeleton className="h-4 w-16" />
    </div>
  )
}
