import QuickTimeEvent from "../quickTimeEvent";
import { GameStateManager } from "../../state/gameStateManager";
import { CommandRegistry } from "../../commandHandlers/commandRegistry";
import { logObject } from "../../state/substates/systemLog";
import { Subscription } from "rxjs";

export default class LoginQTE extends QuickTimeEvent {
  private gameStateManager: GameStateManager;
  private commandRegistry: CommandRegistry;
  private subscription: Subscription;
  private username: string | null;
  private password: string | null;

  constructor(gameStateManager: GameStateManager, commandRegistry: CommandRegistry) {
    super("Login");
    this.gameStateManager = gameStateManager;
    this.commandRegistry = commandRegistry;
    this.username = null;
    this.password = null;
    
    this.subscription = this.gameStateManager.getState().systemLogStream.getObservable().subscribe(( 
      (value: logObject) => {
      this.onLogDetected(value);
    }
    ));

  }

  async runQTE(): Promise<void> {
    if(this.gameStateManager.getState().gameStateMeta.isInQuicktime) {
      this.gameStateManager.getState().systemLogStream.postErrorLog("Multiple halting events in progress");
      return;
    }
    this.gameStateManager.getState().systemLogStream.postInfoLog("Login Process started");
    this.gameStateManager.getState().gameStateMeta.isInQuicktime = true;

    this.gameStateManager.getState().systemLogStream.postInfoLog(`Enter Username`);

    // THIS IS JANK!!
    // the constructor sets up the listener/subscriber.
    // RunQTE just spits out the entry text and blocks the "start" loop in "game loop" from processing commands
    // onLogDetected fires for each entry until it halts the QTE (isInQuicktime = false)
    // Lots of opportunities for QTEs to have memory leaks
  }

  onLogDetected(log: logObject): void {
    let logData = log;
    console.log(logData)

    if (logData.logType === `command`) {
      this.onTextSubmit(logData.logText);
    }
  }

  onTextChange(input: string): void {
    //unused
  }

  onTextSubmit(input: string): void {
    if (this.username === null) {
      this.username = input;
      this.gameStateManager.getState().systemLogStream.postInfoLog(`Username: ${this.username}`);
      this.gameStateManager.getState().systemLogStream.postInfoLog(`Enter Password`);
    } else if (this.password === null) {
      this.password = input;
      this.gameStateManager.getState().systemLogStream.postInfoLog(`Password: ${this.password}`);
    }

    if (this.username !== null && this.password !== null) {
      // TODO: Add logic for login
      this.gameStateManager.getState().userInformation.login(this.username, this.password);
      this.gameStateManager.getState().systemLogStream.postInfoLog(`Login Successful`);
      this.gameStateManager.getState().gameStateMeta.isInQuicktime = false;
      this.gameStateManager.getState().gameStateMeta.gameChapter = 1;
      this.gameStateManager.getState().gameStateMeta.chapterProgress = 0;
    }
  }


}

