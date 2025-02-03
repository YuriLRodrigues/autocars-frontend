import { redirect } from 'next/navigation'
import type React from 'react'

import { UserRoles } from '@/@types/user'
import { authToken } from '@/auth'

export default async function DashboardLayout({
  manager,
  seller,
  customer,
  children,
}: {
  manager: React.ReactNode
  seller: React.ReactNode
  customer: React.ReactNode
  children: React.ReactNode
}) {
  const auth = await authToken()
  const roles = auth?.roles || []

  if (!roles.length) {
    redirect('/login')
  }

  let content: React.ReactNode = children

  if (roles.includes(UserRoles.Manager)) {
    content = manager
  } else if (roles.includes(UserRoles.Seller)) {
    content = seller
  } else if (roles.includes(UserRoles.Customer)) {
    content = customer
  }

  return <>{content}</>
}
