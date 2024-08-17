import { GameState } from './gameState';

export class GameStateManager {
  private state: GameState;

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
