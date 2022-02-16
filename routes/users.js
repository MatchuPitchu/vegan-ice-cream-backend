import express from 'express';
import {
  // getAllUsers,
  // getSingleUser,
  updateUser,
  deleteUser,
  getAllInfosFromUser,
  removeFavLocation,
  addFavLocation,
  updateFavList,
  addNumLocationLastVisit,
} from '../controllers/users.js';
import verifyToken from '../middlewares/verifyToken.js';

const userRouter = express.Router();

// GET requests are deactivated since they would be public with user data
// userRouter.get('/', getAllUsers);
// userRouter.get('/:id', getSingleUser);

// Only access to these pages if verifyToken passed
userRouter.put('/:id', verifyToken, updateUser);
userRouter.delete('/:id', verifyToken, deleteUser);
userRouter.get('/:id/infos', verifyToken, getAllInfosFromUser);
userRouter.put('/:id/remove-fav-loc', verifyToken, removeFavLocation);
userRouter.put('/:id/add-fav-loc', verifyToken, addFavLocation);
userRouter.put('/:id/update-fav-list', verifyToken, updateFavList);
userRouter.put('/:id/num-loc-last-visit', verifyToken, addNumLocationLastVisit);

export default userRouter;
