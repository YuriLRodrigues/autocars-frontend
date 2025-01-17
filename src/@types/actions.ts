export type ActionResponse<T> = {
  success: boolean
  error?: string
  data: T | Error | null
}
