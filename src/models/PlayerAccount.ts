// File: src/models/PlayerAccount.ts

import mongoose, { Schema, Document } from 'mongoose';

export interface IPlayerAccount extends Document {
  _id: mongoose.Types.ObjectId;  // Add this line
  username: string;
  passwordHash: string;
  email: string;
  progressLevel: number;
  storyChapter: string;
  achievements: {
    achievementId: string;
    name: string;
    dateUnlocked: Date;
  }[];
  playerCharacters: mongoose.Types.ObjectId[];
}

const PlayerAccountSchema: Schema = new Schema({
  username: { type: String, unique: true, required: true },
  passwordHash: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  progressLevel: { type: Number, default: 0 },
  storyChapter: { type: String, default: 'Chapter 1' },
  achievements: [
    {
      achievementId: String,
      name: String,
      dateUnlocked: Date,
    },
  ],
  playerCharacters: [{ type: mongoose.Schema.Types.ObjectId, ref: 'PlayerCharacter' }],
});

export default mongoose.models.PlayerAccount || mongoose.model<IPlayerAccount>('PlayerAccount', PlayerAccountSchema);
