import { UseCaseError } from './use-case-error'

export class InvalidCredentialsError extends Error implements UseCaseError {
  constructor() {
    super('Invalid credentials')
    this.name = 'InvalidCredentialsError'
  }
}
