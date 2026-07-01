/**
 * Seed the octofit_db database with test data
 *
 * Usage: npx ts-node src/scripts/seed.ts
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
  console.log('Connected to octofit_db');

  // Clear existing data
  await Promise.all([
    User.deleteMany({}),
    Team.deleteMany({}),
    Activity.deleteMany({}),
    Leaderboard.deleteMany({}),
    Workout.deleteMany({}),
  ]);
  console.log('Cleared existing collections');

  // Seed Users
  const users = await User.insertMany([
    { username: 'paul_octo', email: 'paul@mergington.edu', password: 'hashed_pw_1' },
    { username: 'jessica_cat', email: 'jessica@mergington.edu', password: 'hashed_pw_2' },
    { username: 'alex_runner', email: 'alex@mergington.edu', password: 'hashed_pw_3' },
    { username: 'sam_lifts', email: 'sam@mergington.edu', password: 'hashed_pw_4' },
    { username: 'morgan_swim', email: 'morgan@mergington.edu', password: 'hashed_pw_5' },
  ]);
  console.log(`Inserted ${users.length} users`);

  // Seed Teams
  const teams = await Team.insertMany([
    { name: 'Octo Runners', members: [users[0]._id, users[2]._id] },
    { name: 'Iron Cats', members: [users[1]._id, users[3]._id] },
    { name: 'Swim Squad', members: [users[4]._id, users[0]._id] },
  ]);
  console.log(`Inserted ${teams.length} teams`);

  // Seed Activities
  const activities = await Activity.insertMany([
    { user: users[0]._id, type: 'Running', duration: 30, date: new Date('2026-06-28') },
    { user: users[1]._id, type: 'Cycling', duration: 45, date: new Date('2026-06-28') },
    { user: users[2]._id, type: 'Running', duration: 60, date: new Date('2026-06-29') },
    { user: users[3]._id, type: 'Strength Training', duration: 50, date: new Date('2026-06-29') },
    { user: users[4]._id, type: 'Swimming', duration: 40, date: new Date('2026-06-30') },
    { user: users[0]._id, type: 'Walking', duration: 20, date: new Date('2026-06-30') },
    { user: users[2]._id, type: 'Running', duration: 35, date: new Date('2026-07-01') },
  ]);
  console.log(`Inserted ${activities.length} activities`);

  // Seed Leaderboard
  const leaderboard = await Leaderboard.insertMany([
    { user: users[2]._id, score: 950 },
    { user: users[0]._id, score: 820 },
    { user: users[4]._id, score: 780 },
    { user: users[3]._id, score: 710 },
    { user: users[1]._id, score: 650 },
  ]);
  console.log(`Inserted ${leaderboard.length} leaderboard entries`);

  // Seed Workouts
  const workouts = await Workout.insertMany([
    {
      name: 'Morning Cardio Blast',
      description: 'High-intensity cardio to start the day strong',
      exercises: ['Jumping Jacks', 'High Knees', 'Burpees', 'Mountain Climbers'],
    },
    {
      name: 'Strength Builder',
      description: 'Full-body strength training for all levels',
      exercises: ['Push-ups', 'Squats', 'Lunges', 'Plank', 'Dumbbell Rows'],
    },
    {
      name: 'Flexibility & Recovery',
      description: 'Stretching and recovery routine to improve mobility',
      exercises: ['Hamstring Stretch', 'Hip Flexor Stretch', 'Shoulder Rolls', 'Cat-Cow'],
    },
    {
      name: 'Endurance Run',
      description: 'Steady-state running plan for building endurance',
      exercises: ['Warm-up Walk (5 min)', 'Easy Run (20 min)', 'Cool-down Walk (5 min)'],
    },
  ]);
  console.log(`Inserted ${workouts.length} workouts`);

  console.log('\nSeed completed successfully!');
  await mongoose.disconnect();
}

seed().catch((err) => {
  console.error('Seed failed:', err);
  process.exit(1);
});
