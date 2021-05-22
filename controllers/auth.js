import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import mongoose from 'mongoose';
import { User } from '../models/Schemas.js';

import { sendConfirmationEmail, sendResetPasswordEmail } from '../Utils/mailer.js';

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

    res.status(200).json({success: 'User created', user: createdUser });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const activateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const confirmed = true;
    await User.findOneAndUpdate(
      { _id: id },
      { confirmed },
      { new: true }
    );
    res.status(200).json({message: 'Aktivierung des Mail-Accounts erfolgreich'});
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const foundUser = await User.findOne({ email }).select('+password');
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

export const askResetPassword = async (req, res) => {
  try {
    // create random reset token
    const rand = () => Math.random().toString(36).substr(2); // remove `0.`
    const token = () => rand() + rand(); // to make it longer
    const resetToken = token();
    
    const { email } = req.body;
    const foundUser = await User.findOneAndUpdate(
      { email },
      { $set: { needs_reset: true, resetToken } }
    );

    await sendResetPasswordEmail({toUser: foundUser, resetToken })

    res.status(200).json({message: 'Reset-Mail erfolgreich verschickt'});
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const setNewPassword = async (req, res) => {
  try {
    const { resetToken, email, password, repeatPassword } = req.body;
    // hash password before saving in DB: https://www.npmjs.com/package/bcrypt
    if (password !== repeatPassword) res.status(400).json('Please check whether you have entered the same password twice')
    const hashPassword = await bcrypt.hash(password, 12);
    await User.findOneAndUpdate(
      { resetToken, email },
      { password: hashPassword },
    );
    res.status(200).json({message: 'Passwort erfolgreich erneuert'});
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