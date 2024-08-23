// File: global.d.ts

import { Mongoose } from 'mongoose';

declare global {
  var mongoose: {
    conn: Mongoose | null;
    promise: Promise<Mongoose> | null;
  };
}

// Export an empty object to ensure this file is treated as a module by TypeScript
export {};
