import jwt from 'jsonwebtoken';
import { User } from '../models/Schemas.js';

const verifyToken = async (req, res, next) => {
  try {
    // delete cookie parser; ask Julia how to store token in headers
    const { token } = req.headers;
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