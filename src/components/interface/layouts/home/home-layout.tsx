import React from 'react'

import { Footer } from './footer'
import { Navbar } from './navbar'

type RootProps = {
  children: React.ReactNode
}

export const HomeLayout = ({ children }: RootProps) => {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  )
}
