/**
 * Generated by orval v7.5.0 🍺
 * Do not edit manually.
 * Auto Cars - Backend
 * Cars seller API
 * OpenAPI spec version: 1.0.0
 */
import { useInfiniteQuery, useMutation, useQuery } from '@tanstack/react-query'
import type {
  DataTag,
  DefinedInitialDataOptions,
  DefinedUseInfiniteQueryResult,
  DefinedUseQueryResult,
  InfiniteData,
  MutationFunction,
  QueryFunction,
  QueryKey,
  UndefinedInitialDataOptions,
  UseInfiniteQueryOptions,
  UseInfiniteQueryResult,
  UseMutationOptions,
  UseMutationResult,
  UseQueryOptions,
  UseQueryResult,
} from '@tanstack/react-query'

import { customFetch } from '../../../custom-instance-fetch'
import type {
  AvatarDto,
  DeleteImageResponseDto,
  FindAllImages200,
  FindAllImagesParams,
  FindImageMetricsResponseDto,
  SwaggerBadRequestDto,
  SwaggerNotAllowedDto,
  SwaggerResourceNotFoundDto,
  Upload,
} from '../../schemas'

type SecondParameter<T extends (...args: any) => any> = Parameters<T>[1]

export const getDeleteImageUrl = (id: string) => {
  return `/image/${id}`
}

export const deleteImage = async (id: string, options?: RequestInit): Promise<DeleteImageResponseDto> => {
  return customFetch<DeleteImageResponseDto>(getDeleteImageUrl(id), {
    ...options,
    method: 'DELETE',
  })
}

export const getDeleteImageMutationOptions = <
  TError = SwaggerBadRequestDto | SwaggerNotAllowedDto | SwaggerResourceNotFoundDto,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<Awaited<ReturnType<typeof deleteImage>>, TError, { id: string }, TContext>
  request?: SecondParameter<typeof customFetch>
}): UseMutationOptions<Awaited<ReturnType<typeof deleteImage>>, TError, { id: string }, TContext> => {
  const mutationKey = ['deleteImage']
  const { mutation: mutationOptions, request: requestOptions } = options
    ? options.mutation && 'mutationKey' in options.mutation && options.mutation.mutationKey
      ? options
      : { ...options, mutation: { ...options.mutation, mutationKey } }
    : { mutation: { mutationKey }, request: undefined }

  const mutationFn: MutationFunction<Awaited<ReturnType<typeof deleteImage>>, { id: string }> = (props) => {
    const { id } = props ?? {}

    return deleteImage(id, requestOptions)
  }

  return { mutationFn, ...mutationOptions }
}

export type DeleteImageMutationResult = NonNullable<Awaited<ReturnType<typeof deleteImage>>>

export type DeleteImageMutationError = SwaggerBadRequestDto | SwaggerNotAllowedDto | SwaggerResourceNotFoundDto

export const useDeleteImage = <
  TError = SwaggerBadRequestDto | SwaggerNotAllowedDto | SwaggerResourceNotFoundDto,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<Awaited<ReturnType<typeof deleteImage>>, TError, { id: string }, TContext>
  request?: SecondParameter<typeof customFetch>
}): UseMutationResult<Awaited<ReturnType<typeof deleteImage>>, TError, { id: string }, TContext> => {
  const mutationOptions = getDeleteImageMutationOptions(options)

  return useMutation(mutationOptions)
}
export const getFindAllImagesUrl = (params?: FindAllImagesParams) => {
  const normalizedParams = new URLSearchParams()

  Object.entries(params || {}).forEach(([key, value]) => {
    if (value !== undefined) {
      normalizedParams.append(key, value === null ? 'null' : value.toString())
    }
  })

  return normalizedParams.size ? `/image/all?${normalizedParams.toString()}` : `/image/all`
}

export const findAllImages = async (params?: FindAllImagesParams, options?: RequestInit): Promise<FindAllImages200> => {
  return customFetch<FindAllImages200>(getFindAllImagesUrl(params), {
    ...options,
    method: 'GET',
  })
}

export const getFindAllImagesQueryKey = (params?: FindAllImagesParams) => {
  return [`/image/all`, ...(params ? [params] : [])] as const
}

export const getFindAllImagesInfiniteQueryOptions = <
  TData = InfiniteData<Awaited<ReturnType<typeof findAllImages>>>,
  TError = SwaggerBadRequestDto | SwaggerNotAllowedDto,
>(
  params?: FindAllImagesParams,
  options?: {
    query?: Partial<UseInfiniteQueryOptions<Awaited<ReturnType<typeof findAllImages>>, TError, TData>>
    request?: SecondParameter<typeof customFetch>
  },
) => {
  const { query: queryOptions, request: requestOptions } = options ?? {}

  const queryKey = queryOptions?.queryKey ?? getFindAllImagesQueryKey(params)

  const queryFn: QueryFunction<Awaited<ReturnType<typeof findAllImages>>> = ({ signal }) =>
    findAllImages(params, { signal, ...requestOptions })

  return { queryKey, queryFn, networkMode: 'always', ...queryOptions } as UseInfiniteQueryOptions<
    Awaited<ReturnType<typeof findAllImages>>,
    TError,
    TData
  > & { queryKey: DataTag<QueryKey, TData, TError> }
}

export type FindAllImagesInfiniteQueryResult = NonNullable<Awaited<ReturnType<typeof findAllImages>>>
export type FindAllImagesInfiniteQueryError = SwaggerBadRequestDto | SwaggerNotAllowedDto

export function useFindAllImagesInfinite<
  TData = InfiniteData<Awaited<ReturnType<typeof findAllImages>>>,
  TError = SwaggerBadRequestDto | SwaggerNotAllowedDto,
>(
  params: undefined | FindAllImagesParams,
  options: {
    query: Partial<UseInfiniteQueryOptions<Awaited<ReturnType<typeof findAllImages>>, TError, TData>> &
      Pick<
        DefinedInitialDataOptions<
          Awaited<ReturnType<typeof findAllImages>>,
          TError,
          Awaited<ReturnType<typeof findAllImages>>
        >,
        'initialData'
      >
    request?: SecondParameter<typeof customFetch>
  },
): DefinedUseInfiniteQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useFindAllImagesInfinite<
  TData = InfiniteData<Awaited<ReturnType<typeof findAllImages>>>,
  TError = SwaggerBadRequestDto | SwaggerNotAllowedDto,
>(
  params?: FindAllImagesParams,
  options?: {
    query?: Partial<UseInfiniteQueryOptions<Awaited<ReturnType<typeof findAllImages>>, TError, TData>> &
      Pick<
        UndefinedInitialDataOptions<
          Awaited<ReturnType<typeof findAllImages>>,
          TError,
          Awaited<ReturnType<typeof findAllImages>>
        >,
        'initialData'
      >
    request?: SecondParameter<typeof customFetch>
  },
): UseInfiniteQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useFindAllImagesInfinite<
  TData = InfiniteData<Awaited<ReturnType<typeof findAllImages>>>,
  TError = SwaggerBadRequestDto | SwaggerNotAllowedDto,
>(
  params?: FindAllImagesParams,
  options?: {
    query?: Partial<UseInfiniteQueryOptions<Awaited<ReturnType<typeof findAllImages>>, TError, TData>>
    request?: SecondParameter<typeof customFetch>
  },
): UseInfiniteQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }

export function useFindAllImagesInfinite<
  TData = InfiniteData<Awaited<ReturnType<typeof findAllImages>>>,
  TError = SwaggerBadRequestDto | SwaggerNotAllowedDto,
>(
  params?: FindAllImagesParams,
  options?: {
    query?: Partial<UseInfiniteQueryOptions<Awaited<ReturnType<typeof findAllImages>>, TError, TData>>
    request?: SecondParameter<typeof customFetch>
  },
): UseInfiniteQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> } {
  const queryOptions = getFindAllImagesInfiniteQueryOptions(params, options)

  const query = useInfiniteQuery(queryOptions) as UseInfiniteQueryResult<TData, TError> & {
    queryKey: DataTag<QueryKey, TData, TError>
  }

  query.queryKey = queryOptions.queryKey

  return query
}

export const getFindAllImagesQueryOptions = <
  TData = Awaited<ReturnType<typeof findAllImages>>,
  TError = SwaggerBadRequestDto | SwaggerNotAllowedDto,
>(
  params?: FindAllImagesParams,
  options?: {
    query?: Partial<UseQueryOptions<Awaited<ReturnType<typeof findAllImages>>, TError, TData>>
    request?: SecondParameter<typeof customFetch>
  },
) => {
  const { query: queryOptions, request: requestOptions } = options ?? {}

  const queryKey = queryOptions?.queryKey ?? getFindAllImagesQueryKey(params)

  const queryFn: QueryFunction<Awaited<ReturnType<typeof findAllImages>>> = ({ signal }) =>
    findAllImages(params, { signal, ...requestOptions })

  return { queryKey, queryFn, networkMode: 'always', ...queryOptions } as UseQueryOptions<
    Awaited<ReturnType<typeof findAllImages>>,
    TError,
    TData
  > & { queryKey: DataTag<QueryKey, TData, TError> }
}

export type FindAllImagesQueryResult = NonNullable<Awaited<ReturnType<typeof findAllImages>>>
export type FindAllImagesQueryError = SwaggerBadRequestDto | SwaggerNotAllowedDto

export function useFindAllImages<
  TData = Awaited<ReturnType<typeof findAllImages>>,
  TError = SwaggerBadRequestDto | SwaggerNotAllowedDto,
>(
  params: undefined | FindAllImagesParams,
  options: {
    query: Partial<UseQueryOptions<Awaited<ReturnType<typeof findAllImages>>, TError, TData>> &
      Pick<
        DefinedInitialDataOptions<
          Awaited<ReturnType<typeof findAllImages>>,
          TError,
          Awaited<ReturnType<typeof findAllImages>>
        >,
        'initialData'
      >
    request?: SecondParameter<typeof customFetch>
  },
): DefinedUseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useFindAllImages<
  TData = Awaited<ReturnType<typeof findAllImages>>,
  TError = SwaggerBadRequestDto | SwaggerNotAllowedDto,
>(
  params?: FindAllImagesParams,
  options?: {
    query?: Partial<UseQueryOptions<Awaited<ReturnType<typeof findAllImages>>, TError, TData>> &
      Pick<
        UndefinedInitialDataOptions<
          Awaited<ReturnType<typeof findAllImages>>,
          TError,
          Awaited<ReturnType<typeof findAllImages>>
        >,
        'initialData'
      >
    request?: SecondParameter<typeof customFetch>
  },
): UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useFindAllImages<
  TData = Awaited<ReturnType<typeof findAllImages>>,
  TError = SwaggerBadRequestDto | SwaggerNotAllowedDto,
>(
  params?: FindAllImagesParams,
  options?: {
    query?: Partial<UseQueryOptions<Awaited<ReturnType<typeof findAllImages>>, TError, TData>>
    request?: SecondParameter<typeof customFetch>
  },
): UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }

export function useFindAllImages<
  TData = Awaited<ReturnType<typeof findAllImages>>,
  TError = SwaggerBadRequestDto | SwaggerNotAllowedDto,
>(
  params?: FindAllImagesParams,
  options?: {
    query?: Partial<UseQueryOptions<Awaited<ReturnType<typeof findAllImages>>, TError, TData>>
    request?: SecondParameter<typeof customFetch>
  },
): UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> } {
  const queryOptions = getFindAllImagesQueryOptions(params, options)

  const query = useQuery(queryOptions) as UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }

  query.queryKey = queryOptions.queryKey

  return query
}

export const getFindImageMetricsUrl = () => {
  return `/image/metrics`
}

export const findImageMetrics = async (options?: RequestInit): Promise<FindImageMetricsResponseDto> => {
  return customFetch<FindImageMetricsResponseDto>(getFindImageMetricsUrl(), {
    ...options,
    method: 'DELETE',
  })
}

export const getFindImageMetricsMutationOptions = <
  TError = SwaggerBadRequestDto | SwaggerNotAllowedDto,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<Awaited<ReturnType<typeof findImageMetrics>>, TError, void, TContext>
  request?: SecondParameter<typeof customFetch>
}): UseMutationOptions<Awaited<ReturnType<typeof findImageMetrics>>, TError, void, TContext> => {
  const mutationKey = ['findImageMetrics']
  const { mutation: mutationOptions, request: requestOptions } = options
    ? options.mutation && 'mutationKey' in options.mutation && options.mutation.mutationKey
      ? options
      : { ...options, mutation: { ...options.mutation, mutationKey } }
    : { mutation: { mutationKey }, request: undefined }

  const mutationFn: MutationFunction<Awaited<ReturnType<typeof findImageMetrics>>, void> = () => {
    return findImageMetrics(requestOptions)
  }

  return { mutationFn, ...mutationOptions }
}

export type FindImageMetricsMutationResult = NonNullable<Awaited<ReturnType<typeof findImageMetrics>>>

export type FindImageMetricsMutationError = SwaggerBadRequestDto | SwaggerNotAllowedDto

export const useFindImageMetrics = <
  TError = SwaggerBadRequestDto | SwaggerNotAllowedDto,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<Awaited<ReturnType<typeof findImageMetrics>>, TError, void, TContext>
  request?: SecondParameter<typeof customFetch>
}): UseMutationResult<Awaited<ReturnType<typeof findImageMetrics>>, TError, void, TContext> => {
  const mutationOptions = getFindImageMetricsMutationOptions(options)

  return useMutation(mutationOptions)
}
export const getUploadImagesUrl = () => {
  return `/image/upload`
}

export const uploadImages = async (options?: RequestInit): Promise<Upload[]> => {
  return customFetch<Upload[]>(getUploadImagesUrl(), {
    ...options,
    method: 'POST',
  })
}

export const getUploadImagesMutationOptions = <
  TError = SwaggerBadRequestDto | SwaggerNotAllowedDto,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<Awaited<ReturnType<typeof uploadImages>>, TError, void, TContext>
  request?: SecondParameter<typeof customFetch>
}): UseMutationOptions<Awaited<ReturnType<typeof uploadImages>>, TError, void, TContext> => {
  const mutationKey = ['uploadImages']
  const { mutation: mutationOptions, request: requestOptions } = options
    ? options.mutation && 'mutationKey' in options.mutation && options.mutation.mutationKey
      ? options
      : { ...options, mutation: { ...options.mutation, mutationKey } }
    : { mutation: { mutationKey }, request: undefined }

  const mutationFn: MutationFunction<Awaited<ReturnType<typeof uploadImages>>, void> = () => {
    return uploadImages(requestOptions)
  }

  return { mutationFn, ...mutationOptions }
}

export type UploadImagesMutationResult = NonNullable<Awaited<ReturnType<typeof uploadImages>>>

export type UploadImagesMutationError = SwaggerBadRequestDto | SwaggerNotAllowedDto

export const useUploadImages = <TError = SwaggerBadRequestDto | SwaggerNotAllowedDto, TContext = unknown>(options?: {
  mutation?: UseMutationOptions<Awaited<ReturnType<typeof uploadImages>>, TError, void, TContext>
  request?: SecondParameter<typeof customFetch>
}): UseMutationResult<Awaited<ReturnType<typeof uploadImages>>, TError, void, TContext> => {
  const mutationOptions = getUploadImagesMutationOptions(options)

  return useMutation(mutationOptions)
}
export const getUploadAvatarUrl = () => {
  return `/image/upload/avatar`
}

export const uploadAvatar = async (options?: RequestInit): Promise<AvatarDto> => {
  return customFetch<AvatarDto>(getUploadAvatarUrl(), {
    ...options,
    method: 'POST',
  })
}

export const getUploadAvatarMutationOptions = <
  TError = SwaggerBadRequestDto | SwaggerResourceNotFoundDto,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<Awaited<ReturnType<typeof uploadAvatar>>, TError, void, TContext>
  request?: SecondParameter<typeof customFetch>
}): UseMutationOptions<Awaited<ReturnType<typeof uploadAvatar>>, TError, void, TContext> => {
  const mutationKey = ['uploadAvatar']
  const { mutation: mutationOptions, request: requestOptions } = options
    ? options.mutation && 'mutationKey' in options.mutation && options.mutation.mutationKey
      ? options
      : { ...options, mutation: { ...options.mutation, mutationKey } }
    : { mutation: { mutationKey }, request: undefined }

  const mutationFn: MutationFunction<Awaited<ReturnType<typeof uploadAvatar>>, void> = () => {
    return uploadAvatar(requestOptions)
  }

  return { mutationFn, ...mutationOptions }
}

export type UploadAvatarMutationResult = NonNullable<Awaited<ReturnType<typeof uploadAvatar>>>

export type UploadAvatarMutationError = SwaggerBadRequestDto | SwaggerResourceNotFoundDto

export const useUploadAvatar = <
  TError = SwaggerBadRequestDto | SwaggerResourceNotFoundDto,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<Awaited<ReturnType<typeof uploadAvatar>>, TError, void, TContext>
  request?: SecondParameter<typeof customFetch>
}): UseMutationResult<Awaited<ReturnType<typeof uploadAvatar>>, TError, void, TContext> => {
  const mutationOptions = getUploadAvatarMutationOptions(options)

  return useMutation(mutationOptions)
}
