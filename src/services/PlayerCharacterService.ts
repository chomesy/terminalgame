// File: src/services/PlayerCharacterService.ts

import { PlayerCharacterRepository } from '../repositories/PlayerCharacterRepository';
import { PlayerAccountService } from './PlayerAccountService';
import { IPlayerCharacter } from '../models/PlayerCharacter';

export class PlayerCharacterService {
  private playerCharacterRepository: PlayerCharacterRepository;
  private playerAccountService: PlayerAccountService;

  constructor() {
    this.playerCharacterRepository = new PlayerCharacterRepository();
    this.playerAccountService = new PlayerAccountService();
  }

  async createCharacter(accountId: string, characterName: string): Promise<IPlayerCharacter> {
    // Check if the account exists
    const account = await this.playerAccountService.getAccountById(accountId);
    if (!account) {
      throw new Error('Player account does not exist');
    }

    const newCharacterData: Partial<IPlayerCharacter> = {
      accountId: account._id,
      characterName: characterName,
      mainframes: [],
    };

    return this.playerCharacterRepository.createPlayerCharacter(newCharacterData);
  }

  async getCharacterById(characterId: string): Promise<IPlayerCharacter | null> {
    return this.playerCharacterRepository.getPlayerCharacterById(characterId);
  }

  async getCharactersByAccountId(accountId: string): Promise<IPlayerCharacter[]> {
    return this.playerCharacterRepository.getPlayerCharactersByAccountId(accountId);
  }

  async updateCharacter(characterId: string, characterName: string): Promise<IPlayerCharacter | null> {
    const character = await this.playerCharacterRepository.getPlayerCharacterById(characterId);
    if (!character) {
      throw new Error('Character not found');
    }

    character.characterName = characterName;

    return this.playerCharacterRepository.updatePlayerCharacter(characterId, character);
  }

  async deleteCharacter(characterId: string): Promise<void> {
    const character = await this.playerCharacterRepository.deletePlayerCharacter(characterId);
    if (!character) {
      throw new Error('Character not found or already deleted');
    }
  }

  // Additional business logic methods can be added here
}
