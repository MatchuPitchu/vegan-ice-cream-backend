import express from 'express';
import { getAllLocation, getSingleLocation, createLocation, updateLocation, deleteLocation } from '../controllers/locations.js';

const locationRouter = express.Router();

locationRouter.get('/', getAllLocation);
locationRouter.get('/:id', getSingleLocation);
locationRouter.post('/', createLocation);
locationRouter.put('/:id', updateLocation);
locationRouter.delete('/:id', deleteLocation);

export default locationRouter;