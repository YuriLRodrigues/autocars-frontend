import { FetchResponseError } from '@/@types/fetch-response-error'
import { AUTH_COOKIE_NAME } from '@/utils/constants'
import { getCookie } from 'cookies-next/client'

const getBody = <T>(c: Response | Request): Promise<T> => {
  const contentType = c.headers.get('content-type')
  if (contentType?.includes('application/json')) {
    return c.json()
  }

  if (contentType?.includes('application/pdf')) {
    return c.blob() as Promise<T>
  }

  return c.text() as Promise<T>
}

const getHeaders = async (headers?: HeadersInit): Promise<HeadersInit> => {
  let authToken: string | undefined

  if (typeof window === 'undefined') {
    const { cookies } = await import('next/headers')
    const serverCookies = await cookies()
    authToken = serverCookies.get(AUTH_COOKIE_NAME)?.value
  } else {
    authToken = getCookie(AUTH_COOKIE_NAME)?.toString()
  }

  return {
    Authorization: `Bearer ${authToken || ''}`,
    'Content-Type': 'multipart/form-data',
    ...headers,
  }
}

export async function customFetch<T>(path: string, options: RequestInit): Promise<T> {
  const headers = await getHeaders(options.headers)

  const url = new URL(path)

  const request = new Request(url, {
    ...options,
    headers,
  })

  try {
    const response = await fetch(request)
    if (!response.ok) {
      const errorBody = await getBody<FetchResponseError>(response).catch(() => null)
      const error = {
        message: errorBody?.message || response.statusText,
        error: errorBody?.error || 'UnknownError',
        statusCode: response.status,
      }
      console.log({ error })

      throw error
    }

    const data = await getBody<T>(response)

    return data as T
  } catch (error) {
    const _error = error as Error
    throw new Error(_error.message)
  }
}
