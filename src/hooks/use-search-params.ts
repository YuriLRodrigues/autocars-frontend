import { useSearchParams as useNextSearchParams, usePathname } from 'next/navigation'
import { useCallback } from 'react'

export const useSearchParams = () => {
  const pathname = usePathname()
  const searchParams = useNextSearchParams()

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString())
      params.set(name, value)

      return params.toString()
    },
    [searchParams],
  )

  const deleteQueryString = useCallback(
    (name: string) => {
      const params = new URLSearchParams(searchParams.toString())
      params.delete(name)

      return params.toString()
    },
    [searchParams],
  )

  const getQueryString = useCallback(
    (name: string) => {
      const params = new URLSearchParams(searchParams.toString())
      return params.get(name)
    },
    [searchParams],
  )

  return {
    pathname,
    createQueryString,
    deleteQueryString,
    getQueryString,
  }
}
