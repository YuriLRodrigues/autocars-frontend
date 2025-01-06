import { ActionResponse } from '@/@types/actions'

export const loadActions = <F, Q>(
  fn: (data: Q) => Promise<ActionResponse<F>>,
  data: Q,
): Promise<ActionResponse<F>['data']> => {
  return fn(data).then((response) => {
    if (response.error || !response.success) throw new Error(response.error)
    return response.data
  })
}
