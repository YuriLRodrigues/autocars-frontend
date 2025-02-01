'use client'

import { useState } from 'react'

import { toggleContext } from '@/context/toggle-context/toggle-context'

type ToggleProviderProps = {
  children: React.ReactNode
}

export const ToggleProvider = ({ children }: ToggleProviderProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const toggle = (open: boolean) => setIsOpen(open)
  return (
    <toggleContext.Provider
      value={{
        isOpen,
        toggle,
      }}
    >
      {children}
    </toggleContext.Provider>
  )
}
