import { ReactNode } from 'react'

import { Icon } from '@/components/ui/icon'

import { icons } from 'lucide-react'

type CardIconProps = {
  iconName: keyof typeof icons
  children: ReactNode
}

export const CardIcon = ({ children, iconName }: CardIconProps) => {
  return (
    <span className="flex flex-col items-center justify-center font-semibold">
      <Icon name={iconName} className="size-5 flex-none" />
      {children}
    </span>
  )
}
