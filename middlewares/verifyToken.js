import jwt from 'jsonwebtoken';
import { User } from '../models/Schemas.js';

const verifyToken = async (req, res, next) => {
  try {
    const { token } = req.cookies;
    if (!token) throw new Error('No access: unauthorized');
    const { _id } = jwt.verify(token, process.env.JWT_SECRET);
    const foundUser = await User.findOne({ _id });
    if (!foundUser) throw new Error('User does not exist');
    req.user = foundUser;
    next();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export default verifyToken;