import express from 'express';
import { register, login, updateUser, deleteUser, approvedSession } from '../controllers/auth.js';
import { registerBody, loginBody } from '../joi/schemas.js';
import validateJoi from '../middlewares/validateJoi.js';
import verifyToken from '../middlewares/verifyToken.js';

const authRouter = express.Router();

// Data validation with Join
authRouter.post('/register', validateJoi(registerBody), register);

authRouter.post('/login', validateJoi(loginBody), login);

// Only access to these pages if verifyToken passed
authRouter.put('/user/:id', verifyToken, updateUser);
authRouter.delete('/user/:id', verifyToken, deleteUser);
authRouter.get('/verify-session', verifyToken, approvedSession);

export default authRouter;