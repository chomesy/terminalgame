import { GameState } from './gameState';

export class GameStateManager {
  private state: GameState;

    /**
     * Initializes a new instance of the GameStateManager class.
     * The constructor creates a new GameState object and assigns it to the state property.
     * Note: GameStateManager is intended to compartmentalize and provide an instantiated handler
     *       for other objects that need to change the game state.
     */
  constructor() {
      this.state = new GameState();
  }

  getState(): GameState {
      return this.state;
  }

  updateState(updates: Partial<GameState>): void {
      // Example of applying updates (more sophisticated merging logic might be needed depending on use case)
      Object.assign(this.state, updates);
  }
}
