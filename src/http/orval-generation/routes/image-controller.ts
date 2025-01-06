/**
 * Generated by orval v7.3.0 🍺
 * Do not edit manually.
 * Auto Cars - Backend
 * Cars seller API
 * OpenAPI spec version: 1.0.0
 */
import { useMutation, useQuery } from '@tanstack/react-query'
import type {
  DataTag,
  DefinedInitialDataOptions,
  DefinedUseQueryResult,
  MutationFunction,
  QueryFunction,
  QueryKey,
  UndefinedInitialDataOptions,
  UseMutationOptions,
  UseMutationResult,
  UseQueryOptions,
  UseQueryResult,
} from '@tanstack/react-query'

import { customInstance } from '../../custom-instance'
import type { ErrorType } from '../../custom-instance'
import type {
  DeleteImageResponseDto,
  FindAllImages200,
  FindAllImagesParams,
  FindImageMetricsResponseDto,
  SwaggerBadRequestDto,
  SwaggerNotAllowedDto,
  SwaggerResourceNotFoundDto,
  Upload,
} from '../schemas'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type SecondParameter<T extends (...args: any) => any> = Parameters<T>[1]

export const deleteImage = (id: string, options?: SecondParameter<typeof customInstance>) => {
  return customInstance<DeleteImageResponseDto>({ url: `http://localhost:3333/image/${id}`, method: 'DELETE' }, options)
}

export const getDeleteImageMutationOptions = <
  TError = ErrorType<SwaggerBadRequestDto | SwaggerNotAllowedDto | SwaggerResourceNotFoundDto>,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<Awaited<ReturnType<typeof deleteImage>>, TError, { id: string }, TContext>
  request?: SecondParameter<typeof customInstance>
}): UseMutationOptions<Awaited<ReturnType<typeof deleteImage>>, TError, { id: string }, TContext> => {
  const { mutation: mutationOptions, request: requestOptions } = options ?? {}

  const mutationFn: MutationFunction<Awaited<ReturnType<typeof deleteImage>>, { id: string }> = (props) => {
    const { id } = props ?? {}

    return deleteImage(id, requestOptions)
  }

  return { mutationFn, ...mutationOptions }
}

export type DeleteImageMutationResult = NonNullable<Awaited<ReturnType<typeof deleteImage>>>

export type DeleteImageMutationError = ErrorType<
  SwaggerBadRequestDto | SwaggerNotAllowedDto | SwaggerResourceNotFoundDto
>

export const useDeleteImage = <
  TError = ErrorType<SwaggerBadRequestDto | SwaggerNotAllowedDto | SwaggerResourceNotFoundDto>,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<Awaited<ReturnType<typeof deleteImage>>, TError, { id: string }, TContext>
  request?: SecondParameter<typeof customInstance>
}): UseMutationResult<Awaited<ReturnType<typeof deleteImage>>, TError, { id: string }, TContext> => {
  const mutationOptions = getDeleteImageMutationOptions(options)

  return useMutation(mutationOptions)
}
export const findAllImages = (
  params?: FindAllImagesParams,
  options?: SecondParameter<typeof customInstance>,
  signal?: AbortSignal,
) => {
  return customInstance<FindAllImages200>(
    { url: `http://localhost:3333/image/all`, method: 'GET', params, signal },
    options,
  )
}

export const getFindAllImagesQueryKey = (params?: FindAllImagesParams) => {
  return [`http://localhost:3333/image/all`, ...(params ? [params] : [])] as const
}

export const getFindAllImagesQueryOptions = <
  TData = Awaited<ReturnType<typeof findAllImages>>,
  TError = ErrorType<SwaggerBadRequestDto | SwaggerNotAllowedDto>,
>(
  params?: FindAllImagesParams,
  options?: {
    query?: Partial<UseQueryOptions<Awaited<ReturnType<typeof findAllImages>>, TError, TData>>
    request?: SecondParameter<typeof customInstance>
  },
) => {
  const { query: queryOptions, request: requestOptions } = options ?? {}

  const queryKey = queryOptions?.queryKey ?? getFindAllImagesQueryKey(params)

  const queryFn: QueryFunction<Awaited<ReturnType<typeof findAllImages>>> = ({ signal }) =>
    findAllImages(params, requestOptions, signal)

  return { queryKey, queryFn, ...queryOptions } as UseQueryOptions<
    Awaited<ReturnType<typeof findAllImages>>,
    TError,
    TData
  > & { queryKey: DataTag<QueryKey, TData> }
}

export type FindAllImagesQueryResult = NonNullable<Awaited<ReturnType<typeof findAllImages>>>
export type FindAllImagesQueryError = ErrorType<SwaggerBadRequestDto | SwaggerNotAllowedDto>

export function useFindAllImages<
  TData = Awaited<ReturnType<typeof findAllImages>>,
  TError = ErrorType<SwaggerBadRequestDto | SwaggerNotAllowedDto>,
>(
  params: undefined | FindAllImagesParams,
  options: {
    query: Partial<UseQueryOptions<Awaited<ReturnType<typeof findAllImages>>, TError, TData>> &
      Pick<DefinedInitialDataOptions<Awaited<ReturnType<typeof findAllImages>>, TError, TData>, 'initialData'>
    request?: SecondParameter<typeof customInstance>
  },
): DefinedUseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData> }
export function useFindAllImages<
  TData = Awaited<ReturnType<typeof findAllImages>>,
  TError = ErrorType<SwaggerBadRequestDto | SwaggerNotAllowedDto>,
>(
  params?: FindAllImagesParams,
  options?: {
    query?: Partial<UseQueryOptions<Awaited<ReturnType<typeof findAllImages>>, TError, TData>> &
      Pick<UndefinedInitialDataOptions<Awaited<ReturnType<typeof findAllImages>>, TError, TData>, 'initialData'>
    request?: SecondParameter<typeof customInstance>
  },
): UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData> }
export function useFindAllImages<
  TData = Awaited<ReturnType<typeof findAllImages>>,
  TError = ErrorType<SwaggerBadRequestDto | SwaggerNotAllowedDto>,
>(
  params?: FindAllImagesParams,
  options?: {
    query?: Partial<UseQueryOptions<Awaited<ReturnType<typeof findAllImages>>, TError, TData>>
    request?: SecondParameter<typeof customInstance>
  },
): UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData> }

export function useFindAllImages<
  TData = Awaited<ReturnType<typeof findAllImages>>,
  TError = ErrorType<SwaggerBadRequestDto | SwaggerNotAllowedDto>,
>(
  params?: FindAllImagesParams,
  options?: {
    query?: Partial<UseQueryOptions<Awaited<ReturnType<typeof findAllImages>>, TError, TData>>
    request?: SecondParameter<typeof customInstance>
  },
): UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData> } {
  const queryOptions = getFindAllImagesQueryOptions(params, options)

  const query = useQuery(queryOptions) as UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData> }

  query.queryKey = queryOptions.queryKey

  return query
}

export const findImageMetrics = (options?: SecondParameter<typeof customInstance>) => {
  return customInstance<FindImageMetricsResponseDto>(
    { url: `http://localhost:3333/image/metrics`, method: 'DELETE' },
    options,
  )
}

export const getFindImageMetricsMutationOptions = <
  TError = ErrorType<SwaggerBadRequestDto | SwaggerNotAllowedDto>,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<Awaited<ReturnType<typeof findImageMetrics>>, TError, void, TContext>
  request?: SecondParameter<typeof customInstance>
}): UseMutationOptions<Awaited<ReturnType<typeof findImageMetrics>>, TError, void, TContext> => {
  const { mutation: mutationOptions, request: requestOptions } = options ?? {}

  const mutationFn: MutationFunction<Awaited<ReturnType<typeof findImageMetrics>>, void> = () => {
    return findImageMetrics(requestOptions)
  }

  return { mutationFn, ...mutationOptions }
}

export type FindImageMetricsMutationResult = NonNullable<Awaited<ReturnType<typeof findImageMetrics>>>

export type FindImageMetricsMutationError = ErrorType<SwaggerBadRequestDto | SwaggerNotAllowedDto>

export const useFindImageMetrics = <
  TError = ErrorType<SwaggerBadRequestDto | SwaggerNotAllowedDto>,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<Awaited<ReturnType<typeof findImageMetrics>>, TError, void, TContext>
  request?: SecondParameter<typeof customInstance>
}): UseMutationResult<Awaited<ReturnType<typeof findImageMetrics>>, TError, void, TContext> => {
  const mutationOptions = getFindImageMetricsMutationOptions(options)

  return useMutation(mutationOptions)
}
export const uploadImages = (options?: SecondParameter<typeof customInstance>, signal?: AbortSignal) => {
  return customInstance<Upload[]>({ url: `http://localhost:3333/image/upload`, method: 'POST', signal }, options)
}

export const getUploadImagesMutationOptions = <
  TError = ErrorType<SwaggerBadRequestDto | SwaggerNotAllowedDto>,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<Awaited<ReturnType<typeof uploadImages>>, TError, void, TContext>
  request?: SecondParameter<typeof customInstance>
}): UseMutationOptions<Awaited<ReturnType<typeof uploadImages>>, TError, void, TContext> => {
  const { mutation: mutationOptions, request: requestOptions } = options ?? {}

  const mutationFn: MutationFunction<Awaited<ReturnType<typeof uploadImages>>, void> = () => {
    return uploadImages(requestOptions)
  }

  return { mutationFn, ...mutationOptions }
}

export type UploadImagesMutationResult = NonNullable<Awaited<ReturnType<typeof uploadImages>>>

export type UploadImagesMutationError = ErrorType<SwaggerBadRequestDto | SwaggerNotAllowedDto>

export const useUploadImages = <
  TError = ErrorType<SwaggerBadRequestDto | SwaggerNotAllowedDto>,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<Awaited<ReturnType<typeof uploadImages>>, TError, void, TContext>
  request?: SecondParameter<typeof customInstance>
}): UseMutationResult<Awaited<ReturnType<typeof uploadImages>>, TError, void, TContext> => {
  const mutationOptions = getUploadImagesMutationOptions(options)

  return useMutation(mutationOptions)
}
