import express from 'express';
import {
  getAllLocation,
  getAllCitiesWithLocations,
  getAllLocationsInViewport,
  getTopLocationsInCity,
  getSingleLocation,
  getAllComAndFlavOfLocation,
  createLocation,
  createPricingLocation,
  updateLocation,
  deleteLocation,
} from '../controllers/locations.js';
import verifyToken from '../middlewares/verifyToken.js';

const locationRouter = express.Router();

locationRouter.get('/', getAllLocation);
locationRouter.get('/cities-with-locations', getAllCitiesWithLocations);
locationRouter.post('/viewport', getAllLocationsInViewport);
locationRouter.post('/top-in-city', getTopLocationsInCity);
locationRouter.get('/:id', getSingleLocation);
locationRouter.get('/:id/all-comments-flavors', getAllComAndFlavOfLocation);
locationRouter.post('/', createLocation);
locationRouter.post('/pricing/:id', verifyToken, createPricingLocation);
// no solution implemented yet: only users (logged in) and owners can update location data
// locationRouter.put('/:id', updateLocation);
// locationRouter.delete('/:id', deleteLocation);

export default locationRouter;
