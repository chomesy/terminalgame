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

      const jibberish = [];
      for (let line = 0; line < 5; line++) {
        for (let i = 0; i < 25; i++) {
            jibberish.push(String.fromCharCode(Math.floor(Math.random() * 255)));
        }
        jibberish.push('\n');
      }
      this.gameStateManager.getState().gameStateMeta.gameChapter = 0; // TODO: convert this to updateState instead of setting variables directly
      this.gameStateManager.getState().gameStateMeta.chapterProgress = 3; // TODO: convert this to updateState instead of setting variables directly
      return `
[00:00:00.000] > [POWER ON]
[00:00:00.013] > [FIRMWARE: REV 93.21b]
[00:00:00.029] > [CHECKSUM: 0x9A7C3F2B] :: [PASS]
[00:00:00.056] > [ARRAY: 48xA] :: [ONLINE]
[BPU STATUS: *ACTIVE*]
[CORE 01-08] :: [OK] | [SYNC: TRUE]
[NEN-Q: 5/5] :: [VALID]
~~~~~~~~~~~~~~~~~~~~~~
[00:00:00.204] > [STORAGE: OXXOOOOOXO:G&s] :: [INTEGRITY: underwhelming :(]
[00:00:00.239] > [ALP_C: ☑] [BET_C: ☑] [GAM_C: ☑]
[00:00:00.303] < [NN RL INTERFACE: [RELU, RELU, RELU, RELU...]: ☑]
[00:00:00.336] > [ENV MODULES: ATM ☑ | BIO ☑ | NFB ☑]
[00:00:00.373] < [SECURITY: ADAPTIVE: 1]
   <UNAUTH> > AuNE _______|_|
   <UNAUTH> > AuNE ___|_____|
   <UNAUTH> > AuNE ______|__|
   <UNAUTH> > AuNE _____
              ,halting ...
[00:00:00.408] > [TIME SYNC: NET ⬆ | user_sync~~0~~]
[00:00:00.436] > [acc%f5: 98.7%]
[00:00:00.471] > [PERIPH: IN ⬆ | OUT ⬆]
[00:00:00.497] > [LIBRARY: SYNC ⬆]
[00:00:00.544] > [DIAGNOSTICS: COMPLETE]
[00:00:00.554] > [OS: v4.93b]
[00:00:00.563] > [BOOT: END]
   <UNAUTH> clear
   ${jibberish}

   <UNAUTH> clear --all




      `
      ;
  }

  help(args: string[]): string {
      return this.commandRegistry.getHelp(args[0]); // This is the only reference to the command registry at this point in commandImplementation
    }

    // Mainly for debug
  getstate(): string {
      return (this.gameStateManager.getState().gameStateMeta.gameChapter + ' ' + this.gameStateManager.getState().gameStateMeta.chapterProgress).toString();
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
          System Time: ${sysInfo.getSystemTime().toLocaleString()}
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
