export class GameStateMeta {
  gameProgress: number;
  currentObjective: string;
  discoveredHints: string[];

  constructor() {
      this.gameProgress = 0;
      this.currentObjective = 'Gain access to the enemy system';
      this.discoveredHints = [];
  }

  updateObjective(newObjective: string): void {
      this.currentObjective = newObjective;
  }

  addHint(hint: string): void {
      this.discoveredHints.push(hint);
  }
}
