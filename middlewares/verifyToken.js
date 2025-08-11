import jwt from 'jsonwebtoken'

import { User } from '../models/Schemas.js'

const verifyToken = async (req, res, next) => {
  try {
    const { token } = req.headers
    if (!token) throw new Error('No access: unauthorized')
    const { _id } = jwt.verify(token, process.env.JWT_SECRET)
    const foundUser = await User.findById({ _id })
      .populate({
        path: 'comments_list',
        populate: [
          { path: 'location_id', select: 'name' },
          { path: 'flavors_referred', select: 'name' },
        ],
      })
      .populate('favorite_locations')
      .populate('favorite_flavors')
    if (!foundUser) throw new Error('User does not exist')
    req.user = foundUser
    next()
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

export default verifyToken
