import { cookies } from 'next/headers'

import { envT3Oss } from '@/env.mjs'

export enum HttpStatusCode {
  ok = 200,
  badRequest = 400,
  unauthorized = 401,
  notFound = 404,
  timeout = 408,
  conflict = 409,
  serverError = 500,
}

export type ActionResponse<T> = {
  success: boolean
  data: T | null
  error?: string
}

export type RequestProps = {
  baseURL?: string
  url: string
  headers?: Record<string, string>
  body?: unknown
  formData?: FormData
  params?: Record<string, string | number> | undefined
  cache?: RequestCache
  next?: NextFetchRequestConfig | undefined
  timeout?: number | false
}

export const customInstance = async <T>({
  url,
  method,
  params,
  data,
}: {
  url: string
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH'
  params?: Record<string, string | number> | undefined
  data?: RequestProps
}): Promise<ActionResponse<T>> => {
  let targetUrl = `${envT3Oss.NEXT_PUBLIC_API_URL}/${url}`

  if (params) {
    const searchParams = new URLSearchParams()
    Object.entries(params).forEach(([key, value]) => searchParams.append(key, value.toString()))
    targetUrl += `?${searchParams.toString()}`
  }

  const cookieStore = await cookies()
  const token = cookieStore.get('autocars.authToken')?.value

  try {
    const response = await fetch(targetUrl, {
      method,
      body: data?.formData || (data?.body ? JSON.stringify(data.body) : undefined),
      headers: {
        'Content-Type': 'application/json',
        ...(token && { Authorization: `Bearer ${token}` }),
        ...data?.headers,
      },
    })

    // if (!response.ok) {
    //   throw new Error(`HTTP Error: ${response.status} - ${HttpStatusCode[response.status] || 'Unknown Error'}`)
    // }

    const responseData = (await response.json()) as T

    return {
      success: true,
      data: responseData,
    }
  } catch (error) {
    const _error = error as Error
    return {
      success: false,
      error: (_error.cause || _error.message) as string,
      data: null,
    }
  }
}

export default customInstance
