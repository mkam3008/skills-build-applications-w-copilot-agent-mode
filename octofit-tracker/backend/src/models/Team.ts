import { Schema, model, Types } from 'mongoose';

const teamSchema = new Schema({
  name: { type: String, required: true, unique: true },
  members: [{ type: Types.ObjectId, ref: 'User' }],
  created_at: { type: Date, default: Date.now },
});

export const Team = model('Team', teamSchema);
