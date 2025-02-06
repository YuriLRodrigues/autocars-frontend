import { UserRoles } from '@/@types/user'
import { me } from '@/http/orval-generation/routes/user-controller/user-controller'

type ValidateUserAccessByRoleOutput = {
  isManager: boolean
  isSeller: boolean
  isCustomer: boolean
  isNotAuthorized: boolean
}

export const validateUserAccessByRole = async (): Promise<ValidateUserAccessByRoleOutput> => {
  const { user } = await me()
  const roles = (user.roles as UserRoles[]) || []

  return {
    isManager: roles.includes(UserRoles.Manager),
    isSeller: roles.includes(UserRoles.Seller),
    isCustomer: roles.includes(UserRoles.Customer),
    isNotAuthorized:
      !roles.includes(UserRoles.Manager) && !roles.includes(UserRoles.Seller) && !roles.includes(UserRoles.Customer),
  }
}
