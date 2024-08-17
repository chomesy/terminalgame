import { UserInformation } from "./userInformation";
import { FileSystem } from "./fileSystem";
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
}
