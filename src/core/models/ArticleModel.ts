import { Schema, model } from 'mongoose';
import { UserSchema } from './UserModel';

export const ArticleSchema = new Schema({
  _id: {
    type: String,
  },
  title: {
    type: String,
  },
  description: {
    type: String,
  },
  content: {
    type: String,
  },
  owner: UserSchema,
  is_draft: {
    type: Boolean,
  },
});

export const ArticleModel = model('Article', ArticleSchema);
