import express from 'express';
import { getAllLocation, getAllLocationsInViewport, getTopLocationsInCity, getSingleLocation, getAllComAndFlavOfLocation, createLocation, updateLocation, deleteLocation } from '../controllers/locations.js';

const locationRouter = express.Router();

locationRouter.get('/', getAllLocation);
locationRouter.post('/viewport', getAllLocationsInViewport);
locationRouter.post('/top-in-city', getTopLocationsInCity);
locationRouter.get('/:id', getSingleLocation);
locationRouter.get('/:id/all-comments-flavors', getAllComAndFlavOfLocation);
locationRouter.post('/', createLocation);
locationRouter.put('/:id', updateLocation);
locationRouter.delete('/:id', deleteLocation);

export default locationRouter;