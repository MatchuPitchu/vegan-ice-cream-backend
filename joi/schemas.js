// Joi data validator for JavaScript https://joi.dev/
import Joi from 'joi';

export const signUpBody = Joi.object().keys({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().pattern(new RegExp('^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{6,32}$')),
  repeatPassword: Joi.string().pattern(new RegExp('^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{6,32}$'))
})

// Password regular Expression
// ^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{6,32}$
// At least one digit [0-9]
// At least one lowercase character [a-z]
// At least one uppercase character [A-Z]
// At least 6 characters in length, but no more than 32.
