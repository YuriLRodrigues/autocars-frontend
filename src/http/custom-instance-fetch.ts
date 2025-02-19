import { FetchResponseError } from '@/@types/fetch-response-error'
import { envT3Oss } from '@/env.mjs'
import { AUTH_COOKIE_NAME } from '@/utils/constants'
import { getCookie } from 'cookies-next/client'

const baseUrl = envT3Oss.NEXT_PUBLIC_API_URL

const getBody = <T>(c: Response | Request): Promise<T> => {
  const contentType = c.headers.get('content-type')
  if (contentType?.includes('application/json')) {
    return c.json()
  }

  if (contentType?.includes('application/pdf')) {
    return c.blob() as Promise<T>
  }

  if (contentType?.includes('multipart/form-data')) {
    return c.formData() as Promise<T>
  }

  return c.text() as Promise<T>
}

const getHeaders = async (headers?: HeadersInit, body?: BodyInit | undefined | null): Promise<HeadersInit> => {
  let authToken: string | undefined

  if (typeof window === 'undefined') {
    const { cookies } = await import('next/headers')
    const serverCookies = await cookies()
    authToken = serverCookies.get(AUTH_COOKIE_NAME)?.value
  } else {
    authToken = getCookie(AUTH_COOKIE_NAME)?.toString()
  }

  // Evitar sobrescrever o Content-Type para FormData
  const defaultHeaders: HeadersInit =
    body instanceof FormData
      ? { Authorization: `Bearer ${authToken || ''}` }
      : {
          Authorization: `Bearer ${authToken || ''}`,
          'Content-Type': 'application/json',
        }

  return {
    ...defaultHeaders,
    ...headers,
  }
}

export async function customFetch<T>(path: string, options: RequestInit): Promise<T> {
  const headers = await getHeaders(options.headers, options.body)

  const url = new URL(`${baseUrl}${path}`)

  const request = new Request(url, {
    ...options,
    headers,
    // cache: 'force-cache',
    // next: {
    //   revalidate: 120,
    // },
  })

  try {
    const response = await fetch(request)
    if (!response.ok) {
      const errorBody = await getBody<FetchResponseError>(response).catch(() => null)

      const error = {
        message: errorBody?.error || 'UnknownError',
        error: errorBody?.error || 'UnknownError',
        statusCode: response.status,
      }

      throw error
    }

    const data = await getBody<T>(response)

    return data as T
  } catch (error) {
    const _error = error as Error
    throw new Error(_error.message)
  }
}
