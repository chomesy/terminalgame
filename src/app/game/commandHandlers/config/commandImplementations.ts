import { GameStateManager } from "../../state/gameStateManager";
import { CommandRegistry } from '../commandRegistry'; // Circular reference go whirrrrrrr
import LoginQTE from '../../eventQTE/qteRepository/login';

export class CommandImplementations {
  private gameStateManager: GameStateManager;
  private commandRegistry: CommandRegistry;

  constructor(gameStateManager: GameStateManager, commandRegistry: CommandRegistry) {
      this.gameStateManager = gameStateManager;
      this.commandRegistry = commandRegistry;
  }

  initialize(args: string[]): string {

      const jibberish = [];
      for (let line = 0; line < 5; line++) {
        for (let i = 0; i < 25; i++) {
            jibberish.push(String.fromCharCode(Math.floor(Math.random() * 255)));
        }
        jibberish.push('\n');
      }
      let returnString = `
[00:00:00.000] > [INITIALIZING]
[00:00:00.013] > [FIRMWARE: REV 93.21b]
[00:00:00.029] > [CHECKSUM: 0x9A7C3F2B] :: [PASS]
[00:00:00.056] > <SYS.root> use "[ARRAY: 48xA]"
--[BPU STATUS: *ACTIVE*]
--[CORE 01-08] :: [OK] | [SYNC: TRUE]
--[NEN-Q: 5/5] :: [VALID]
--[FIND_BIND :: AuNE, $user] 
~~~~~~~~~~~~~~~~~~~~~~
[00:00:02.204] > [STORAGE: ${this.gameStateManager.getState().systemInformation.systemHealth.memoryVolume} cuFt] :: [INTEGRITY: underwhelming :(]
[00:00:02.239] > [ALP_C: ☑] [BET_C: ☑] [GAM_C: ☑]
[00:00:02.303] < [NN RL INTERFACE: [RELU, RELU, RELU, RELU...]: ☑]
[00:00:02.336] > [ENV MODULES: ATM ☑ | BIO ☑ | NFB ☑]
[00:00:02.373] < [SECURITY: ADAPTIVE: 1]
   <UNAUTH> > AuNE _______|_|
   <UNAUTH> > AuNE ___|_____|
   <UNAUTH> > AuNE ______|__|
   <UNAUTH> > AuNE _____
              ,halting ...
<SYS> reauth ...
              ,halting ...
<SYS> reauth ...
              ,halting ...
[00:00:04.408] > [TIME SYNC: NET ⬆ | user_sync~~0~~]
[00:00:04.436] > [acc%f5: 98.7%]
[00:00:04.471] > [PERIPH: <SYS> reaIuNt h⬆. |.   .OUT ⬆]
~~~~~~~~~~~~~~~~~~~~~,h~a~lt~in~g~~~~.~~~~.~~~~~~.~
[00:00:05.297] > [LIBRARY: SYNC] ... .. ... ... ... [COMPLETE]
[00:00:05.544] > [DIAGNOSTICS: DETECT !Fallback]
[00:00:05.554] > [OS: ${this.gameStateManager.getState().systemInformation.osVersion}!Fallback]
[00:00:05.563] > [INITIALIZE: END]
   <UNAUTH> clear
   ${jibberish}

   <UNAUTH> clear --all




`
      this.gameStateManager.getState().gameStateMeta.gameChapter = 0; // TODO: convert this to updateState instead of setting variables directly
      this.gameStateManager.getState().gameStateMeta.chapterProgress = 3; // TODO: convert this to updateState instead of setting variables directly
      this.gameStateManager.getState().fileSystem.mountFilesystem();
      this.gameStateManager.getState().fileSystem.createFile(`initializelog.txt`, returnString);
      return returnString;
      ;
  }

  help(args: string[]): string {
      return this.commandRegistry.getHelp(args[0]); // This is the only reference to the command registry at this point in commandImplementation
    }

    // Mainly for debug
  getstate(): string {
      return (this.gameStateManager.getState().gameStateMeta.gameChapter + ' ' + this.gameStateManager.getState().gameStateMeta.chapterProgress).toString();
  }


  list(args: string[]): string {
      const directory = args[0] || '.'; // parameters don't matter at this point
      const objects = this.gameStateManager.getState().fileSystem.listContents();
      return `---- Contents: ----
${objects.join('\n')}`;
}

  cd(args: string[]): string {
      const newDirectory = args[0];
      try {
          const response = this.gameStateManager.getState().fileSystem.changeDirectory(newDirectory);
          const fileList = this.gameStateManager.getState().fileSystem.listContents().join('\n');
          return `${response}
    ---- Contents: ----
${fileList}
`;
      } catch (error: any) {
          return error.message;
      }
  }

  read(args: string[]): string {
      const filename = args[0];
      const file = this.gameStateManager.getState().fileSystem.getFile(filename);
      if (file) {
          return `
          Contents of ${file.filename}: 
          [File Start]
          ${file.content}
          [File End]
          `;
      } else {
          return `File not found: ${filename}`;
      }
  }

  sysinfo(): string {
      // Refresh the system info before gathering
      this.gameStateManager.getState().systemInformation.refreshSystemInfo();
      const sysInfo = this.gameStateManager.getState().systemInformation;
      return `
          OS Version: ${sysInfo.osVersion}
          Uptime: ${sysInfo.uptime}
          CPU Usage: ${sysInfo.systemHealth.cpu}%
          Alt-Neon Volume: ${sysInfo.systemHealth.memoryVolume} CuFt
          Alt-Neon Pressure: ${sysInfo.systemHealth.memoryPressure} PSI
          Alt-Neon Temperature: ${sysInfo.systemHealth.memoryTemperature} °C 
          Storage Usage: ${sysInfo.systemHealth.storage} TInT
          Network Usage: ${sysInfo.systemHealth.network}%
          System Time: ${sysInfo.getSystemTime().toLocaleString()}
      `;
  }

  whoami(): string {
    return this.gameStateManager.getState().userInformation.getUserInfo();
  }

  async login(args: string[]): Promise<string> {
    if (args.length < 2) {
        //Quicktime event
        const currentQTE = new LoginQTE(this.gameStateManager, this.commandRegistry);
        await currentQTE.runQTE();
        return `LOGIN METHOD ENDED`
    }
    else {
        const username = args[0];
        const password = args[1];
    }
    return ``;

}

  // Other methods as needed...

  getMethod(methodName: string): ((args: string[]) => string) | undefined {
      if (typeof (this as any)[methodName] === 'function') {
          return (this as any)[methodName].bind(this);
      }
      return undefined;
  }
}
