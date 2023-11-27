import { Schema, model, Types } from 'mongoose';

export const ArticleSchema = new Schema({
  title: {
    type: String,
  },
  description: {
    type: String,
  },
  content: {
    type: String,
  },
  owner: { type: Types.ObjectId, ref: 'User' },
  is_draft: {
    type: Boolean,
  },
});

export const ArticleModel = model('Article', ArticleSchema);
