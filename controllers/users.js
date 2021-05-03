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
      .populate('comments_list')
      .populate('favorite_locations')
      .populate('favorite_flavors');
    if (!user) return res.status(404).json({ message: `User with id ${id} not found` });
    const {comments, favorite_locations, favorite_flavors} = user;
    const infos = {
      comments,
      favorite_locations,
      favorite_flavors
    }
    res.json(infos);
  } catch(err) {
    res.status(500).json({ error: err.message })
  }
};