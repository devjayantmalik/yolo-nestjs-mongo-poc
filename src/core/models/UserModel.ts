import { Schema, model } from 'mongoose';

export const UserSchema = new Schema({
  _id: {
    type: String,
  },
  fullname: {
    type: String,
  },
  email: {
    type: String,
  },
  password: {
    type: String,
  },
  roles: {
    type: [String],
  },
});

export const UserModel = model('User', UserSchema);
