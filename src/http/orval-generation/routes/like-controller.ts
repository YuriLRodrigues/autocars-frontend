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
  HandleAdvertisementLikeResponseDto,
  HandleFeedbackLikeResponseDto,
  SwaggerBadRequestDto,
  SwaggerResourceNotFoundDto,
} from '../schemas'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type SecondParameter<T extends (...args: any) => any> = Parameters<T>[1]

export const findAdIsLiked = (id: string, options?: SecondParameter<typeof customInstance>, signal?: AbortSignal) => {
  return customInstance<boolean>({ url: `http://localhost:3333/like/ad/${id}`, method: 'GET', signal }, options)
}

export const getFindAdIsLikedQueryKey = (id: string) => {
  return [`http://localhost:3333/like/ad/${id}`] as const
}

export const getFindAdIsLikedQueryOptions = <
  TData = Awaited<ReturnType<typeof findAdIsLiked>>,
  TError = ErrorType<SwaggerBadRequestDto | SwaggerResourceNotFoundDto>,
>(
  id: string,
  options?: {
    query?: Partial<UseQueryOptions<Awaited<ReturnType<typeof findAdIsLiked>>, TError, TData>>
    request?: SecondParameter<typeof customInstance>
  },
) => {
  const { query: queryOptions, request: requestOptions } = options ?? {}

  const queryKey = queryOptions?.queryKey ?? getFindAdIsLikedQueryKey(id)

  const queryFn: QueryFunction<Awaited<ReturnType<typeof findAdIsLiked>>> = ({ signal }) =>
    findAdIsLiked(id, requestOptions, signal)

  return { queryKey, queryFn, enabled: !!id, ...queryOptions } as UseQueryOptions<
    Awaited<ReturnType<typeof findAdIsLiked>>,
    TError,
    TData
  > & { queryKey: DataTag<QueryKey, TData> }
}

export type FindAdIsLikedQueryResult = NonNullable<Awaited<ReturnType<typeof findAdIsLiked>>>
export type FindAdIsLikedQueryError = ErrorType<SwaggerBadRequestDto | SwaggerResourceNotFoundDto>

export function useFindAdIsLiked<
  TData = Awaited<ReturnType<typeof findAdIsLiked>>,
  TError = ErrorType<SwaggerBadRequestDto | SwaggerResourceNotFoundDto>,
>(
  id: string,
  options: {
    query: Partial<UseQueryOptions<Awaited<ReturnType<typeof findAdIsLiked>>, TError, TData>> &
      Pick<DefinedInitialDataOptions<Awaited<ReturnType<typeof findAdIsLiked>>, TError, TData>, 'initialData'>
    request?: SecondParameter<typeof customInstance>
  },
): DefinedUseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData> }
export function useFindAdIsLiked<
  TData = Awaited<ReturnType<typeof findAdIsLiked>>,
  TError = ErrorType<SwaggerBadRequestDto | SwaggerResourceNotFoundDto>,
>(
  id: string,
  options?: {
    query?: Partial<UseQueryOptions<Awaited<ReturnType<typeof findAdIsLiked>>, TError, TData>> &
      Pick<UndefinedInitialDataOptions<Awaited<ReturnType<typeof findAdIsLiked>>, TError, TData>, 'initialData'>
    request?: SecondParameter<typeof customInstance>
  },
): UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData> }
export function useFindAdIsLiked<
  TData = Awaited<ReturnType<typeof findAdIsLiked>>,
  TError = ErrorType<SwaggerBadRequestDto | SwaggerResourceNotFoundDto>,
>(
  id: string,
  options?: {
    query?: Partial<UseQueryOptions<Awaited<ReturnType<typeof findAdIsLiked>>, TError, TData>>
    request?: SecondParameter<typeof customInstance>
  },
): UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData> }

export function useFindAdIsLiked<
  TData = Awaited<ReturnType<typeof findAdIsLiked>>,
  TError = ErrorType<SwaggerBadRequestDto | SwaggerResourceNotFoundDto>,
>(
  id: string,
  options?: {
    query?: Partial<UseQueryOptions<Awaited<ReturnType<typeof findAdIsLiked>>, TError, TData>>
    request?: SecondParameter<typeof customInstance>
  },
): UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData> } {
  const queryOptions = getFindAdIsLikedQueryOptions(id, options)

  const query = useQuery(queryOptions) as UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData> }

  query.queryKey = queryOptions.queryKey

  return query
}

export const handleAdvertisementLike = (id: string, options?: SecondParameter<typeof customInstance>) => {
  return customInstance<HandleAdvertisementLikeResponseDto>(
    { url: `http://localhost:3333/like/ad/${id}`, method: 'PATCH' },
    options,
  )
}

export const getHandleAdvertisementLikeMutationOptions = <
  TError = ErrorType<SwaggerBadRequestDto | SwaggerResourceNotFoundDto>,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<Awaited<ReturnType<typeof handleAdvertisementLike>>, TError, { id: string }, TContext>
  request?: SecondParameter<typeof customInstance>
}): UseMutationOptions<Awaited<ReturnType<typeof handleAdvertisementLike>>, TError, { id: string }, TContext> => {
  const { mutation: mutationOptions, request: requestOptions } = options ?? {}

  const mutationFn: MutationFunction<Awaited<ReturnType<typeof handleAdvertisementLike>>, { id: string }> = (props) => {
    const { id } = props ?? {}

    return handleAdvertisementLike(id, requestOptions)
  }

  return { mutationFn, ...mutationOptions }
}

export type HandleAdvertisementLikeMutationResult = NonNullable<Awaited<ReturnType<typeof handleAdvertisementLike>>>

export type HandleAdvertisementLikeMutationError = ErrorType<SwaggerBadRequestDto | SwaggerResourceNotFoundDto>

export const useHandleAdvertisementLike = <
  TError = ErrorType<SwaggerBadRequestDto | SwaggerResourceNotFoundDto>,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<Awaited<ReturnType<typeof handleAdvertisementLike>>, TError, { id: string }, TContext>
  request?: SecondParameter<typeof customInstance>
}): UseMutationResult<Awaited<ReturnType<typeof handleAdvertisementLike>>, TError, { id: string }, TContext> => {
  const mutationOptions = getHandleAdvertisementLikeMutationOptions(options)

  return useMutation(mutationOptions)
}
export const findAllAdvertisementLikes = (
  id: string,
  options?: SecondParameter<typeof customInstance>,
  signal?: AbortSignal,
) => {
  return customInstance<number>(
    { url: `http://localhost:3333/like/ad/likes-count/${id}`, method: 'GET', signal },
    options,
  )
}

export const getFindAllAdvertisementLikesQueryKey = (id: string) => {
  return [`http://localhost:3333/like/ad/likes-count/${id}`] as const
}

export const getFindAllAdvertisementLikesQueryOptions = <
  TData = Awaited<ReturnType<typeof findAllAdvertisementLikes>>,
  TError = ErrorType<SwaggerBadRequestDto | SwaggerResourceNotFoundDto>,
>(
  id: string,
  options?: {
    query?: Partial<UseQueryOptions<Awaited<ReturnType<typeof findAllAdvertisementLikes>>, TError, TData>>
    request?: SecondParameter<typeof customInstance>
  },
) => {
  const { query: queryOptions, request: requestOptions } = options ?? {}

  const queryKey = queryOptions?.queryKey ?? getFindAllAdvertisementLikesQueryKey(id)

  const queryFn: QueryFunction<Awaited<ReturnType<typeof findAllAdvertisementLikes>>> = ({ signal }) =>
    findAllAdvertisementLikes(id, requestOptions, signal)

  return { queryKey, queryFn, enabled: !!id, ...queryOptions } as UseQueryOptions<
    Awaited<ReturnType<typeof findAllAdvertisementLikes>>,
    TError,
    TData
  > & { queryKey: DataTag<QueryKey, TData> }
}

export type FindAllAdvertisementLikesQueryResult = NonNullable<Awaited<ReturnType<typeof findAllAdvertisementLikes>>>
export type FindAllAdvertisementLikesQueryError = ErrorType<SwaggerBadRequestDto | SwaggerResourceNotFoundDto>

export function useFindAllAdvertisementLikes<
  TData = Awaited<ReturnType<typeof findAllAdvertisementLikes>>,
  TError = ErrorType<SwaggerBadRequestDto | SwaggerResourceNotFoundDto>,
>(
  id: string,
  options: {
    query: Partial<UseQueryOptions<Awaited<ReturnType<typeof findAllAdvertisementLikes>>, TError, TData>> &
      Pick<
        DefinedInitialDataOptions<Awaited<ReturnType<typeof findAllAdvertisementLikes>>, TError, TData>,
        'initialData'
      >
    request?: SecondParameter<typeof customInstance>
  },
): DefinedUseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData> }
export function useFindAllAdvertisementLikes<
  TData = Awaited<ReturnType<typeof findAllAdvertisementLikes>>,
  TError = ErrorType<SwaggerBadRequestDto | SwaggerResourceNotFoundDto>,
>(
  id: string,
  options?: {
    query?: Partial<UseQueryOptions<Awaited<ReturnType<typeof findAllAdvertisementLikes>>, TError, TData>> &
      Pick<
        UndefinedInitialDataOptions<Awaited<ReturnType<typeof findAllAdvertisementLikes>>, TError, TData>,
        'initialData'
      >
    request?: SecondParameter<typeof customInstance>
  },
): UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData> }
export function useFindAllAdvertisementLikes<
  TData = Awaited<ReturnType<typeof findAllAdvertisementLikes>>,
  TError = ErrorType<SwaggerBadRequestDto | SwaggerResourceNotFoundDto>,
>(
  id: string,
  options?: {
    query?: Partial<UseQueryOptions<Awaited<ReturnType<typeof findAllAdvertisementLikes>>, TError, TData>>
    request?: SecondParameter<typeof customInstance>
  },
): UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData> }

export function useFindAllAdvertisementLikes<
  TData = Awaited<ReturnType<typeof findAllAdvertisementLikes>>,
  TError = ErrorType<SwaggerBadRequestDto | SwaggerResourceNotFoundDto>,
>(
  id: string,
  options?: {
    query?: Partial<UseQueryOptions<Awaited<ReturnType<typeof findAllAdvertisementLikes>>, TError, TData>>
    request?: SecondParameter<typeof customInstance>
  },
): UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData> } {
  const queryOptions = getFindAllAdvertisementLikesQueryOptions(id, options)

  const query = useQuery(queryOptions) as UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData> }

  query.queryKey = queryOptions.queryKey

  return query
}

export const findFeedbackIsLiked = (
  id: string,
  options?: SecondParameter<typeof customInstance>,
  signal?: AbortSignal,
) => {
  return customInstance<boolean>({ url: `http://localhost:3333/like/fb/${id}`, method: 'GET', signal }, options)
}

export const getFindFeedbackIsLikedQueryKey = (id: string) => {
  return [`http://localhost:3333/like/fb/${id}`] as const
}

export const getFindFeedbackIsLikedQueryOptions = <
  TData = Awaited<ReturnType<typeof findFeedbackIsLiked>>,
  TError = ErrorType<SwaggerBadRequestDto | SwaggerResourceNotFoundDto>,
>(
  id: string,
  options?: {
    query?: Partial<UseQueryOptions<Awaited<ReturnType<typeof findFeedbackIsLiked>>, TError, TData>>
    request?: SecondParameter<typeof customInstance>
  },
) => {
  const { query: queryOptions, request: requestOptions } = options ?? {}

  const queryKey = queryOptions?.queryKey ?? getFindFeedbackIsLikedQueryKey(id)

  const queryFn: QueryFunction<Awaited<ReturnType<typeof findFeedbackIsLiked>>> = ({ signal }) =>
    findFeedbackIsLiked(id, requestOptions, signal)

  return { queryKey, queryFn, enabled: !!id, ...queryOptions } as UseQueryOptions<
    Awaited<ReturnType<typeof findFeedbackIsLiked>>,
    TError,
    TData
  > & { queryKey: DataTag<QueryKey, TData> }
}

export type FindFeedbackIsLikedQueryResult = NonNullable<Awaited<ReturnType<typeof findFeedbackIsLiked>>>
export type FindFeedbackIsLikedQueryError = ErrorType<SwaggerBadRequestDto | SwaggerResourceNotFoundDto>

export function useFindFeedbackIsLiked<
  TData = Awaited<ReturnType<typeof findFeedbackIsLiked>>,
  TError = ErrorType<SwaggerBadRequestDto | SwaggerResourceNotFoundDto>,
>(
  id: string,
  options: {
    query: Partial<UseQueryOptions<Awaited<ReturnType<typeof findFeedbackIsLiked>>, TError, TData>> &
      Pick<DefinedInitialDataOptions<Awaited<ReturnType<typeof findFeedbackIsLiked>>, TError, TData>, 'initialData'>
    request?: SecondParameter<typeof customInstance>
  },
): DefinedUseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData> }
export function useFindFeedbackIsLiked<
  TData = Awaited<ReturnType<typeof findFeedbackIsLiked>>,
  TError = ErrorType<SwaggerBadRequestDto | SwaggerResourceNotFoundDto>,
>(
  id: string,
  options?: {
    query?: Partial<UseQueryOptions<Awaited<ReturnType<typeof findFeedbackIsLiked>>, TError, TData>> &
      Pick<UndefinedInitialDataOptions<Awaited<ReturnType<typeof findFeedbackIsLiked>>, TError, TData>, 'initialData'>
    request?: SecondParameter<typeof customInstance>
  },
): UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData> }
export function useFindFeedbackIsLiked<
  TData = Awaited<ReturnType<typeof findFeedbackIsLiked>>,
  TError = ErrorType<SwaggerBadRequestDto | SwaggerResourceNotFoundDto>,
>(
  id: string,
  options?: {
    query?: Partial<UseQueryOptions<Awaited<ReturnType<typeof findFeedbackIsLiked>>, TError, TData>>
    request?: SecondParameter<typeof customInstance>
  },
): UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData> }

export function useFindFeedbackIsLiked<
  TData = Awaited<ReturnType<typeof findFeedbackIsLiked>>,
  TError = ErrorType<SwaggerBadRequestDto | SwaggerResourceNotFoundDto>,
>(
  id: string,
  options?: {
    query?: Partial<UseQueryOptions<Awaited<ReturnType<typeof findFeedbackIsLiked>>, TError, TData>>
    request?: SecondParameter<typeof customInstance>
  },
): UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData> } {
  const queryOptions = getFindFeedbackIsLikedQueryOptions(id, options)

  const query = useQuery(queryOptions) as UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData> }

  query.queryKey = queryOptions.queryKey

  return query
}

export const handleFeedbackLike = (id: string, options?: SecondParameter<typeof customInstance>) => {
  return customInstance<HandleFeedbackLikeResponseDto>(
    { url: `http://localhost:3333/like/fb/${id}`, method: 'PATCH' },
    options,
  )
}

export const getHandleFeedbackLikeMutationOptions = <
  TError = ErrorType<SwaggerBadRequestDto | SwaggerResourceNotFoundDto>,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<Awaited<ReturnType<typeof handleFeedbackLike>>, TError, { id: string }, TContext>
  request?: SecondParameter<typeof customInstance>
}): UseMutationOptions<Awaited<ReturnType<typeof handleFeedbackLike>>, TError, { id: string }, TContext> => {
  const { mutation: mutationOptions, request: requestOptions } = options ?? {}

  const mutationFn: MutationFunction<Awaited<ReturnType<typeof handleFeedbackLike>>, { id: string }> = (props) => {
    const { id } = props ?? {}

    return handleFeedbackLike(id, requestOptions)
  }

  return { mutationFn, ...mutationOptions }
}

export type HandleFeedbackLikeMutationResult = NonNullable<Awaited<ReturnType<typeof handleFeedbackLike>>>

export type HandleFeedbackLikeMutationError = ErrorType<SwaggerBadRequestDto | SwaggerResourceNotFoundDto>

export const useHandleFeedbackLike = <
  TError = ErrorType<SwaggerBadRequestDto | SwaggerResourceNotFoundDto>,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<Awaited<ReturnType<typeof handleFeedbackLike>>, TError, { id: string }, TContext>
  request?: SecondParameter<typeof customInstance>
}): UseMutationResult<Awaited<ReturnType<typeof handleFeedbackLike>>, TError, { id: string }, TContext> => {
  const mutationOptions = getHandleFeedbackLikeMutationOptions(options)

  return useMutation(mutationOptions)
}
export const findAllFeedbackLikes = (
  id: string,
  options?: SecondParameter<typeof customInstance>,
  signal?: AbortSignal,
) => {
  return customInstance<number>(
    { url: `http://localhost:3333/like/fb/likes-count/${id}`, method: 'GET', signal },
    options,
  )
}

export const getFindAllFeedbackLikesQueryKey = (id: string) => {
  return [`http://localhost:3333/like/fb/likes-count/${id}`] as const
}

export const getFindAllFeedbackLikesQueryOptions = <
  TData = Awaited<ReturnType<typeof findAllFeedbackLikes>>,
  TError = ErrorType<SwaggerBadRequestDto | SwaggerResourceNotFoundDto>,
>(
  id: string,
  options?: {
    query?: Partial<UseQueryOptions<Awaited<ReturnType<typeof findAllFeedbackLikes>>, TError, TData>>
    request?: SecondParameter<typeof customInstance>
  },
) => {
  const { query: queryOptions, request: requestOptions } = options ?? {}

  const queryKey = queryOptions?.queryKey ?? getFindAllFeedbackLikesQueryKey(id)

  const queryFn: QueryFunction<Awaited<ReturnType<typeof findAllFeedbackLikes>>> = ({ signal }) =>
    findAllFeedbackLikes(id, requestOptions, signal)

  return { queryKey, queryFn, enabled: !!id, ...queryOptions } as UseQueryOptions<
    Awaited<ReturnType<typeof findAllFeedbackLikes>>,
    TError,
    TData
  > & { queryKey: DataTag<QueryKey, TData> }
}

export type FindAllFeedbackLikesQueryResult = NonNullable<Awaited<ReturnType<typeof findAllFeedbackLikes>>>
export type FindAllFeedbackLikesQueryError = ErrorType<SwaggerBadRequestDto | SwaggerResourceNotFoundDto>

export function useFindAllFeedbackLikes<
  TData = Awaited<ReturnType<typeof findAllFeedbackLikes>>,
  TError = ErrorType<SwaggerBadRequestDto | SwaggerResourceNotFoundDto>,
>(
  id: string,
  options: {
    query: Partial<UseQueryOptions<Awaited<ReturnType<typeof findAllFeedbackLikes>>, TError, TData>> &
      Pick<DefinedInitialDataOptions<Awaited<ReturnType<typeof findAllFeedbackLikes>>, TError, TData>, 'initialData'>
    request?: SecondParameter<typeof customInstance>
  },
): DefinedUseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData> }
export function useFindAllFeedbackLikes<
  TData = Awaited<ReturnType<typeof findAllFeedbackLikes>>,
  TError = ErrorType<SwaggerBadRequestDto | SwaggerResourceNotFoundDto>,
>(
  id: string,
  options?: {
    query?: Partial<UseQueryOptions<Awaited<ReturnType<typeof findAllFeedbackLikes>>, TError, TData>> &
      Pick<UndefinedInitialDataOptions<Awaited<ReturnType<typeof findAllFeedbackLikes>>, TError, TData>, 'initialData'>
    request?: SecondParameter<typeof customInstance>
  },
): UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData> }
export function useFindAllFeedbackLikes<
  TData = Awaited<ReturnType<typeof findAllFeedbackLikes>>,
  TError = ErrorType<SwaggerBadRequestDto | SwaggerResourceNotFoundDto>,
>(
  id: string,
  options?: {
    query?: Partial<UseQueryOptions<Awaited<ReturnType<typeof findAllFeedbackLikes>>, TError, TData>>
    request?: SecondParameter<typeof customInstance>
  },
): UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData> }

export function useFindAllFeedbackLikes<
  TData = Awaited<ReturnType<typeof findAllFeedbackLikes>>,
  TError = ErrorType<SwaggerBadRequestDto | SwaggerResourceNotFoundDto>,
>(
  id: string,
  options?: {
    query?: Partial<UseQueryOptions<Awaited<ReturnType<typeof findAllFeedbackLikes>>, TError, TData>>
    request?: SecondParameter<typeof customInstance>
  },
): UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData> } {
  const queryOptions = getFindAllFeedbackLikesQueryOptions(id, options)

  const query = useQuery(queryOptions) as UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData> }

  query.queryKey = queryOptions.queryKey

  return query
}
