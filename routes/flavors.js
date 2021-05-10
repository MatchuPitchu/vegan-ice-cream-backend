import express from 'express';
import { getAllFlavors, getSingleFlavor, createFlavor, updateFlavor, deleteFlavor } from '../controllers/flavors.js';
import verifyToken from '../middlewares/verifyToken.js';

const flavorRouter = express.Router();

flavorRouter.get('/', getAllFlavors);
flavorRouter.get('/:id', getSingleFlavor);

// Only access to these pages if verifyToken passed
flavorRouter.post('/:id', verifyToken, createFlavor);
flavorRouter.delete('/:id', verifyToken, deleteFlavor);

export default flavorRouter;