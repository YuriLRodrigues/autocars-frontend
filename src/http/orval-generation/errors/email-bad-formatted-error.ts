import { DomainError } from './domain-error'

export class EmailBadFormattedError extends Error implements DomainError {
  constructor(email: string) {
    super(`The email '${email}' is bad formatted.`)
    this.name = 'EmailBadFormattedError'
  }
}
