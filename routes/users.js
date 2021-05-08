import express from 'express';
import { getAllUsers, getSingleUser, getAllInfosFromUser, removeFavLocation, addFavLocation } from '../controllers/users.js';
import verifyToken from '../middlewares/verifyToken.js';

const userRouter = express.Router();

// QUESTION: SET TO PRIVATE LATER IN HEROKU???
userRouter.get('/', getAllUsers);
userRouter.get('/:id', getSingleUser);

// Only access to these pages if verifyToken passed
userRouter.get('/:id/infos', verifyToken, getAllInfosFromUser);
userRouter.put('/:id/remove-fav-loc', verifyToken, removeFavLocation);
userRouter.put('/:id/add-fav-loc', verifyToken, addFavLocation);

export default userRouter;