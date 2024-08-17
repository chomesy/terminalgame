import { GameStateManager } from "../../state/gameStateManager";
export class CommandImplementations {
  private gameStateManager: GameStateManager;

  constructor(gameStateManager: GameStateManager) {
      this.gameStateManager = gameStateManager;
  }

  ls(): string {
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
      const files = this.gameStateManager.getState().fileSystem.listFiles();
      if (files.includes(filename)) {
          return `Contents of ${filename}: <file content here>`;
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
