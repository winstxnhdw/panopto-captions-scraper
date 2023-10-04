import { cleanEnv, str } from 'envalid'

export const config = cleanEnv(Bun.env, {
  COOKIE: str(),
})
