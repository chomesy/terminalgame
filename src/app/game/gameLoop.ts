// game/gameLoop.ts
import { GameStateManager } from './state/gameStateManager';
import { CommandParser } from './commandParser';
import { ActionDispatcher } from './commandHandlers/actionDispatcher';
import { EventSystem } from './eventQTE/eventSystem';
import { CommandRegistry } from './commandHandlers/commandRegistry';
import { StoryContent } from './storyContent';

import { SystemLog, logObject } from './state/substates/systemLog';
import { SystemLogStream } from './state/substates/systemLogStream';
import { GameState } from './state/gameState';

export class GameLoop {
    private gameStateManager: GameStateManager;
    private commandParser: CommandParser;
    private actionDispatcher: ActionDispatcher;
    private eventSystem: EventSystem;
    private storyContent: StoryContent;
    private commandRegistry: CommandRegistry;

    

    constructor() {
        this.gameStateManager = new GameStateManager();
        this.commandParser = new CommandParser();
        this.storyContent = new StoryContent();
        this.commandRegistry = new CommandRegistry(this.gameStateManager); // Command Registry needs the GameStateManager so it can update the state
        this.actionDispatcher = new ActionDispatcher(this.commandRegistry);
        this.eventSystem = new EventSystem(this.gameStateManager, this.commandRegistry); // Event System needs the GameStateManager so it can update the state, and commandRegistry to add new commands
        this.idleLoop(); // Run the idle loop to check triggers and start the game
    }

    async start(input: string): Promise<void> {

        // Parse the command
        const command = this.commandParser.parse(input);

        // Capture folder location during execution
        const currentFolder = this.gameStateManager.getState().fileSystem.getCurrentDirectory();

        // Branching paths for whether the user is in a QTE or not
        if (this.gameStateManager.getState().gameStateMeta.isInQuicktime) {
            // This just writes the command to the stream without executing the command
            this.gameStateManager.getState().systemLogStream.postUserCommandLog(input, this.gameStateManager.getState().userInformation.username);
            return;
        } else {
            this.gameStateManager.getState().systemLogStream.postUserCommandLog(input, this.gameStateManager.getState().userInformation.username);
            // Execute the command and get a response
            const response = await this.actionDispatcher.executeCommand(command);

            // Add response to the terminal output
            this.gameStateManager.getState().systemLogStream.postTerminalResponseLog(response);
        }

        // Check if the command resulted in a state change
        this.eventSystem.checkAndExecuteTriggers().then((result) => { // Handle any triggers based on the new state
            if (result) {
                this.idleLoop();
            }
        });
    }

    /**
     * Executes a game loop that only checks triggers, and if "true", loops again
     * 
     * This function will continue to call itself until the event system has no more triggers to execute.
     * 
     * @return {void} No return value.
     */
    idleLoop(): void { 
        this.eventSystem.checkAndExecuteTriggers().then((result) => { // Handle any triggers based on the new state
            if (result) {
                this.idleLoop();
            }
        });
    }

    quickTimeLoop(input : string): void {
        
    }

    // The following are public methods to get items needed by the terminal console

    getLogStream(): SystemLogStream {
        return this.gameStateManager.getState().systemLogStream;
    }

    getUsername(): string {
        return this.gameStateManager.getState().userInformation.username
    }

    getCurrentCommandsList(): string[] {
        return this.commandRegistry.getCommandList();
    }

    getCurrentFilesList(): string[] {
        return this.gameStateManager.getState().fileSystem.listContents();
    }

    getCurrentFolderName(): string {
        return this.gameStateManager.getState().fileSystem.getCurrentDirectory();
    }

    getState(): GameState {
        return this.gameStateManager.getState();
    }
}

