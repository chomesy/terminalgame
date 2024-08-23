import { MainframeRepository } from '../repositories/MainframeRepository';
import { PlayerCharacterRepository } from '../repositories/PlayerCharacterRepository';
import { IMainframe } from '../models/Mainframe';

export class MainframeService {
  private mainframeRepository: MainframeRepository;
  private playerCharacterRepository: PlayerCharacterRepository;

  constructor() {
    this.mainframeRepository = new MainframeRepository();
    this.playerCharacterRepository = new PlayerCharacterRepository();
  }

  async createMainframe(characterId: string, systemName: string): Promise<IMainframe> {
    // Check if the character exists
    const character = await this.playerCharacterRepository.getPlayerCharacterById(characterId);
    if (!character) {
      throw new Error('Player character does not exist');
    }

    const newMainframeData: Partial<IMainframe> = {
      characterId: character._id,
      systemName,
      systemHealth: {
        cpu: 50,
        memoryVolume: 1.0,
        memoryPressure: 50,
        memoryTemperature: 50,
        storage: 50,
        network: 50,
        battery: 100,
      },
      osVersion: 'BPoS © 1987-2027 BPoS.Alpha.003',
      uptime: 0,
      processList: [],
      timeStamp: new Date(),
      timeOffsetInMilliseconds: 1000 * 60 * 60 * 24,
      systemTime: new Date(),
      authorizedInGameUsers: [],
      folderStructure: [],
      systemLogs: [],
      networkConnections: [],
    };

    const mainframe = await this.mainframeRepository.createMainframe(newMainframeData);

    // Add the mainframe to the character's list of mainframes
    character.mainframes.push(mainframe._id);
    await this.playerCharacterRepository.updatePlayerCharacter(character._id.toString(), character); // all the repositories take strings to handle IDs.

    return mainframe;
  }

  async getMainframeById(mainframeId: string): Promise<IMainframe | null> {
    return this.mainframeRepository.getMainframeById(mainframeId);
  }

  async getMainframesByCharacterId(characterId: string): Promise<IMainframe[]> {
    return this.mainframeRepository.getMainframesByCharacterId(characterId);
  }

  async deleteMainframe(mainframeId: string): Promise<void> {
    await this.mainframeRepository.deleteMainframe(mainframeId);
  }
}
