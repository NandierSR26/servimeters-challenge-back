import mongoose, { Schema } from "mongoose";

export const RentalsSchema = new Schema({
  userID: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  movieID: {
    type: Schema.Types.ObjectId,
    ref: 'Movies',
    required: true
  },
  rental_date: {
    type: Date,
    required: [true, 'Rental date is required']
  },
  return_date: {
    type: Date,
    required: [true, 'Return date is required']
  }
});

RentalsSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret, options) {
    delete ret._id;
  },
})

export const RentalsModel = mongoose.model('Rentals', RentalsSchema);