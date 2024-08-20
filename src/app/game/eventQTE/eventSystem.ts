// game/eventSystem.ts
import { GameStateManager } from '../state/gameStateManager';
import { CommandRegistry } from '../commandHandlers/commandRegistry';

export class EventSystem {
    private gameStateManager: GameStateManager;
    private commandRegistry: CommandRegistry;

    constructor(gameStateManager: GameStateManager, commandRegistry: CommandRegistry) {
        this.gameStateManager = gameStateManager;
        this.commandRegistry = commandRegistry;
    }

    async checkAndExecuteTriggers(): Promise<boolean> {
        const state = this.gameStateManager.getState();

        // Implement logic for events based on the game state
        if (state.gameStateMeta.gameChapter === 0 && state.gameStateMeta.chapterProgress === 0) {
            await new Promise(resolve => setTimeout(resolve, 1000));
            this.gameStateManager.getState().systemLogStream.postInfoLog(
                `
    ~~~~~~~~~~~~~~~~
    User Detected   ... ... ... ... ... ... ... ...
    ... ... ... ... ... ... ... ... ... ... ... ...
    ... ... ... ... ... ... ... ... ... ... ... ...
    ... ... ... ... ... ... .. .       
    User ${state.userInformation.username} located.
    ~~~~~~~~~~~~~~~~
                `);
            
            await new Promise(resolve => setTimeout(resolve, 3000)); // wait for the text to type
            this.gameStateManager.getState().gameStateMeta.chapterProgress = 1;
            return true
        }

        if (state.gameStateMeta.gameChapter === 0 && state.gameStateMeta.chapterProgress === 1) {
            this.commandRegistry.addChapterProgressCommands();
            this.gameStateManager.getState().gameStateMeta.chapterProgress = 2;
            return true
        }

        if (state.gameStateMeta.gameChapter === 0 && state.gameStateMeta.chapterProgress === 3) {
            await new Promise(resolve => setTimeout(resolve, 12000)); // wait for the boot text to type
            this.commandRegistry.addChapterProgressCommands();
            this.gameStateManager.getState().gameStateMeta.chapterProgress = 4;
            return true
        }

        return false
    }
}