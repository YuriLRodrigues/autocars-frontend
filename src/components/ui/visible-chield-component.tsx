import { ReactNode } from 'react'

type VisibleChieldComponentProps = {
  visible: boolean
  children: ReactNode
}

export const VisibleChieldComponent = ({ visible, children }: VisibleChieldComponentProps) => {
  if (!visible) return null
  return children
}
