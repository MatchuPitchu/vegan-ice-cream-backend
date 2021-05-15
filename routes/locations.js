import express from 'express';
import { getAllLocation, getAllLocationsInViewport, getSingleLocation, getAllComAndFlavOfLocation, createLocation, updateLocation, deleteLocation } from '../controllers/locations.js';

const locationRouter = express.Router();

locationRouter.get('/', getAllLocation);
locationRouter.post('/viewport', getAllLocationsInViewport);
locationRouter.get('/:id', getSingleLocation);
locationRouter.get('/:id/all-comments-flavors', getAllComAndFlavOfLocation);
locationRouter.post('/', createLocation);
locationRouter.put('/:id', updateLocation);
locationRouter.delete('/:id', deleteLocation);

export default locationRouter;