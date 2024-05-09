import mongoose, { Schema } from "mongoose";

export const UsersSchema = new Schema({
  full_name: {
    type: String,
    required: [true, 'Full name is required']
  },
  email: {
    type: String,
    required: [true, 'E-mail is required'],
    unique: true
  },
  phone: {
    type: String,
    required: [true, 'Phone is required']
  },
  password: {
    type: String,
    required: [true, 'Passowrd is required']
  },
  balance: {
    type: Number,
    default: 0
  },
  rol: {
    type: [String],
    default: ['CLIENT'],
    enum: ['CLIENT', 'EMPLOYEE']
  }
});

UsersSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret, options) {
    delete ret._id;
    delete ret.password;
  },
});

export const UserModel = mongoose.model('User', UsersSchema);