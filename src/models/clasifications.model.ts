import mongoose, { Schema } from "mongoose";

export const ClasificationsSchema = new Schema({
  name: {
    type: String,
    required: [true, "Clasification's name is required"]
  }
})

ClasificationsSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret, options) {
    delete ret._id;
  },
})

export const ClasificationsModel = mongoose.model('Clasifications', ClasificationsSchema);