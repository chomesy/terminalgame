// game/gameLoop.ts
import { GameStateManager } from './gameState';
import { InputHandler } from './inputHandler';
import { CommandParser } from './commandParser';
import { ActionDispatcher } from './actionDispatcher';
import { OutputRenderer } from './outputRenderer';
import { EventSystem } from './eventSystem';

export class GameLoop {
    private gameStateManager: GameStateManager;
    private inputHandler: InputHandler;
    private commandParser: CommandParser;
    private actionDispatcher: ActionDispatcher;
    private outputRenderer: OutputRenderer;
    private eventSystem: EventSystem;

    constructor() {
        this.gameStateManager = new GameStateManager();
        this.inputHandler = new InputHandler();
        this.commandParser = new CommandParser();
        this.actionDispatcher = new ActionDispatcher(this.gameStateManager);
        this.outputRenderer = new OutputRenderer();
        this.eventSystem = new EventSystem(this.gameStateManager);
    }

    start(input: string): string[] {
        const command = this.commandParser.parse(input);
        const response = this.actionDispatcher.executeCommand(command);
        this.eventSystem.checkTriggers();

        // Add command and response to the terminal output
        let lines: string[] = [];
        lines = this.outputRenderer.render(lines, `> ${input}`);
        lines = this.outputRenderer.render(lines, response);

        return lines;
    }
}
