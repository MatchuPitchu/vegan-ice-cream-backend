import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import mongoose from 'mongoose';
import { User } from '../models/Schemas.js';

export const signUp = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const foundUser = await User.findOne({ email });
    if (foundUser) throw new Error('Email already taken');
    // hash password before saving in DB: https://www.npmjs.com/package/bcrypt
    const hashPassword = await bcrypt.hash(password, 5);
    const { _id, name: userName } = await User.create({
      _id: new mongoose.Types.ObjectId(),
      name,
      email, 
      password: hashPassword 
    });
    const token = jwt.sign({ _id, userName }, process.env.JWT_SECRET);
    // res.cookie(name, value [, options]) http://expressjs.com/en/5x/api.html#res.cookie
    const cookieOps = {};

    // BEFORE RELEASE SET NODE_ENV TO "PRODCUTION"
    if(process.env.NODE_ENV === 'production') {
      cookieOps.secure = true
    };
    res.cookie('token', token, cookieOps).json({success: 'User created', id: _id, "user name": userName});
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const signIn = async (req, res) => {
  try {
    const { email, password } = req.body;
    const foundUser = await User.findOne({ email }).select('+password');
    if (!foundUser) throw new Error('User does not exist');
    const match = await bcrypt.compare(password, foundUser.password);
    if (!match) throw new Error('Password is incorrect');
    const token = jwt.sign(
      { _id: foundUser._id, userName: foundUser.name },
      process.env.JWT_SECRET
    );
    const cookieOps = {};

    // BEFORE RELEASE SET NODE_ENV TO "PRODCUTION"
    if (process.env.NODE_ENV === 'production') {
      cookieOps.secure = true;
    }
    res.cookie('token', token, cookieOps).json({ success: 'User signed in' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// QUESTION: ONLY ACCESS TO UPDATEUSER IF LOGGED IN AS THIS USER - HOW TO CHECK THIS???
// ANSWER VLLT: with middleware verifytoken!!!
export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, password, favorite_locations, favorite_flavors } = req.body;
    const foundUser = await User.findOne({ email });
    if (foundUser) throw new Error('Email already taken');
    const hashPassword = await bcrypt.hash(password, 5);
    // findOneAndUpdate: https://docs.mongodb.com/manual/reference/method/db.collection.findOneAndUpdate/
    const updatedUser = await User.findOneAndUpdate(
        { _id: id },
        { name, email, password: hashPassword, favorite_locations, favorite_flavors },
        { new: true }
      ).populate('_id', 'name', 'email', 'favorite_locations', 'favorite_flavors');
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// QUESTION: ONLY ACCESS TO UPDATEUSER IF LOGGED IN AS THIS USER - HOW TO CHECK THIS???
// ANSWER VLLT: with middleware verifytoken!!!
export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    if (!user) return res.status(404).json({ message: `User with id ${id} not found` });
    await User.deleteOne({ _id: id });

    // QUESTION: ALSO NEED TO DELETE COOKIE/TOKEN???

    res.json({ success: `User with id of ${id} was deleted` });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getUserInfo = async (req, res) => {
  try {
    res.send(req.user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const approvedSession = async (req, res) => {
  try {
    res.json({ success: 'Valid token' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};













// import express from 'express';
// import { signUpBody } from '../joi/schemas.js';
// // Express validator: checks content of input in forms https://express-validator.github.io/docs/
// import { signUp, signIn, getUserInfo, approvedSession } from './auth.js';
// import validateJoi from '../middlewares/validateJoi.js';
// import verifyToken from '../middlewares/verifyToken.js';
// import checkForErrors from '../middlewares/checkForErrors.js';