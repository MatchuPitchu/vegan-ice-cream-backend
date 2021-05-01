import express from 'express';
import { getAllComments, getSingleComment, createComment, updateComment, deleteComment } from '../controllers/comments.js'

const commentsRouter = express.Router();

commentsRouter.get('/', getAllComments);
commentsRouter.get('/:id', getSingleComment);
commentsRouter.post('/:id', createComment);
commentsRouter.put('/:id', updateComment);
commentsRouter.delete('/:id', deleteComment);

export default commentsRouter;