'use client'
import { ControllerRenderProps } from 'react-hook-form'

import { SignInSchemaProps } from '@/app/auth/sign-up/components/form/schema'
import { Icon } from '@/components/ui/icon'

import { Input } from '../../ui/input'

type InputPasswordProps = {
  field: ControllerRenderProps<SignInSchemaProps, 'password'>
  togglePasswordVisibility: () => void
  showPassword: boolean
}

export const InputPassword = (props: InputPasswordProps) => {
  const { field, showPassword, togglePasswordVisibility } = props

  return (
    <div className="relative">
      <Input type={showPassword ? 'text' : 'password'} {...field} className="pr-6" />
      <span onClick={togglePasswordVisibility} className="absolute right-3 top-0 translate-y-1/2 cursor-pointer">
        {showPassword ? <Icon name="EyeOff" className="size-5" /> : <Icon name="Eye" className="size-5" />}
      </span>
    </div>
  )
}
