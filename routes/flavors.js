import express from 'express';
import { getAllFlavors, getSingleFlavor, createFlavor, updateFlavor, deleteFlavor } from '../controllers/flavors.js';

const flavorRouter = express.Router();

flavorRouter.get('/', getAllFlavors);
flavorRouter.get('/:id', getSingleFlavor);
flavorRouter.post('/:id', createFlavor);
// flavorRouter.put('/:id', updateFlavor);
flavorRouter.delete('/:id', deleteFlavor);

export default flavorRouter;