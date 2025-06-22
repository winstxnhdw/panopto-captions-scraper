import { object, string } from 'zod';

export const config = object({
  COOKIE: string().regex(/\.ASPXAUTH=/, {
    message: 'COOKIE must contain a valid .ASPXAUTH cookie.',
  }),
}).parse(Bun.env);
