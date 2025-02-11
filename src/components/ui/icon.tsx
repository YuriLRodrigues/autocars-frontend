import { memo } from 'react'

import { cn } from '@/lib/utils'
import { icons } from 'lucide-react'

export type IconProps = {
  name: keyof typeof icons
  className?: string
  strokeWidth?: number
  fill?: string
}

export const Icon = memo(({ name, className, strokeWidth, fill }: IconProps) => {
  const IconComponent = icons[name]

  if (!IconComponent) {
    return null
  }

  return <IconComponent className={cn('h-4 w-4', className)} strokeWidth={strokeWidth || 2.5} fill={fill || 'none'} />
})

Icon.displayName = 'Icon'
