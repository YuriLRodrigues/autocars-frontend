import { useContext } from 'react'

import { toggleContext } from '@/context/toggle-context'

export const useToggle = () => {
  const context = useContext(toggleContext)
  if (!context) {
    throw new Error('useToggle must be used within a ToggleProvider')
  }

  return context
}
