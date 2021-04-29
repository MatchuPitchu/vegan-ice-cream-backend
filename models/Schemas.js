import mongoose from 'mongoose';
const { Schema, model } = mongoose;

// for creating field that autoincrements his value: https://www.npmjs.com/package/mongoose-sequence
import AutoIncrementFactory from 'mongoose-sequence';
const AutoIncrement = AutoIncrementFactory(mongoose);

// Description how to reference other schema: https://mongoosejs.com/docs/populate.html
// Do not need "_id: Schema.Types.ObjectId" in schemas

const userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true, select: false },
  comments: [{ type: Schema.Types.ObjectId, ref: 'Comment'}],
  favorite_locations: [{ type: Schema.Types.ObjectId, ref: 'Location'}],
  favorite_flavors: [{ type: Schema.Types.ObjectId, ref: 'Flavor'}]
});

const commentSchema = new Schema( {
  user_id: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  location_id: { type: Schema.Types.ObjectId, ref: 'Location', required: true },
  flavors_referred: [{ type: Schema.Types.ObjectId, ref: 'Flavor'}],
  text: { type: String, required: true },
  grade_quality: { type: Number, required: true },
  grade_vegan_offer: { type: Number, required: true },
  date: { type: Date, default: Date.now }
});

const locationSchema = new Schema( {
  location_num: { type: Number },
  name: { type: String, required: true },
  address: {
    street: { type: String },
    number: { type: Number },
    zipcode: { type: Number },
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

  // WHERE DO I INSERT QUERY AND UPDATE FUNCTION TO CALCULATE GRADES BASED ON USER COMMENTS???
  location_grade_quality: { type: Number },
  location_grade_vegan_offer: { type: Number }
});

// autoincrement location_num every time a new location is created
locationSchema.plugin(AutoIncrement, {inc_field: 'location_num'});

// // creating new static method for location schema
// locationSchema.statics.getAverageGrade = async function () {
//   const obj = await this.aggregate()
// };
// // event listener method is triggerd after I save smth
// locationSchema.post('save', function () {
//   locationSchema.getAverageGrade()
// })

// // event listener method is triggerd before I remove smth
// locationSchema.pre('remove', function () {

// })

const colorValidator = (v) => (/^#([0-9a-f]{3}){1,2}$/i).test(v);

const flavorSchema = new Schema( {
  comment_id: [{ type: Schema.Types.ObjectId, ref: 'Comment', required: true }],
  name: { type: String, required: true },
  type_fruit_ice: { type: Boolean, required: true },
  type_cream_ice: { type: Boolean, required: true },
  ice_color: {
    color_primary: { type: String, validator: [colorValidator, 'Invalid color'], required: true},
    color_secondary: { type: String, validator: [colorValidator, 'Invalid color']},
    color_tertiary: { type: String, validator: [colorValidator, 'Invalid color']},
  },
});

export const User = model('User', userSchema);
export const Comment = model('Comment', commentSchema);
export const Location = model('Location', locationSchema);
export const Flavor = model('Flavor', flavorSchema);