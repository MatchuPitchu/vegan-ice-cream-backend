import express from 'express';
import { getAllUsers, getSingleUser, getAllInfosFromUser } from '../controllers/users.js';

const userRouter = express.Router();

userRouter.get('/', getAllUsers);
userRouter.get('/:id', getSingleUser);
userRouter.get('/:id/infos', getAllInfosFromUser);

export default userRouter;