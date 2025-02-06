'use server'

import { revalidateTag } from 'next/cache'

import { ActionResponse } from '@/@types/actions'
import { createBrand } from '@/http/orval-generation/routes/brand-controller/brand-controller'

import { CreateBrandSchemaProps } from './schema'

type CreateBrandActionsProps = {
  values: CreateBrandSchemaProps
}

export const createBrandActions = async ({ values }: CreateBrandActionsProps): Promise<ActionResponse<string>> => {
  const { logoId, name } = values
  try {
    const response = await createBrand({
      logoId,
      name,
    })
    revalidateTag('findAllBrands')
    return { success: true, data: response.message }
  } catch (error) {
    return { success: false, error: (error as Error).message, data: null }
  }
}
