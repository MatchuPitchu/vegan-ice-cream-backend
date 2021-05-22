// Joi data validator for JavaScript https://joi.dev/
import Joi from 'joi';

export const registerBody = Joi.object().keys({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().pattern(new RegExp('^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{6,32}$')),
  repeatPassword: Joi.string().pattern(new RegExp('^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{6,32}$')),
  home_city: { 
    city: Joi.string(),
    geo: { 
        lat: Joi.number(), 
        lng: Joi.number()
    }
  }
})

export const loginBody = Joi.object().keys({
  email: Joi.string().email().required(),
  password: Joi.string().pattern(new RegExp('^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{6,32}$'))
})

// Password regular Expression
// ^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{6,32}$
// At least one digit [0-9]
// At least one lowercase character [a-z]
// At least one uppercase character [A-Z]
// At least 6 characters in length, but no more than 32.
