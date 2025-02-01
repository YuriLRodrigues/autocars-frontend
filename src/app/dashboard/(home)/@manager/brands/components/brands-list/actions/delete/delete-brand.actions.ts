'use server'

import { revalidateTag } from 'next/cache'

import { ActionResponse } from '@/@types/actions'
import { deleteBrand } from '@/http/orval-generation/routes/brand-controller/brand-controller'

type DeleteBrandActionsProps = {
  brandId: string
}

export const deleteBrandActions = async ({ brandId }: DeleteBrandActionsProps): Promise<ActionResponse<string>> => {
  try {
    const response = await deleteBrand(brandId)
    revalidateTag('findAllBrands')
    return { success: true, data: response.message }
  } catch (error) {
    return { success: false, error: (error as Error).message, data: null }
  }
}
