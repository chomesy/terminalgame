// game/gameLoop.ts
import { GameStateManager } from './state/gameStateManager';
import { CommandParser } from './commandParser';
import { ActionDispatcher } from './commandHandlers/actionDispatcher';
import { EventSystem } from './eventSystem';
import { CommandRegistry } from './commandHandlers/commandRegistry';
import { StoryContent } from './storyContent';

export class GameLoop {
    private gameStateManager: GameStateManager;
    private commandParser: CommandParser;
    private actionDispatcher: ActionDispatcher;
    private eventSystem: EventSystem;
    private storyContent: StoryContent;
    private commandRegistry: CommandRegistry;

    

    constructor() {
        this.gameStateManager = new GameStateManager();
        this.gameStateManager.getState().systemLog.addLog(`Logging active`); 
        this.commandParser = new CommandParser();
        this.gameStateManager.getState().systemLog.addLog(`Command parser initialized`);
        this.storyContent = new StoryContent();
        this.commandRegistry = new CommandRegistry(this.gameStateManager); // Command Registry needs the GameStateManager so it can update the state
        this.gameStateManager.getState().systemLog.addLog(`Command registry initialized`);
        this.actionDispatcher = new ActionDispatcher(this.commandRegistry);
        this.gameStateManager.getState().systemLog.addLog(`Action dispatcher initialized`);
        this.eventSystem = new EventSystem(this.gameStateManager, this.commandRegistry); // Event System needs the GameStateManager so it can update the state, and commandRegistry to add new commands
        this.gameStateManager.getState().systemLog.addLog(`~~~~~~~~~~~~~~~~~~~`);
        this.gameStateManager.getState().systemLog.addLog(`Systems initialized. Please proceed.`);
        this.gameStateManager.getState().systemLog.addLog(`~~~~~~~~~~~~~~~~~~~`);
        this.idleLoop; // Run the idle loop to check triggers and start the game
    }

    start(input: string): string[] {

        // Parse the command
        const command = this.commandParser.parse(input);

        // Capture folder location during execution
        const currentFolder = this.gameStateManager.getState().fileSystem.getCurrentDirectory();

        // Add command to the log before executing
        this.updateLog(`$${this.gameStateManager.getState().userInformation.username} (${currentFolder}) > ${input}`);

        // Execute the command and get a response
        const response = this.actionDispatcher.executeCommand(command);

        // Add response to the terminal output
        this.updateLog(`${response}`);

        // Check if the command resulted in a state change
        if (this.eventSystem.checkAndExecuteTriggers()) { // Handle any triggers based on the new state
            this.idleLoop();
        }
        return ["Null Return"];
    }

    /**
     * Executes a game loop that only checks triggers, and if found, loops again
     * 
     * This function will continue to call itself until the event system has no more triggers to execute.
     * 
     * @return {void} No return value.
     */
    idleLoop(): void { 
        if (this.eventSystem.checkAndExecuteTriggers()) {
            this.idleLoop(); // This will continue nesting until there are no triggers
        }
    }

    updateLog(logString: string): void {
        this.gameStateManager.getState().systemLog.addLog(logString);
    }

    getLog(): string [] {
        return this.gameStateManager.getState().systemLog.log
    }
}

