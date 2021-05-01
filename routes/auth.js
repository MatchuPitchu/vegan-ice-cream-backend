import express from 'express';
import { register, login, updateUser, deleteUser, approvedSession } from '../controllers/auth.js';
import verifyToken from '../middlewares/verifyToken.js';

const authRouter = express.Router();

authRouter.post('/register', register);
authRouter.post('/login', login);

// Only access to these pages if verifyToken passed
authRouter.put('/user/:id', verifyToken, updateUser);
authRouter.delete('/user/:id', verifyToken, deleteUser);
authRouter.get('/verify-session', verifyToken, approvedSession);

export default authRouter;