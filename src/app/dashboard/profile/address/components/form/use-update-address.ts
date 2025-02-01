/* eslint-disable react-hooks/exhaustive-deps */
import { ChangeEvent, useEffect } from 'react'
import { useForm } from 'react-hook-form'

import { updateAddress } from '@/http/orval-generation/routes/address-controller/address-controller'
import { useMe } from '@/http/orval-generation/routes/user-controller/user-controller'
import { wait } from '@/utils/wait'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'

import { UpdateAddressSchemaProps, updateAddressSchema } from './schema'

type CepProps = {
  cep: string
  logradouro: string
  complemento: string
  bairro: string
  localidade: string
  uf: string
  estado: string
  pais: string
}

export const useUpdateAddressForm = () => {
  const { data } = useMe({ query: { staleTime: 0, refetchOnMount: true } })

  const form = useForm<UpdateAddressSchemaProps>({
    resolver: zodResolver(updateAddressSchema),
    mode: 'all',
    reValidateMode: 'onChange',
    defaultValues: {
      street: data?.address?.street || '',
      city: data?.address?.city || '',
      state: data?.address?.state || '',
      neighborhood: data?.address?.neighborhood || '',
      zipCode: data?.address?.zipCode.toString() || '',
    },
  })

  useEffect(() => {
    if (data?.user) {
      form.reset({
        street: data?.address?.street || '',
        city: data?.address?.city || '',
        state: data?.address?.state || '',
        neighborhood: data?.address?.neighborhood || '',
        zipCode: data?.address?.zipCode.toString() || '',
      })
    }
  }, [data, form.reset])

  const fetchUserCEP = async (cep: ChangeEvent<HTMLInputElement>) => {
    try {
      const response = await fetch(`https://viacep.com.br/ws/${cep.target.value}/json/`)
      const cepData: CepProps = await response.json()

      form.setValue('neighborhood', cepData.bairro)
      form.setValue('city', cepData.localidade)
      form.setValue('street', cepData.logradouro)
      form.setValue('state', cepData.uf)
      toast.success(`CEP encontrado!`)
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      toast.error(`Erro ao buscar pelo CEP`)
    }
  }

  const onSubmit = async (values: UpdateAddressSchemaProps) => {
    const { city, neighborhood, state, street, zipCode } = values

    try {
      await updateAddress({ city, neighborhood, state, street, zipCode: Number(zipCode), country: 'Brasil' })

      toast.success(`Endereço atualizado`)
      await wait()
      window.location.reload()
    } catch (error) {
      const _error = error as Error
      switch (_error.message) {
        case 'Not allowed':
          toast.error('Você não possui permissão para realizar esta ação')
          break
        case 'Resource not found':
          toast.error('Algum valor de referência ao atualizar o endereço não foi encontrado')
          break
        default:
          toast.error('Erro ao atualizar o endereço', {
            action: {
              label: 'Tentar novamente',
              onClick: () => onSubmit(values),
            },
          })
      }
    }
  }

  const isAnyFieldFilled = Object.values(form.watch()).some((value) => value?.trim() !== '')

  return {
    form,
    handleSubmit: form.handleSubmit(onSubmit),
    isSubmitting: form.formState.isSubmitting,
    isAnyFieldFilled,
    fetchUserCEP,
  }
}
