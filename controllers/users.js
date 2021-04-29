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
      .populate('comments')
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

// IS DONE BY AUTH-PROCESS
// for register process
// export const createUser = async (req, res) => {
//   try {
//     const { name, email, password } = req.body;
//     // da name schon als const existiert, I create here const userName
//     const { _id, name: userName } = await User.create({ 
//       _id: new mongoose.Types.ObjectId(),
//       name, 
//       email, 
//       password
//     })
//     res.status(201).json(_id, userName);
//   } catch(err) {
//     res.status(500).json({ error: err.message });
//   }
// };

// update user profil
// export const updateUser = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { name, email, password, favorite_locations, favorite_flavors } = req.body;
//     // findOneAndUpdate: https://docs.mongodb.com/manual/reference/method/db.collection.findOneAndUpdate/
//     const updatedUser = await User.findOneAndUpdate(
//         { _id: id },
//         { name, email, password, favorite_locations, favorite_flavors },
//         { new: true }
//       ).populate('_id', 'name', 'email', 'favorite_locations', 'favorite_flavors');
//     res.status(200).json(updatedUser);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

// user can delete his profil
// export const deleteUser = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const user = await User.findById(id);
//     if (!user) return res.status(404).json({ message: `User with id ${id} not found` });
//     await User.deleteOne({ _id: id });
//     res.json({ success: `User with id of ${id} was deleted` });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };