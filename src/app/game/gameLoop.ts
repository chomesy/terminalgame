// game/gameLoop.ts
import { GameStateManager } from './state/gameStateManager';
import { InputHandler } from './inputHandler';
import { CommandParser } from './commandParser';
import { ActionDispatcher } from './commandHandlers/actionDispatcher';
import { OutputRenderer } from './outputRenderer';
import { EventSystem } from './eventSystem';
import { CommandRegistry } from './commandHandlers/commandRegistry';
import { StoryContent } from './storyContent';

export class GameLoop {
    private gameStateManager: GameStateManager;
    private inputHandler: InputHandler;
    private commandParser: CommandParser;
    private actionDispatcher: ActionDispatcher;
    private outputRenderer: OutputRenderer;
    private eventSystem: EventSystem;
    private storyContent: StoryContent;
    private commandRegistry: CommandRegistry;

    constructor() {
        this.gameStateManager = new GameStateManager(); 
        this.inputHandler = new InputHandler();
        this.commandParser = new CommandParser();
        this.storyContent = new StoryContent();
        this.commandRegistry = new CommandRegistry(this.gameStateManager); // Command Registry needs the GameStateManager so it can update the state
        this.actionDispatcher = new ActionDispatcher(this.commandRegistry);
        this.outputRenderer = new OutputRenderer();
        this.eventSystem = new EventSystem(this.gameStateManager); // Event System needs the GameStateManager so it can update the state
    }

    start(input: string): string[] {
        // Prepare a response
        let lines: string[] = [];

        // Parse the command
        const command = this.commandParser.parse(input);

        // Capture folder location during execution
        const currentFolder = this.gameStateManager.getState().fileSystem.getCurrentDirectory();

        // Execute the command and get a response
        const response = this.actionDispatcher.executeCommand(command);

        // After executing the command, check if the state has changed
        const currentState = this.gameStateManager.getState();
        console.log('State after command execution:', currentState);

        // Check if the command resulted in a state change
        this.eventSystem.checkTriggers(); // Handle any triggers based on the new state

        // Add command and response to the terminal output
        lines = this.outputRenderer.render(lines, `$UNAUTH (${currentFolder}) > ${input}`);
        lines = this.outputRenderer.render(lines, `${response}`);

        return lines;
    }
}

