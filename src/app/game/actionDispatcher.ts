import { GameStateManager } from './gameState';
import { storyContent } from './storyContent';

export class ActionDispatcher {
    private gameStateManager: GameStateManager;

    constructor(gameStateManager: GameStateManager) {
        this.gameStateManager = gameStateManager;
    }

    executeCommand(command: string): string {
        const state = this.gameStateManager.getState();

        if (command === 'look') {
            return this.getLocationDescription(state.location);
        }

        if (command.startsWith('go ')) {
            const direction = command.split(' ')[1];
            if (direction === 'north' && state.location === 'startingPoint') {
                this.gameStateManager.updateState({ location: 'northRoom' });
                return this.getLocationDescription('northRoom');
            }
            return `You can't go ${direction} from here.`;
        }

        return `Unknown command: ${command}`;
    }

    private getLocationDescription(location: string): string {
        if (location in storyContent.locations) {
            return storyContent.locations[location as keyof typeof storyContent.locations];
        }
        return 'There is nothing special here.';
    }
}
