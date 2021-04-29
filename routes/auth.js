import express from 'express';
import { signUp, signIn, updateUser, deleteUser, getUserInfo, approvedSession } from '../controllers/auth.js';
import verifyToken from '../middlewares/verifyToken.js';

const authRouter = express.Router();

authRouter.post('/signup', signUp);
authRouter.post('/signin', signIn);

// Only access to these pages if verifyToken passed
authRouter.put('/user/:id', verifyToken, updateUser);
authRouter.delete('/user/:id', verifyToken, deleteUser);
authRouter.get('/me', verifyToken, getUserInfo);
authRouter.get('/verify-session', verifyToken, approvedSession);

export default authRouter;