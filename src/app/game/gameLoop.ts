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
    private commandRegistry: CommandRegistry;
    private storyContent: StoryContent;

    constructor() {
        this.gameStateManager = new GameStateManager();
        this.inputHandler = new InputHandler();
        this.commandParser = new CommandParser();
        this.storyContent = new StoryContent();
        this.commandRegistry = new CommandRegistry(this.gameStateManager, this.storyContent);
        this.actionDispatcher = new ActionDispatcher(this.commandRegistry);
        this.outputRenderer = new OutputRenderer();
        this.eventSystem = new EventSystem(this.gameStateManager);
    }

    start(input: string): string[] {
        // Parse the command
        const command = this.commandParser.parse(input);

        // Execute the command and get a response
        const response = this.actionDispatcher.executeCommand(command);

        // After executing the command, check if the state has changed
        const currentState = this.gameStateManager.getState();
        console.log('State after command execution:', currentState);

        // Check if the command resulted in a state change
        this.eventSystem.checkTriggers(); // Handle any triggers based on the new state

        // Add command and response to the terminal output
        let lines: string[] = [];
        lines = this.outputRenderer.render(lines, `   $UNAUTH > ${input}`);
        lines = this.outputRenderer.render(lines, `@ch.cl.pub > ${response}`);

        return lines;
    }
}

