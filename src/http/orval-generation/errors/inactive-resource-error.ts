import { UseCaseError } from './use-case-error'

export class InactiveResourceError extends Error implements UseCaseError {
  constructor() {
    super('Inactive resource')
    this.name = 'InactiveResourceError'
  }
}
