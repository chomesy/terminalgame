import { CommandRegistry } from './commandRegistry';

export class ActionDispatcher {
    private commandRegistry: CommandRegistry;

    // Debug Notes: testing to see if the action dispatcher can be a listener
    constructor(commandRegistry: CommandRegistry) {
        this.commandRegistry = commandRegistry;
    }

    

    async executeCommand(command: string): Promise<string> {
        const [baseCommand, ...args] = command.split(' ');
        const commandObject = this.commandRegistry.getCommand(baseCommand);

        if (commandObject) {
            return commandObject.action(args);
        } else {
            return `Unknown command: ${command}
Type 'help' for a list of available commands.`;
        }
    }
}
