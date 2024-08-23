// File: src/repositories/PlayerAccountRepository.ts

import dbConnect from '../lib/dbConnect';
import PlayerAccount, { IPlayerAccount } from '../models/PlayerAccount';

export class PlayerAccountRepository {
  async getPlayerAccountById(accountId: string): Promise<IPlayerAccount | null> {
    await dbConnect();
    return PlayerAccount.findById(accountId).populate('playerCharacters');
  }

  async getPlayerAccountByUsername(username: string): Promise<IPlayerAccount | null> {
    await dbConnect();
    return PlayerAccount.findOne({ username }).populate('playerCharacters');
  }

  async createPlayerAccount(data: Partial<IPlayerAccount>): Promise<IPlayerAccount> {
    await dbConnect();
    const playerAccount = new PlayerAccount(data);
    return playerAccount.save();
  }

  async updatePlayerAccount(accountId: string, data: Partial<IPlayerAccount>): Promise<IPlayerAccount | null> {
    await dbConnect();
    return PlayerAccount.findByIdAndUpdate(accountId, data, { new: true }).populate('playerCharacters');
  }

  async deletePlayerAccount(accountId: string): Promise<IPlayerAccount | null> {
    await dbConnect();
    return PlayerAccount.findByIdAndDelete(accountId);
  }
}
