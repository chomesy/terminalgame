import { Command } from './command';
import { GameStateManager } from '../state/gameStateManager';
import { StoryContent } from '@/app/game/storyContent';
import { commandsConfig } from './config/commandsConfig';
import { CommandImplementations } from './config/commandImplementations';

export class CommandRegistry {
    private commands: Map<string, Command>;
    private commandImplementations: CommandImplementations;
    private gameStateManager: GameStateManager;
    private storyContent: StoryContent;

    constructor(gameStateManager: GameStateManager, storyContent: StoryContent, commandImplementations: CommandImplementations = new CommandImplementations(gameStateManager)) {
        this.gameStateManager = gameStateManager;
        this.storyContent = storyContent;
        this.commandImplementations = commandImplementations;
        this.commands = new Map<string, Command>();

        this.registerDefaultCommands();
    }

    private registerDefaultCommands(): void {
        commandsConfig.forEach((commandConfig) => {
          const action = this.commandImplementations.getMethod(commandConfig.name);
          if (action) {
            const command = new Command(commandConfig.name, commandConfig.description, action);
            this.registerCommand(command);
          }
          else {
            console.error(`No method named ${commandConfig.name} found on CommandImplementations`);
            }
        })
    }

    private registerCommand(command: Command): void {
        this.commands.set(command.name, command);
    }

    getCommand(commandName: string): Command | undefined {
        return this.commands.get(commandName);
    }

    getHelp(commandName?: string): string {
        if (commandName) {
            const command = this.getCommand(commandName);
            if (command) {
                return `${command.name}: ${command.description}`;
            } else {
                return `Command not found: ${commandName}`;
            }
        } else {
            return Array.from(this.commands.values())
                .map(command => `${command.name}: ${command.description}`)
                .join('\n');
        }
    }

}
