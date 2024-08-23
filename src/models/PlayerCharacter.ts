// File: src/models/PlayerCharacter.ts

import mongoose, { Schema, Document } from 'mongoose';

export interface IPlayerCharacter extends Document {
  _id: mongoose.Types.ObjectId;
  accountId: mongoose.Types.ObjectId;
  characterName: string;
  mainframes: mongoose.Types.ObjectId[];
}

// PlayerCharacter Schema
const PlayerCharacterSchema: Schema = new mongoose.Schema({
  accountId: { type: mongoose.Schema.Types.ObjectId, ref: 'PlayerAccount', required: true },
  characterName: { type: String, required: true }, // Ensure characterName is required
  mainframes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Mainframe' }]
});

export default mongoose.models.PlayerCharacter || mongoose.model<IPlayerCharacter>('PlayerCharacter', PlayerCharacterSchema);
