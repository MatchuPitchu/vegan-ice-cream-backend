import express from 'express'

import {
  createComment,
  deleteComment,
  getAllComments,
  getSingleComment,
  updateComment,
} from '../controllers/comments.js'
import verifyToken from '../middlewares/verifyToken.js'

const commentsRouter = express.Router()

commentsRouter.get('/', getAllComments)
commentsRouter.get('/:id', getSingleComment)

// Only access to these pages if verifyToken passed
commentsRouter.post('/:id', verifyToken, createComment)
commentsRouter.put('/:id', verifyToken, updateComment)
commentsRouter.delete('/:id', verifyToken, deleteComment)

export default commentsRouter
