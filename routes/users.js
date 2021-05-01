import express from 'express';
import { getAllUsers, getSingleUser, getAllInfosFromUser } from '../controllers/users.js';
import verifyToken from '../middlewares/verifyToken.js';

const userRouter = express.Router();

// QUESTION: SET TO PRIVATE LATER IN HEROKU???
userRouter.get('/', getAllUsers);
userRouter.get('/:id', getSingleUser);

// Only access to these pages if verifyToken passed
userRouter.get('/:id/infos', verifyToken, getAllInfosFromUser);

export default userRouter;