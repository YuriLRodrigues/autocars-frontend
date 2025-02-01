import { UseCaseError } from './use-case-error'

export class ResourceAlreadyExistsError extends Error implements UseCaseError {
  constructor() {
    super('Resource already exists')
    this.name = 'ResourceAlweadyExistsError'
  }
}
