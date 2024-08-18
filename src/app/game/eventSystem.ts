// game/eventSystem.ts
import { GameStateManager } from './state/gameStateManager';
import { CommandRegistry } from './commandHandlers/commandRegistry';

export class EventSystem {
    private gameStateManager: GameStateManager;
    private commandRegistry: CommandRegistry;

    constructor(gameStateManager: GameStateManager, commandRegistry: CommandRegistry) {
        this.gameStateManager = gameStateManager;
        this.commandRegistry = commandRegistry;
    }

    checkAndExecuteTriggers(): boolean {
        const state = this.gameStateManager.getState();

        // Implement logic for events based on the game state
        if (state.gameStateMeta.gameChapter === 0 && state.gameStateMeta.chapterProgress === 0) {
            this.gameStateManager.getState().systemLog.addLog('~~~~~~~~~~~~~~~~');
            this.gameStateManager.getState().systemLog.addLog('User Detected...');
            this.gameStateManager.getState().systemLog.addLog(`User ${state.userInformation.username} located.`);
            this.gameStateManager.getState().systemLog.addLog('~~~~~~~~~~~~~~~~');
            this.gameStateManager.getState().gameStateMeta.chapterProgress = 1;
            return true
        }

        if (state.gameStateMeta.gameChapter === 0 && state.gameStateMeta.chapterProgress === 2) {
            this.commandRegistry.addChapterProgressCommands();
            this.gameStateManager.getState().gameStateMeta.chapterProgress = 3;
            return true
        }

        return false
    }
}