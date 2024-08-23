import dbConnect from '../lib/dbConnect';
import PlayerCharacter, { IPlayerCharacter } from '../models/PlayerCharacter';
import Mainframe from '../models/Mainframe';

export class PlayerCharacterRepository {
  async getPlayerCharacterById(characterId: string): Promise<IPlayerCharacter | null> {
    await dbConnect();
    return PlayerCharacter.findById(characterId).populate('mainframes');
  }

  async getPlayerCharactersByAccountId(accountId: string): Promise<IPlayerCharacter[]> {
    await dbConnect();
    return PlayerCharacter.find({ accountId }).populate('mainframes');
  }

  async createPlayerCharacter(data: Partial<IPlayerCharacter>): Promise<IPlayerCharacter> {
    await dbConnect();
    const playerCharacter = new PlayerCharacter(data);
    return playerCharacter.save();
  }

  async updatePlayerCharacter(characterId: string, data: Partial<IPlayerCharacter>): Promise<IPlayerCharacter | null> {
    await dbConnect();
    return PlayerCharacter.findByIdAndUpdate(characterId, data, { new: true }).populate('mainframes');
  }

  async deletePlayerCharacter(characterId: string): Promise<IPlayerCharacter | null> {
    await dbConnect();
    const character = await PlayerCharacter.findByIdAndDelete(characterId);
    if (character) {
      await Mainframe.deleteMany({ characterId: character._id }); // Cascade delete mainframes
    }
    return character;
  }
}
