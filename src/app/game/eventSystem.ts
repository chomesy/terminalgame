// game/eventSystem.ts
import { GameStateManager } from './state/gameState';

export class EventSystem {
    private gameStateManager: GameStateManager;

    constructor(gameStateManager: GameStateManager) {
        this.gameStateManager = gameStateManager;
    }

    checkTriggers(): void {
        const state = this.gameStateManager.getState();
        // Implement logic for events based on the game state
    }
}
