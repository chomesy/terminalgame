// game/gameState.ts
export interface GameState {
  location: string;
  inventory: string[];
}

export class GameStateManager {
  private state: GameState;

  constructor() {
      this.state = {
          location: 'startingPoint',
          inventory: [],
      };
  }

  getState(): GameState {
      return this.state;
  }

  updateState(updates: Partial<GameState>): void {
      this.state = { ...this.state, ...updates };
  }
}
