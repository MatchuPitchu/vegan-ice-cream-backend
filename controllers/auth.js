import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import mongoose from 'mongoose';
import { User } from '../models/Schemas.js';

import { sendConfirmationEmail } from '../mailer.js';
import { publicDir } from '../index.js';

export const register = async (req, res) => {
  try {
    //Do password validation in frontend and don't send to api
    const { name, email, password, repeatPassword } = req.body;
    const foundUser = await User.findOne({ email });
    if (foundUser) throw new Error('Email already taken');
    // hash password before saving in DB: https://www.npmjs.com/package/bcrypt
    if (password !== repeatPassword) res.status(400).json('Please check whether you have entered the same password twice')
    const hashPassword = await bcrypt.hash(password, 12);
    const createdUser = await User.create({
      _id: new mongoose.Types.ObjectId(),
      name,
      email, 
      password: hashPassword
    });

    await sendConfirmationEmail({toUser: createdUser, user_id: createdUser._id})

    // Token only when activated user and than first login
    // const token = jwt.sign(
    //   { _id: createdUser._id, email: createdUser.email }, 
    //   process.env.JWT_SECRET,
    //   { expiresIn: "7d" }
    // );
    // in frontend I receive token in json file -> there save token in localStorage
    res.status(200).json({success: 'User created', user: createdUser });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const activateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const confirmed = true;
    const activatedUser = await User.findOneAndUpdate(
      { _id: id },
      { confirmed },
      { new: true }
    );
    res.sendFile('activate-user.html', { root: publicDir })
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const foundUser = await User.findOne({ email }).select('+password');
    console.log(foundUser)
    if (!foundUser) throw new Error('This user account does not exist');
    const passwordCheck = await bcrypt.compare(password, foundUser.password);
    if (!passwordCheck) throw new Error('Password is incorrect');
    const token = jwt.sign(
      { _id: foundUser._id, email: foundUser.email },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );
    res.status(200).json({ success: 'User signed in', user: foundUser, token});
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Only access to logged in user
export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, password, favorite_locations, favorite_flavors } = req.body;
    const foundUser = await User.findOne({ email });
    if (foundUser) throw new Error('Email already taken');
    const hashPassword = await bcrypt.hash(password, 12);
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

// Only access to logged in user
export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    if (!user) return res.status(404).json({ message: `User with id ${id} not found` });
    await User.deleteOne({ _id: id });
    res.json({ success: `User with id of ${id} was deleted` });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const approvedSession = async (req, res) => {
  try {
    res.json({ success: 'Valid token', user: req.user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};