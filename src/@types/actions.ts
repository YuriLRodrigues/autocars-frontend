export type ActionResponse<T = never> = {
  success: boolean
  error?: string
  data: T | never
}
