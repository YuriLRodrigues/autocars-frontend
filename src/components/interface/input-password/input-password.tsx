'use client'
import { ControllerRenderProps, FieldValues, Path } from 'react-hook-form'

import { Icon } from '@/components/ui/icon'

import { Input } from '../../ui/input'

type InputPasswordProps<T extends FieldValues> = {
  field: ControllerRenderProps<T, Path<T>>
  togglePasswordVisibility: () => void
  showPassword: boolean
}

export const InputPassword = <T extends FieldValues>(props: InputPasswordProps<T>) => {
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
