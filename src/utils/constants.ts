import { TokenPayload } from '@/auth'

export const AUTH_COOKIE_NAME = 'autocars-token.cookie'
export const AUTH_SESSION_NAME = 'autocars-user.session'
export const SIGNIN_COOKIE_MAX_AGE: number = 60 * 60 * 24 * 7
export const MAX_FILE_UPLOADED = 6
export const MAX_FILE_SIZE = 5 * 1024 * 1024
export const DEFAULT_TOKEN_PAYLOAD: TokenPayload = {
  email: '',
  name: '',
  avatar: '',
  roles: [],
  sub: '',
  username: '',
  exp: 0,
}
