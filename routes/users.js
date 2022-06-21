import express from 'express';
import {
  updateUser,
  deleteUser,
  removeFavLocation,
  addFavLocation,
  updateFavList,
  addNumLocationLastVisit,
} from '../controllers/users.js';
import verifyToken from '../middlewares/verifyToken.js';

const userRouter = express.Router();

// Only access to these pages if verifyToken passed
userRouter.put('/:id', verifyToken, updateUser);
userRouter.delete('/:id', verifyToken, deleteUser);
userRouter.put('/:id/remove-fav-loc', verifyToken, removeFavLocation);
userRouter.put('/:id/add-fav-loc', verifyToken, addFavLocation);
userRouter.put('/:id/update-fav-list', verifyToken, updateFavList);
userRouter.put('/:id/num-loc-last-visit', verifyToken, addNumLocationLastVisit);

export default userRouter;
