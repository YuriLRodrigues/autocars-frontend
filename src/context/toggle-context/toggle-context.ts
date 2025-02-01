'use client'

import { createContext } from 'react'

export const toggleContext = createContext<{
  isOpen: boolean
  toggle: (open: boolean) => void
}>({
  isOpen: false,
  toggle: () => {},
})
