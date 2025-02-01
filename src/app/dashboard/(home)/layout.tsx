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
  const isManager = auth?.roles.includes(UserRoles.Manager)
  const isSeller = auth?.roles.includes(UserRoles.Seller)
  const isCustomer = auth?.roles.includes(UserRoles.Customer)

  if (isManager) return <>{manager}</>
  if (isManager && isSeller) return <>{manager}</>
  if (isSeller && !isManager) return <>{seller}</>
  if (isCustomer && !isSeller && !isManager) return <>{customer}</>

  if (!isCustomer && !isSeller && !isManager) return <>{children}</>
}
