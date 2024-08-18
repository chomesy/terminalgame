import { GameStateManager } from "../../state/gameStateManager";
import { CommandRegistry } from '../commandRegistry'; // Circular reference go whirrrrrrr

export class CommandImplementations {
  private gameStateManager: GameStateManager;
  private commandRegistry: CommandRegistry;

  constructor(gameStateManager: GameStateManager, commandRegistry: CommandRegistry) {
      this.gameStateManager = gameStateManager;
      this.commandRegistry = commandRegistry;
  }

  boot(args: string[]): string {
      this.gameStateManager.getState().gameStateMeta.gameChapter = 0; // TODO: convert this to updateState instead of setting variables directly
      this.gameStateManager.getState().gameStateMeta.chapterProgress = 1; // TODO: convert this to updateState instead of setting variables directly
      return 'Boot initialized';
  }

  help(args: string[]): string {
      return this.commandRegistry.getHelp(args[0]); // This is the only reference to the command registry at this point in commandImplementation
    }


  ls(args: string[]): string {
      const directory = args[0] || '.';
      const files = this.gameStateManager.getState().fileSystem.listFiles();
      return files.join('\n');
  }

  cd(args: string[]): string {
      const newDirectory = args[0];
      try {
          this.gameStateManager.getState().fileSystem.changeDirectory(newDirectory);
          return `Changed directory to ${newDirectory}`;
      } catch (error: any) {
          return error.message;
      }
  }

  cat(args: string[]): string {
      const filename = args[0];
      const file = this.gameStateManager.getState().fileSystem.getFile(filename);
      if (file) {
          return `Contents of ${file.filename}: ${file.content}`;
      } else {
          return `File not found: ${filename}`;
      }
  }

  sysinfo(): string {
      const sysInfo = this.gameStateManager.getState().systemInformation;
      return `
          OS Version: ${sysInfo.osVersion}
          Uptime: ${sysInfo.uptime}
          CPU Usage: ${sysInfo.systemHealth.cpu}%
          Memory Usage: ${sysInfo.systemHealth.memory}%
          Storage Usage: ${sysInfo.systemHealth.storage}%
          Network Usage: ${sysInfo.systemHealth.network}%
      `;
  }

  // Other methods as needed...

  getMethod(methodName: string): ((args: string[]) => string) | undefined {
      if (typeof (this as any)[methodName] === 'function') {
          return (this as any)[methodName].bind(this);
      }
      return undefined;
  }
}
