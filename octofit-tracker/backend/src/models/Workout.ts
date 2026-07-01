import { Schema, model } from 'mongoose';

const workoutSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String },
  exercises: [{ type: String }],
  created_at: { type: Date, default: Date.now },
});

export const Workout = model('Workout', workoutSchema);
