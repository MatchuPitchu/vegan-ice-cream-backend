import mongoose from 'mongoose';
// import all schemas that have a reference to 'Flavor' and 
// which has to be 'informed' about creating or updating of new flavor
import { Flavor, Comment, Location, User } from '../models/Schemas.js';

export const getAllFlavors = async (req, res)=> {
    try {
        const flavors = await Flavor.find();  
        res.json(flavors);
    } catch (error) {
        res.status(500).json({ error: error.message});
    };
}
        
export const getSingleFlavor = async (req, res)=> {
    try {
        const { id } = req.params;
        const singleFlavor = await Flavor.findById(id);   
        if(!singleFlavor) return res.status(404).json({ message: `Flavor with ${id} not found>`});
        res.json(singleFlavor);
    } catch (error) {
        res.status(500).json({ error: error.message});
    };
}

export const createFlavor = async (req, res)=> {
    try {
        const { id: comment_id } = req.params;
        const {
          location_id,
          user_id,
          name,
          type_fruit,
          type_cream,
          color: {
            primary,
            secondary
          },
        } = req.body;
        const newFlavor = await Flavor.create({
            _id: new mongoose.Types.ObjectId(),
            name,
            type_fruit,
            type_cream,
            color: {
              primary,
              secondary
            },
        });
        // Update array of flavors_referred with ref "Flavor" in Comment Schema in order to inform about creation of new flavor and link flavors to this certain comment
        // findOneAndUpdate() https://mongoosejs.com/docs/tutorials/findoneandupdate.html
        // Update Operators: https://docs.mongodb.com/manual/reference/operator/update/
        const updateComment = await Comment.findOneAndUpdate(
          { _id: comment_id },
          { $addToSet: { flavors_referred: [newFlavor._id] } }
        );
        const updateUser = await User.findOneAndUpdate(
          { _id: user_id },
          { $addToSet: { favorite_flavors: [newFlavor._id] } }
        );
        const updateLocation = await Location.findOneAndUpdate(
          { _id: location_id },
          { $addToSet: { flavors_listed: [newFlavor._id] } }
        );
        res.status(201).json(newFlavor);
    } catch (error) {
        res.status(500).json({ error: error.message});
    };
}

// ** Deactivated in flavorsRouter ** 
// because when user add a new flavor, than flavor can be choosen by others and so updating would causing confusion
export const updateFlavor = async (req, res) => {
    try {
      const { id: flavor_id } = req.params;
      const { 
        name,
        type_fruit,
        type_cream,
        color: {
          primary,
          secondary
        },
      } = req.body;
      // findOneAndUpdate: https://docs.mongodb.com/manual/reference/method/db.collection.findOneAndUpdate/
      const updatedFlavor = await Flavor.findOneAndUpdate(
        { _id: flavor_id },
        { 
          name,
          type_fruit,
          type_cream,
          color: {
            primary,
            secondary
          },
        }
      )
      res.json(updatedFlavor);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  // admin can only delete his added flavor
  export const deleteFlavor = async (req, res) => {
    try {
      const { id } = req.params;
      const singleFlavor = await Flavor.findById(id);   
      if(!singleFlavor) return res.status(404).json({ message: `Flavor with ${id} not found>`});
      await Flavor.deleteOne({ _id: id });
      res.json({ success: `Flavor with id of ${id} was deleted` });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };