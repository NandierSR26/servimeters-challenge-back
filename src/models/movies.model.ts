import mongoose, { Schema } from "mongoose";

export const MoviesSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Movie name is required']
  },
  description: {
    type: String,
    required: [true, 'Movie description is required']
  },
  director: {
    type: String
  },
  year: {
    type: String
  },
  clasification: {
    type: Schema.Types.ObjectId,
    ref: 'Clasifications',
    required: [true, 'Clasification is required']
  },
  gender: {
    type: Schema.Types.ObjectId,
    ref: 'Genders',
    required: [true, 'Gender is required']
  },
  duration: {
    type: String
  },
  price: {
    type: Number,
    required: [true, 'Movie price is required']
  }
})

MoviesSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret, options) {
    delete ret._id;
  },
})

export const MoviesModel = mongoose.model('Movies', MoviesSchema);