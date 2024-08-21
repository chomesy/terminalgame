import { CommandRegistry } from './commandRegistry';

export class ActionDispatcher {
    private commandRegistry: CommandRegistry;

    constructor(commandRegistry: CommandRegistry) {
        this.commandRegistry = commandRegistry;
    }

    executeCommand(command: string): string {
        const [baseCommand, ...args] = command.split(' ');
        const commandObject = this.commandRegistry.getCommand(baseCommand);

        if (commandObject) {
            return commandObject.action(args);
        } else if (baseCommand === 'help') {
            return this.commandRegistry.getHelp(args[0]);
        } else {
            return `Unknown command: ${command}
Type 'help' for a list of available commands.`;
        }
    }
}
