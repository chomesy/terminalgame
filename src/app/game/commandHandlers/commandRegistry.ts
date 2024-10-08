import { Command } from './command';
import { GameStateManager } from '../state/gameStateManager';
import { commandsConfig } from './config/commandsConfig';
import { CommandImplementations } from './config/commandImplementations';

export class CommandRegistry {
    private commands: Map<string, Command>;
    private commandImplementations: CommandImplementations;
    private gameStateManager: GameStateManager;

    constructor(gameStateManager: GameStateManager, commandImplementations: CommandImplementations = new CommandImplementations(gameStateManager, this)) {
        this.gameStateManager = gameStateManager;
        this.commandImplementations = commandImplementations;
        this.commands = new Map<string, Command>();

        this.addCommandsOnStateChange();
    }


    private addCommandsOnStateChange(): void {
        // filter the commands list to the current state
        const filteredCommands = commandsConfig.filter((commandConfig) => {
            return commandConfig.progressCheck.chapter === this.gameStateManager.getState().gameStateMeta.gameChapter &&
                commandConfig.progressCheck.progress === this.gameStateManager.getState().gameStateMeta.chapterProgress;
        });

        filteredCommands.forEach((commandConfig) => {
            const action = this.commandImplementations.getMethod(commandConfig.name);
            if (action) {
                const command = new Command(commandConfig.name, commandConfig.description, action);
                this.registerCommand(command);
            }
            else {
                console.error(`No method named ${commandConfig.name} found on CommandImplementations`);
            }
        });
    }

    private registerCommand(command: Command): void {
        this.commands.set(command.name, command);
        this.gameStateManager.getState().systemLogStream.postInfoLog(`Command '${command.name}' registered`);
    }

    addChapterProgressCommands(): void {
        this.addCommandsOnStateChange();
    }

    getCommand(commandName: string): Command | undefined {
        return this.commands.get(commandName);
    }

    getCommandList(): string[] {
        return Array.from(this.commands.keys());
    }

    getHelp(commandName?: string): string {
        if (commandName) {
            const command = this.getCommand(commandName);
            if (command) {
                return `
    ${command.name}: ${command.description}
`;
            } else {
                return `Command not found: ${commandName}`;
            }
        } else {
            return (
                `---- Currently Registered Commands ---- \n` + Array.from(this.commands.values())
                .map(command => `${command.name}: ${command.description}`)
                .join('\n')
        );}
    }

}
