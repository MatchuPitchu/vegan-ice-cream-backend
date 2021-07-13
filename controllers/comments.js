import mongoose from 'mongoose';
// import all schemas that have a reference to 'Comment' and
// which has to be 'informed' about creating or updating of new Cpmment
import { Comment, User, Location } from '../models/Schemas.js';

export const getAllComments = async (req, res)=> {
    try {
        // If I want to connect two collections in MongoDB (here: add 'user_id' 
        // from User Schema to the comments)
        // than I have to populate() the comments with the user name
        // https://mongoosejs.com/docs/populate.html
        const comments = await Comment.find().populate({ path: 'user_id', select: 'name -_id'});  
        res.json(comments);
    } catch (error) {
        res.status(500).json({ error: error.message});
    };
}
        
export const getSingleComment = async (req, res)=> {
    try {
        const { id } = req.params;
        const singleComment = await Comment.findById(id);   
        if(!singleComment) return res.status(404).json({ message: `Comment with ${id} not found>`});
        res.json(singleComment);
    } catch (error) {
        res.status(500).json({ error: error.message});
    };
}

export const createComment = async (req, res)=> {
    try {
        const { id: location_id } = req.params;
        const { 
            user_id, 
            flavors_referred, 
            text, 
            rating_quality,
            bio,
            vegan,
            lactose_free,
            not_specified,
            rating_vegan_offer, 
            date 
        } = req.body;
        const newComment = await Comment.create({
            _id: new mongoose.Types.ObjectId(),
            user_id,
            location_id,
            flavors_referred,
            text,
            rating_quality,
            bio,
            vegan,
            lactose_free,
            not_specified,
            rating_vegan_offer,
            date
        });
        // Update arrays of other schemas that use ref "Comment"; update with _id of newComment in order to inform about creation of new comment
        // findOneAndUpdate() https://mongoosejs.com/docs/tutorials/findoneandupdate.html
        // Update Operators: https://docs.mongodb.com/manual/reference/operator/update/
        const updateUser = await User.findOneAndUpdate({ _id: user_id }, {$push: { "comments_list": newComment._id }}  );
        const updateLocation = await Location.findOneAndUpdate({ _id: location_id }, {$push: { "comments_list": newComment._id }}  );
        res.status(201).json(newComment);
    } catch (error) {
        res.status(500).json({ error: error.message});
    };
}

// user can update his comment for the same location -> can not change location, than user has to delete comment
export const updateComment = async (req, res) => {
    try {
      const { id: comment_id } = req.params;
      const { 
        location_id,
        flavors_referred, 
        text, 
        rating_quality,
        bio,
        vegan,
        lactose_free,
        not_specified,
        rating_vegan_offer, 
        date
      } = req.body;
      // findOneAndUpdate: https://docs.mongodb.com/manual/reference/method/db.collection.findOneAndUpdate/
      const updatedComment = await Comment.findOneAndUpdate(
          { _id: comment_id },
          { 
            location_id, 
            flavors_referred, 
            text, 
            rating_quality,
            bio,
            vegan,
            lactose_free,
            not_specified,
            rating_vegan_offer, 
            date 
          },
          // set the new option to true to return the document after update was applied
          { new: true }
        )
      res.json(updatedComment);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  // user can delete his comment
  export const deleteComment = async (req, res) => {
    try {
      const { id } = req.params;
      const { user_id } = req.body;
      const singleComment = await Comment.findById(id);   
      if(!singleComment) return res.status(404).json({ message: `Comment with ${id} not found>`});
      // Check if user is author of comment
      if(singleComment.user_id != user_id) return res.status(403).json({ message: 'You are not allowed to delete this comment'}); 
      await Comment.deleteOne({ _id: id });

      // delete comment id also in the refered User collection and Location collection
      await User.findOneAndUpdate(
        { _id: singleComment.user_id }, 
        {$pull: { "comments_list": id }}  
      );
      
      await Location.findOneAndUpdate(
        { _id: singleComment.location_id }, 
        {$pull: { "comments_list": id }}  
      );

      res.json({ success: `Comment with id of ${id} was deleted` });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };