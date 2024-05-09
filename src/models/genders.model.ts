import mongoose, { Schema } from "mongoose";

export const GendersSchema = new Schema({
  name: {
    type: String,
    required: [true, "Gernder's name is required"]
  }
})

GendersSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret, options) {
    delete ret._id;
  },
})

export const GendersModel = mongoose.model('Genders', GendersSchema);