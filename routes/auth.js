import express from 'express'

import {
  activateUser,
  approvedSession,
  askResetPassword,
  login,
  register,
  setNewPassword,
} from '../controllers/auth.js'
import { loginBodySchema, registerBodySchema } from '../joi/schemas.js'
import { validate } from '../middlewares/validate.js'
import { verifyToken } from '../middlewares/verifyToken.js'

const authRouter = express.Router()

// Only access to these pages if verifyToken passed
authRouter.get('/verify-session', verifyToken, approvedSession)
// Data validation
authRouter.post('/register', validate(registerBodySchema), register)
authRouter.post('/login', validate(loginBodySchema), login)
authRouter.put('/activate/user/:id', activateUser)
authRouter.put('/reset-password', askResetPassword)
authRouter.put('/new-password', setNewPassword)

export default authRouter
