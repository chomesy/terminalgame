// File: src/services/PlayerAccountService.ts

import { PlayerAccountRepository } from '../repositories/PlayerAccountRepository';
import { IPlayerAccount } from '../models/PlayerAccount';

export class PlayerAccountService {
  private playerAccountRepository: PlayerAccountRepository;

  constructor() {
    this.playerAccountRepository = new PlayerAccountRepository();
  }

  async registerAccount(username: string, passwordHash: string, email: string): Promise<IPlayerAccount> {
    const existingAccount = await this.playerAccountRepository.getPlayerAccountByUsername(username);
    if (existingAccount) {
      throw new Error('Username already exists');
    }

    const newAccountData: Partial<IPlayerAccount> = {
      username,
      passwordHash,
      email,
      progressLevel: 0,
      storyChapter: 'Chapter 1',
      achievements: [],
      playerCharacters: [],
    };

    return this.playerAccountRepository.createPlayerAccount(newAccountData);
  }

  async getAccountById(accountId: string): Promise<IPlayerAccount | null> {
    return this.playerAccountRepository.getPlayerAccountById(accountId);
  }

  async updateProgress(accountId: string, progressLevel: number, storyChapter: string): Promise<IPlayerAccount | null> {
    const account = await this.playerAccountRepository.getPlayerAccountById(accountId);
    if (!account) {
      throw new Error('Account not found');
    }

    account.progressLevel = progressLevel;
    account.storyChapter = storyChapter;

    return this.playerAccountRepository.updatePlayerAccount(accountId, account);
  }

  async addAchievement(accountId: string, achievementId: string, name: string): Promise<IPlayerAccount | null> {
    const account = await this.playerAccountRepository.getPlayerAccountById(accountId);
    if (!account) {
      throw new Error('Account not found');
    }

    const newAchievement = {
      achievementId,
      name,
      dateUnlocked: new Date(),
    };

    account.achievements.push(newAchievement);

    return this.playerAccountRepository.updatePlayerAccount(accountId, account);
  }

  async deleteAccount(accountId: string): Promise<void> {
    const account = await this.playerAccountRepository.deletePlayerAccount(accountId);
    if (!account) {
      throw new Error('Account not found or already deleted');
    }
  }

  // Additional business logic methods can be added here
}
