// File: src/lib/dbConnect.ts

import mongoose, { Mongoose } from 'mongoose';

// Get the MongoDB URI from environment variables
const MONGODB_URI: string | undefined = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable in .env.local');
}

// Define a global variable to store the Mongoose connection
interface MongooseCache {
  conn: Mongoose | null;
  promise: Promise<Mongoose> | null;
}

// Create or use an existing global variable to cache the Mongoose connection
let cached: MongooseCache = global.mongoose || { conn: null, promise: null };

if (!global.mongoose) {
  global.mongoose = cached;
}

/**
 * Connects to MongoDB using Mongoose.
 * 
 * This function will use a cached connection if available, otherwise, it will
 * create a new connection and cache it. This prevents the overhead of creating
 * multiple connections in a serverless environment like Vercel.
 *
 * @returns {Promise<Mongoose>} A promise that resolves to the Mongoose connection.
 */
async function dbConnect(): Promise<Mongoose> {
  // If a connection already exists, return it
  if (cached.conn) {
    return cached.conn;
  }

  // If no promise is cached, create a new connection promise
  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI!).then((mongooseInstance) => {
      return mongooseInstance;
    });
  }

  // Wait for the connection promise to resolve and cache the connection
  cached.conn = await cached.promise;
  return cached.conn;
}

export default dbConnect;
