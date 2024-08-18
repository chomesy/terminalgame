// game/eventSystem.ts
import { GameStateManager } from './state/gameStateManager';

export class EventSystem {
    private gameStateManager: GameStateManager;

    constructor(gameStateManager: GameStateManager) {
        this.gameStateManager = gameStateManager;
    }

    checkTriggers(): void {
        const state = this.gameStateManager.getState();
        // Implement logic for events based on the game state

        // Initialization Trigger: Chapter 0, Chapter Progress 0
        if (state.gameStateMeta.gameChapter === 0 && state.gameStateMeta.chapterProgress === 0) {
            
            // ...
        }
    }
}
