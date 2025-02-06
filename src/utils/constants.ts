import { TokenPayload } from '@/auth'

export const AUTH_COOKIE_NAME = 'autocars-token.cookie'
export const AUTH_SESSION_NAME = 'autocars-user.session'
export const MAX_FILE_UPLOADED = 4
export const DEFAULT_TOKEN_PAYLOAD: TokenPayload = {
  email: '',
  name: '',
  avatar: '',
  roles: [],
  sub: '',
  username: '',
}
