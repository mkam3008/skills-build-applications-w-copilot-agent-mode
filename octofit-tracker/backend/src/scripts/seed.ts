/**
 * Seed the octofit_db database with test data
 *
 * Usage: ts-node src/scripts/seed.ts
 * (or via npm run seed)
 */

import mongoose from 'mongoose';
import { User } from '../models/User';
import { Team } from '../models/Team';
import { Activity } from '../models/Activity';
import { Leaderboard } from '../models/Leaderboard';
import { Workout } from '../models/Workout';

const MONGO_URI = 'mongodb://localhost:27017/octofit_db';

async function seed() {
  await mongoose.connect(MONGO_URI);
  console.log('Connected to MongoDB (octofit_db)');

  // Clear existing data
  await Promise.all([
    User.deleteMany({}),
    Team.deleteMany({}),
    Activity.deleteMany({}),
    Leaderboard.deleteMany({}),
    Workout.deleteMany({}),
  ]);
  console.log('Cleared existing collections');

  // --- Users ---
  const users = await User.insertMany([
    { username: 'paul_octo',    email: 'paul@mergington.edu',    password: 'hashed_pw_1' },
    { username: 'jessica_cat',  email: 'jessica@mergington.edu', password: 'hashed_pw_2' },
    { username: 'alice_run',    email: 'alice@mergington.edu',   password: 'hashed_pw_3' },
    { username: 'bob_lift',     email: 'bob@mergington.edu',     password: 'hashed_pw_4' },
    { username: 'carol_swim',   email: 'carol@mergington.edu',   password: 'hashed_pw_5' },
  ]);
  console.log(`Inserted ${users.length} users`);

  // --- Teams ---
  const teams = await Team.insertMany([
    { name: 'Octo Runners',   members: [users[0]._id, users[2]._id] },
    { name: 'Iron Cats',      members: [users[1]._id, users[3]._id] },
    { name: 'Swim Squad',     members: [users[4]._id, users[0]._id] },
  ]);
  console.log(`Inserted ${teams.length} teams`);

  // --- Activities ---
  const activities = await Activity.insertMany([
    { user: users[0]._id, type: 'Running',          duration: 30, date: new Date('2026-06-28') },
    { user: users[1]._id, type: 'Strength Training', duration: 45, date: new Date('2026-06-28') },
    { user: users[2]._id, type: 'Running',          duration: 25, date: new Date('2026-06-29') },
    { user: users[3]._id, type: 'Strength Training', duration: 60, date: new Date('2026-06-29') },
    { user: users[4]._id, type: 'Swimming',         duration: 40, date: new Date('2026-06-30') },
    { user: users[0]._id, type: 'Walking',          duration: 50, date: new Date('2026-06-30') },
    { user: users[2]._id, type: 'Cycling',          duration: 35, date: new Date('2026-07-01') },
  ]);
  console.log(`Inserted ${activities.length} activities`);

  // --- Leaderboard ---
  const leaderboard = await Leaderboard.insertMany([
    { user: users[0]._id, score: 320 },
    { user: users[1]._id, score: 275 },
    { user: users[2]._id, score: 210 },
    { user: users[3]._id, score: 190 },
    { user: users[4]._id, score: 150 },
  ]);
  console.log(`Inserted ${leaderboard.length} leaderboard entries`);

  // --- Workouts ---
  const workouts = await Workout.insertMany([
    {
      name: 'Morning Cardio Blast',
      description: 'High-intensity interval running session to kick-start the day.',
      exercises: ['Warm-up jog 5 min', 'Sprint intervals 10x30s', 'Cool-down walk 5 min'],
    },
    {
      name: 'Full-Body Strength',
      description: 'Compound movements targeting all major muscle groups.',
      exercises: ['Squats 3x12', 'Push-ups 3x15', 'Deadlifts 3x10', 'Pull-ups 3x8'],
    },
    {
      name: 'Swim Endurance',
      description: 'Steady-state swimming to build cardiovascular endurance.',
      exercises: ['Freestyle 400m', 'Backstroke 200m', 'Breaststroke 200m', 'Cool-down 100m'],
    },
    {
      name: 'Active Recovery Walk',
      description: 'Low-intensity walking to promote recovery on rest days.',
      exercises: ['Brisk walk 30 min', 'Light stretching 10 min'],
    },
    {
      name: 'Cycling Intervals',
      description: 'Interval cycling session to boost speed and stamina.',
      exercises: ['Easy spin 10 min', 'Hard effort 5x3 min', 'Recovery spin 5 min'],
    },
  ]);
  console.log(`Inserted ${workouts.length} workouts`);

  console.log('\n✅ Database seeded successfully');
  await mongoose.disconnect();
}

seed().catch((err) => {
  console.error('Seed failed:', err);
  process.exit(1);
});
