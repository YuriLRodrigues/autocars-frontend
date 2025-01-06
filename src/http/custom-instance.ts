import { envT3Oss } from '@/env.mjs'
import Axios, { AxiosError, AxiosRequestConfig } from 'axios'
import { getCookie } from 'cookies-next/client'

export const AXIOS_INSTANCE = Axios.create({ baseURL: envT3Oss.NEXT_PUBLIC_API_URL })

export const customInstance = async <T>(config: AxiosRequestConfig, options?: AxiosRequestConfig): Promise<T> => {
  const source = Axios.CancelToken.source()

  const token = getCookie('autocars.token')

  const headers = {
    ...config.headers,
    Authorization: token ? `Bearer ${token}` : undefined,
  }

  const promise = AXIOS_INSTANCE({
    ...config,
    ...options,
    headers,
    cancelToken: source.token,
  }).then(({ data }) => data)

  // @ts-ignore
  promise.cancel = () => {
    source.cancel('Query was cancelled')
  }

  return promise
}

// Definições para tipos de erro e corpo
export type ErrorType<Error> = AxiosError<Error>
export type BodyType<BodyData> = BodyData
