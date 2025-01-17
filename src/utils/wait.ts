type WaitProps = {
  timer?: number
}
export const wait = async ({ timer }: WaitProps = {}) => {
  return new Promise((resolve) => setTimeout(resolve, timer || 500))
}
