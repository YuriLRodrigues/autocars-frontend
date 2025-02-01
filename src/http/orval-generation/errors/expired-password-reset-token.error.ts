import { DomainError } from './domain-error'

export class ExpiredPasswordResetTokenError extends Error implements DomainError {
  constructor(token: string) {
    super(`Password reset token '${token}' is expired.`)
    this.name = 'ExpiredPasswordResetTokenError'
  }
}
