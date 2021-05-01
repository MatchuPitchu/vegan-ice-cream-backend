// Joi data validator for JavaScript https://joi.dev/
import Joi from 'joi';

export const signUpBody = Joi.object().keys({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().pattern(new RegExp('^((?=\S*?[A-Z])(?=\S*?[a-z])(?=\S*?[0-9]).{6,})\S$')),
  repeatPassword: Joi.string().pattern(new RegExp('^((?=\S*?[A-Z])(?=\S*?[a-z])(?=\S*?[0-9]).{6,})\S$'))
})

// Password regular Expression
// '^((?=\S*?[A-Z])(?=\S*?[a-z])(?=\S*?[0-9]).{6,})\S$'
// Checks that a password has 
// a minimum of 6 characters, 
// at least 1 uppercase letter, 
// 1 lowercase letter and
// 1 number with no spaces.