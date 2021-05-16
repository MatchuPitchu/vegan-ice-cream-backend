import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import mongoose from 'mongoose';
// import all schemas that have a reference to 'User' and
// which has to be 'informed' about creating or updating of new User
import { User, Location, Flavor } from "../models/Schemas.js";

export const getAllUsers = async (req, res) => {
  try {
    // populate(): https://mongoosejs.com/docs/populate.html
    const users = await User.find().populate('comments', 'text -_id');
    res.status(200).json(users);
  } catch(err) {
    res.status(500).json({error: err.message})
  }
}

// for personal profil of user
export const getSingleUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    if (!user) return res.status(404).json({ message: `User with id ${id} not found` });
    res.json(user);
  } catch(err) {
    res.status(500).json({ error: err.message });
  }
};

// for personal profil of user
export const getAllInfosFromUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id)
      .populate({
        path: 'comments_list',
        populate: { path: 'location_id', select: 'name' }
      })
      .populate('favorite_locations')
      .populate('favorite_flavors');
    if (!user) return res.status(404).json({ message: `User with id ${id} not found` });
    const {comments_list, favorite_locations, favorite_flavors} = user;
    const infos = {
      comments_list,
      favorite_locations,
      favorite_flavors
    }
    res.status(200).json(infos);
  } catch(err) {
    res.status(500).json({ error: err.message })
  }
};

// Only access to logged in user
export const removeFavLocation = async (req, res) => {
  try {
    const { id } = req.params;
    const { remove_location_id } = req.body;

    const { favorite_locations } = await User.findOneAndUpdate(
      { _id: id },
      { $pullAll: { favorite_locations: [remove_location_id] } },
      { new: true }
    ).populate('favorite_locations');
    res.status(201).json(favorite_locations);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const addFavLocation = async (req, res) => {
  try {
    const { id } = req.params;
    const { add_location_id } = req.body;
    const { favorite_locations } = await User.findOneAndUpdate(
      {_id: id},
      { $addToSet: { favorite_locations: [add_location_id] } }
    ).populate('favorite_locations');
    res.status(201).json(favorite_locations);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const addNumLocationLastVisit = async (req, res) => {
  try {
    const { id } = req.params;
    const { current_num_loc } = req.body;
    const { num_loc_last_visit } = await User.findOneAndUpdate(
      {_id: id},
      { $set: { num_loc_last_visit: current_num_loc } }
    );
    res.status(201).json(num_loc_last_visit);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};