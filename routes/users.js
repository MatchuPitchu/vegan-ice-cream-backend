import express from 'express';
import { getAllUsers, getSingleUser, getAllInfosFromUser, createUser, updateUser, deleteUser } from '../controllers/users.js';

const userRouter = express.Router();

userRouter.get('/', getAllUsers);
userRouter.get('/:id', getSingleUser);
userRouter.get('/:id/infos', getAllInfosFromUser);
userRouter.post('/', createUser);
userRouter.put('/:id', updateUser);
userRouter.delete('/:id', deleteUser);

export default userRouter;