import bcrypt from 'bcrypt';
// import all schemas that have a reference to 'User' and
// which has to be 'informed' about creating or updating of new User
import { User } from "../models/Schemas.js";
import { sendConfirmNewMail } from '../Utils/mailer.js';

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
      .populate({
        path: 'comments_list',
        populate: [
          { path: 'location_id', select: 'name' },
          { path: 'flavors_referred', select: 'name' }
        ]
      })
      .populate('favorite_locations')
      .populate('favorite_flavors');
    if (!user) return res.status(404).json({ message: `User with id ${id} not found` });
    const {comments_list, favorite_locations, favorite_flavors} = user;
    const infos = {
      comments_list,
      favorite_locations,
      favorite_flavors
    }
    res.status(200).json(infos);
  } catch(err) {
    res.status(500).json({ error: err.message })
  }
};

// Only access to logged in user
export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { 
      name, 
      email, 
      newPassword,
      repeatPassword,
      password
    } = req.body;

    // define object which includes all key-values to update
    let updateBlock = {};
    // can only create key in object when home_city exists, otherwise error
    if(req.body.home_city !== undefined) updateBlock.home_city = { 
      city: req.body.home_city.city ,
      geo: {
        lat: req.body.home_city.geo.lat,
        lng: req.body.home_city.geo.lng,
      }
    };
    if(name) updateBlock.name = name;
    if(email) {
      updateBlock.email = email;
      // if new email than user has to confirm this account first
      updateBlock.confirmed = false;
    }

    // search user with user._id and check correct password
    const foundUser = await User.findOne({ _id: id }).select('+password');
    const passwordCheck = await bcrypt.compare(password, foundUser.password);
    if (!passwordCheck) throw new Error('Password is incorrect');

    // if new mail already exists, than error
    const foundMail = await User.findOne({ email });
    if (foundMail) throw new Error('Email already taken');

    // if new password exists and matches repeatPassword, than hash password before saving in DB: https://www.npmjs.com/package/bcrypt
    if(newPassword) {
      if (newPassword && newPassword !== repeatPassword) res.status(400).json('Please check whether you have entered the same password twice')
      const hashPassword = await bcrypt.hash(newPassword, 12);
      updateBlock.password = hashPassword;
    }

    // findOneAndUpdate: https://docs.mongodb.com/manual/reference/method/db.collection.findOneAndUpdate/
    const updatedUser = await User.findOneAndUpdate(
        { _id: id },
        { $set: updateBlock },
        { new: true }
      )

    if(email) await sendConfirmNewMail({toUser: updatedUser, user_id: updatedUser._id})

    res.status(200).json({success: 'User profile updated'});
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


// Only access to logged in user
export const removeFavLocation = async (req, res) => {
  try {
    const { id } = req.params;
    const { remove_location_id } = req.body;

    const { favorite_locations } = await User.findOneAndUpdate(
      { _id: id },
      { $pullAll: { favorite_locations: [remove_location_id] } },
      { new: true }
    ).populate('favorite_locations');
    res.status(201).json(favorite_locations);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const addFavLocation = async (req, res) => {
  try {
    const { id } = req.params;
    const { add_location_id } = req.body;
    const { favorite_locations } = await User.findOneAndUpdate(
      {_id: id},
      { $addToSet: { favorite_locations: [add_location_id] } }
    ).populate('favorite_locations');
    res.status(201).json(favorite_locations);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateFavList = async (req, res) => {
  try {
    const { id } = req.params;
    const { updated_fav_list } = req.body;
    const updatedUser = await User.findOneAndUpdate(
      {_id: id},
      // use $set to replace existing array with new
      { $set: { favorite_locations: updated_fav_list } },
      { new: true }
    );
    res.status(200).json('Update erfolgreich');
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const addNumLocationLastVisit = async (req, res) => {
  try {
    const { id } = req.params;
    const { current_num_loc } = req.body;
    const { num_loc_last_visit } = await User.findOneAndUpdate(
      {_id: id},
      { $set: { num_loc_last_visit: current_num_loc } }
    );
    res.status(200).json('Update erfolgreich');
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};