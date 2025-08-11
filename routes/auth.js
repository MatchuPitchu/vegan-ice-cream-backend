import express from 'express'

import {
  activateUser,
  approvedSession,
  askResetPassword,
  login,
  register,
  setNewPassword,
} from '../controllers/auth.js'
import { loginBody, registerBody } from '../joi/schemas.js'
import validateJoi from '../middlewares/validateJoi.js'
import verifyToken from '../middlewares/verifyToken.js'

const authRouter = express.Router()

// Only access to these pages if verifyToken passed
authRouter.get('/verify-session', verifyToken, approvedSession)
// Data validation with Joi
authRouter.post('/register', validateJoi(registerBody), register)
authRouter.post('/login', validateJoi(loginBody), login)
authRouter.put('/activate/user/:id', activateUser)
authRouter.put('/reset-password', askResetPassword)
authRouter.put('/new-password', setNewPassword)

export default authRouter
