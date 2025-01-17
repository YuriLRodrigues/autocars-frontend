export interface FetchResponseError {
  error?: string
  status?: number
  message: Array<string> | string
}
