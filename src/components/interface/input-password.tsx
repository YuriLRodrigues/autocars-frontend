'use client'
import { ControllerRenderProps } from 'react-hook-form'
import { Eye, EyeOff } from 'lucide-react'
import { Input } from '../ui/input'
import { SignInSchemaProps } from '@/app/auth/signIn/components/form/schema'

type InputPasswordProps = {
  field: ControllerRenderProps<SignInSchemaProps, 'password' | 'confirmPassword'>
  togglePasswordVisibility: () => void
  showPassword: boolean
}

export const InputPassword = (props: InputPasswordProps) => {
  const { field, showPassword, togglePasswordVisibility } = props

  return (
    <div className="relative">
      <Input type={showPassword ? 'text' : 'password'} {...field} />
      <span onClick={togglePasswordVisibility}>{showPassword ? <EyeOff /> : <Eye />}</span>
    </div>
  )
}
