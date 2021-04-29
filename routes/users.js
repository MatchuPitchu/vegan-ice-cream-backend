import express from 'express';
import { getAllUsers, getSingleUser, getAllInfosFromUser } from '../controllers/users.js';

const userRouter = express.Router();

userRouter.get('/', getAllUsers);
userRouter.get('/:id', getSingleUser);

// QUESTION: NEED TO PROTECT THIS WITH MIDDLEWARE verifyToken? OR CAN I SET SOME ROUTES LATER PRIVATE ON HEROKU?
userRouter.get('/:id/infos', getAllInfosFromUser);

export default userRouter;