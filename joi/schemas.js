import { z } from 'zod'

/**
 * Password regular Expression
 * ^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{6,32}$
 * At least one digit [0-9]
 * At least one lowercase character [a-z]
 * At least one uppercase character [A-Z]
 * At least 6 characters in length, but no more than 32.
 */
const PASSWORD_REGEX = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{6,32}$/

export const registerBodySchema = z.object({
  name: z.string(),
  email: z.email({ error: 'Invalid email address.' }),
  password: z.string().regex(PASSWORD_REGEX, {
    error: 'Password must be 6-32 chars, include upper, lower, and number.',
  }),
  repeatPassword: z.string().regex(PASSWORD_REGEX, {
    error: 'Password must be 6-32 chars, include upper, lower, and number.',
  }),
  home_city: z.object({
    city: z.string(),
    geo: z.object({
      lat: z.number(),
      lng: z.number(),
    }),
  }),
})

export const loginBodySchema = z.object({
  email: z.email({ error: 'Invalid email address.' }),
  password: z.string().regex(PASSWORD_REGEX, {
    error: 'Password must be 6-32 chars, include upper, lower, and number.',
  }),
})
