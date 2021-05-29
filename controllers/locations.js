import mongoose from 'mongoose';
// import all schemas that have a reference to 'Location' and 
// which has to be 'informed' about creating or updating of new Location
import { Location } from '../models/Schemas.js';

export const getAllLocation = async (req, res)=> {
  const page = parseInt(req.query.page);
  const limit = parseInt(req.query.limit);
  const skipIndex = (page - 1) * limit;

  try {
    const locations = await Location.find()
      .limit(limit)
      .skip(skipIndex)
      .populate({
        path: 'flavors_listed', select: 'name color'
      })
    res.json(locations);
  } catch (error) {
    res.status(500).json({ message: error.message})
  }
}

export const getAllLocationsInViewport = async (req, res)=> {
  const limit = parseInt(req.query.limit);

  try {
    const { 
      southLat,
      westLng,
      northLat,
      eastLng
    } = req.body;
    const locations = await Location.find({ 
        "address.geo.lat": { $gt: southLat, $lt: northLat },
        "address.geo.lng": { $gt: westLng, $lt: eastLng }
      })
      .populate({
        path: 'flavors_listed', select: 'name color'
      })
      .limit(limit)
    res.json(locations);
  } catch (error) {
    res.status(500).json({ message: error.message})
  }
}

export const getTopLocationsInCity = async (req, res)=> {
  const limit = parseInt(req.query.limit);

  try {
    const { city } = req.body;
    const topLocations = await Location.find({ 
        "address.city": city,
        "location_rating_quality": { $gt: 2},
        "location_rating_vegan_offer": { $gt: 2},
      })
      .limit(limit)
      .sort({location_rating_vegan_offer: -1, location_rating_quality: -1})
      .populate({
        path: 'flavors_listed', select: 'name color'
      })
    res.json(topLocations);
  } catch (error) {
    res.status(500).json({ message: error.message})
  }
}

export const getSingleLocation = async (req, res)=> {
  try {
      const { id } = req.params;
      const singleLocation = await Location.findById(id);   
      if(!singleLocation) return res.status(404).json({ message: `Location with ${id} not found>`});
      res.json(singleLocation);
  } catch (error) {
      res.status(500).json({ error: error.message});
  };
}

export const getAllComAndFlavOfLocation = async (req, res)=> {
  try {
      const { id } = req.params;
      const singleLocation = await Location.findById(id)
        // Only return these both lists
        .populate({
          path: 'comments_list',
          populate: [{ path: 'user_id', select: 'name'}, { path: 'flavors_referred', select: 'name'}]
        })
        .populate('flavors_listed');   
      if(!singleLocation) return res.status(404).json({ message: `Location with ${id} not found>`});
      res.json(singleLocation);
  } catch (error) {
      res.status(500).json({ error: error.message});
  };
}

export const createLocation = async (req, res)=> {
    try {
        const { 
          name,
          address: {
            street,
            number,
            zipcode,
            city,
            country,
            geo: {
              lat,
              lng
            }
          },
          location_url
        } = req.body;
        const newLocation = await Location.create({
            _id: new mongoose.Types.ObjectId(),
            name,
            address: {
              street,
              number,
              zipcode,
              city,
              country,
              geo: {
                lat,
                lng
              }
            },
            location_url
        });
        res.status(201).json(newLocation);
    } catch (error) {
        res.status(500).json({ error: error.message});
    };
}

// users (logged in) and owners can update location data
export const updateLocation = async (req, res) => {
    try {
      const { id } = req.params;
      const { 
        name,
        address: {
          street,
          number,
          zipcode,
          city,
          country,
          geo: {
            lat,
            lng
          }
        },
        location_url
      } = req.body;
      // findOneAndUpdate: https://docs.mongodb.com/manual/reference/method/db.collection.findOneAndUpdate/
      const updatedLocation = await Location.findOneAndUpdate(
        { _id: id },
        { 
          name,
          address: {
            street,
            number,
            zipcode,
            city,
            country,
            geo: {
              lat,
              lng
            }
          },
          location_url
        },
        { new: true }
      )
      res.json(updatedLocation);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  // only admin can delete location
  export const deleteLocation = async (req, res) => {
    try {
      const { id } = req.params;
      const singleLocation = await Location.findById(id);   
      if(!singleLocation) return res.status(404).json({ message: `Location with ${id} not found>`});
      await Location.deleteOne({ _id: id });
      res.json({ success: `Location with id of ${id} was deleted` });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };