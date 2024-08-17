import { UserInformation } from "./userInformation";
import { FileSystem } from "./filehierarchy/fileSystem";
import { SystemInformation } from "./systemInformation";
import { NetworkInformation } from "./networkInformation";
import { SessionInformation } from "./sessionInformation";
import { HackingTools } from "./hackingTools";
import { GameStateMeta } from "./gameStateMeta";

export class GameState {
  userInformation: UserInformation;
  fileSystem: FileSystem;
  systemInformation: SystemInformation;
  networkInformation: NetworkInformation;
  sessionInformation: SessionInformation;
  hackingTools: HackingTools;
  gameStateMeta: GameStateMeta;

  constructor() {
      this.userInformation = new UserInformation();
      this.fileSystem = new FileSystem();
      this.systemInformation = new SystemInformation();
      this.networkInformation = new NetworkInformation();
      this.sessionInformation = new SessionInformation();
      this.hackingTools = new HackingTools();
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
