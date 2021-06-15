import express from 'express';
import { 
  getAllLocation,
  getAllCitiesWithLocations, 
  getAllLocationsInViewport, 
  getTopLocationsInCity, 
  getSingleLocation, 
  getAllComAndFlavOfLocation, 
  createLocation,
  updateLocation, 
  updatePricingLocation,
  deleteLocation 
} from '../controllers/locations.js';

const locationRouter = express.Router();

locationRouter.get('/', getAllLocation);
locationRouter.get('/cities-with-locations', getAllCitiesWithLocations);
locationRouter.post('/viewport', getAllLocationsInViewport);
locationRouter.post('/top-in-city', getTopLocationsInCity);
locationRouter.get('/:id', getSingleLocation);
locationRouter.get('/:id/all-comments-flavors', getAllComAndFlavOfLocation);
locationRouter.post('/', createLocation);
locationRouter.put('/:id', updateLocation);
locationRouter.put('/pricing/:id', updatePricingLocation);
// locationRouter.delete('/:id', deleteLocation);

export default locationRouter;