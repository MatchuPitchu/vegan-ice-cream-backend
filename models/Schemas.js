import mongoose from 'mongoose';
const { Schema, model } = mongoose;

// for creating field that autoincrements his value: https://www.npmjs.com/package/mongoose-sequence
import AutoIncrementFactory from 'mongoose-sequence';
const AutoIncrement = AutoIncrementFactory(mongoose);

// Description how to reference other schema: https://mongoosejs.com/docs/populate.html
// Do not need "_id: Schema.Types.ObjectId" in schemas

const userSchema = new Schema({
  name: { type: String, trim: true, max: 64 },
  email: { type: String, trim: true, lowercase: true },
  confirmed: { type: Boolean, default: false },
  password: { type: String, select: false },
  home_city: {
    city: { type: String, default: '' },
    geo: {
      lat: { type: Number },
      lng: { type: Number }
    }
  },
  comments_list: [{ type: Schema.Types.ObjectId, ref: 'Comment'}],
  favorite_locations: [{ type: Schema.Types.ObjectId, ref: 'Location'}],
  favorite_flavors: [{ type: Schema.Types.ObjectId, ref: 'Flavor'}],
  num_loc_last_visit: { type: Number, default: 0 },
  needs_reset: { type: Boolean, default: false },
  resetToken: { type: String }
  // Do a PATCH request (instead of put) to update only one field
});

const commentSchema = new Schema( {
  user_id: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  location_id: { type: Schema.Types.ObjectId, ref: 'Location', required: true },
  flavors_referred: [{ type: Schema.Types.ObjectId, ref: 'Flavor'}],
  text: { type: String, required: true },
  rating_vegan_offer: { type: Number, min: 0, max: 10, required: true},
  rating_quality: { type: Number, min: 0, max: 10, required: true},
  bio: { type: Boolean },
  vegan: { type: Boolean },
  lactose_free: { type: Boolean },
  not_specified: { type: Boolean },
  date: { type: Date, default: Date.now }
});

/******** Calculation Average Rating ********/
// creating new static methods for location schema
commentSchema.statics.getAvgRatingQuality = async function (location_id) {
  console.log('Calculating average rating quality ...');
  const ratingAggregation = await this.aggregate([
    { $match: { location_id } },
    { $group: { _id: '$location_id', rating_quality: {$avg: '$rating_quality'} } }
  ]);
  try {
    await this.model('Location').findByIdAndUpdate(location_id, {
      // Using math.round() workaround to round average rating to 1 decimal place
      location_rating_quality: Math.round(ratingAggregation[0].rating_quality * 10) / 10
    });
  } catch (error) {}
};

commentSchema.statics.getAvgRatingOffer = async function (location_id) {
  console.log('Calculating average rating vegan offer ...');
  const ratingAggregation = await this.aggregate([
    { $match: { location_id } },
    { $group: { _id: '$location_id', rating_vegan_offer: {$avg: '$rating_vegan_offer'} } }
  ]);
  try {
    await this.model('Location').findByIdAndUpdate(location_id, {
      location_rating_vegan_offer: Math.round(ratingAggregation[0].rating_vegan_offer * 10) / 10
    });
  } catch (error) {}
};
// event listener method is triggerd after I save smth
// post middleware are executed after the hooked method and all of its pre middleware have completed
commentSchema.post('save', function () {
  Comment.getAvgRatingQuality(this.location_id);
  Comment.getAvgRatingOffer(this.location_id);
});

// after updating comment, this middleware is executed in order to update avg ratings
// also event listener method is triggerd after removing comment
commentSchema.post('findOneAndUpdate', async function () {
  const docToUpdate = await this.model.findOne(this.getFilter());
  Comment.getAvgRatingQuality(docToUpdate.location_id);
  Comment.getAvgRatingOffer(docToUpdate.location_id);
})

const locationSchema = new Schema( {
  location_num: { type: Number },
  name: { type: String, required: true },
  address: {
    street: { type: String },
    number: { type: Number },
    zipcode: { type: String },
    city: { type: String, required: true },
    country: { type: String },
    geo: {
      lat: { type: Number, required: true },
      lng: { type: Number, required: true }
    }
  },
  location_url: { type: String },
  comments_list: [{ type: Schema.Types.ObjectId, ref: 'Comment'}],
  flavors_listed: [{ type: Schema.Types.ObjectId, ref: 'Flavor'}],
  location_rating_quality: { type: Number },
  location_rating_vegan_offer: { type: Number },
  // User can update this value in comment/rating form in frontend => new value overwrites previous value
  // value is rounded to 2 decimals
  pricing: [{ type: Number, set: v => Math.round(v * 100) / 100 }],
});

// autoincrement location_num every time a new location is created
locationSchema.plugin(AutoIncrement, {inc_field: 'location_num'});

const colorValidator = (v) => (/^#([0-9a-f]{3}){1,2}$/i).test(v);

const flavorSchema = new Schema( {
  name: { type: String, required: true },
  type_fruit: { type: Boolean, required: true },
  type_cream: { type: Boolean, required: true },
  color: {
    primary: { type: String, validator: [colorValidator, 'Invalid color'], required: true},
    secondary: { type: String, validator: [colorValidator, 'Invalid color']}
  },
});

export const User = model('User', userSchema);
export const Comment = model('Comment', commentSchema);
export const Location = model('Location', locationSchema);
export const Flavor = model('Flavor', flavorSchema);