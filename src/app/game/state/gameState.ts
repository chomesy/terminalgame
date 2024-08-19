import { UserInformation } from "./substates/userInformation";
import { FileSystem } from "./filehierarchy/fileSystem";
import { SystemInformation } from "./substates/systemInformation";
import { NetworkInformation } from "./substates/networkInformation";
import { SessionInformation } from "./substates/sessionInformation";
import { HackingTools } from "./substates/hackingTools";
import { SystemLog } from "./substates/systemLog";
import { SystemLogStream } from "./substates/systemLogStream";
import { GameStateMeta } from "./gameStateMeta";


/**
 * This class represents the entire game state.
 * It contains all the game objects and their properties.
 * @description This class represents the entire game state. It is intended to be serialized and deserialized, with no internal methods.
 * For objects that require editing or modification of GameState, use the GameStateManager class.
 * @class GameState
 */
export class GameState {
  userInformation: UserInformation;
  fileSystem: FileSystem; // File system is not current serializable. TODO: Serialize and deserialize
  systemInformation: SystemInformation;
  networkInformation: NetworkInformation;
  sessionInformation: SessionInformation;
  hackingTools: HackingTools;
  systemLog: SystemLog; // creating two log objects during debugging
  systemLogStream: SystemLogStream; // creating two log objects during debugging
  gameStateMeta: GameStateMeta;

  constructor() { //TODO: create a global config that can instantiate all subclasses
      this.userInformation = new UserInformation();
      this.fileSystem = new FileSystem();
      this.systemInformation = new SystemInformation();
      this.networkInformation = new NetworkInformation();
      this.sessionInformation = new SessionInformation();
      this.hackingTools = new HackingTools();
      this.systemLog = new SystemLog(); // creating two log objects during debugging
      this.systemLogStream = new SystemLogStream(); // creating two log objects during debugging
      this.gameStateMeta = new GameStateMeta();
  }

  // Serialize the entire game state to a JSON string
  // TODO: This is not going to work because the subclasses are not serializable.
  // For now, this and deserialize are not called
  public serialize(): string {
      return JSON.stringify(this);
  }

  // Deserialize and load the game state from a JSON string
  public static deserialize(serializedState: string): GameState {
      const state = JSON.parse(serializedState);

      const gameState = new GameState();
      gameState.userInformation = Object.assign(new UserInformation(), state.userInformation);
      gameState.fileSystem = new FileSystem(state.fileSystem);
      gameState.systemInformation = Object.assign(new SystemInformation(), state.systemInformation);
      gameState.networkInformation = Object.assign(new NetworkInformation(), state.networkInformation);
      gameState.sessionInformation = Object.assign(new SessionInformation(), state.sessionInformation);
      gameState.hackingTools = Object.assign(new HackingTools(), state.hackingTools);
      gameState.gameStateMeta = Object.assign(new GameStateMeta(), state.gameStateMeta);

      return gameState;
  }
}
