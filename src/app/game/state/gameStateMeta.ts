export class GameStateMeta {
  gameChapter: number;
  chapterProgress: number;
  currentObjective: string;
  discoveredHints: string[];
  isInQuicktime: boolean;
  currentSong: string;
  isPlayingSong: boolean;

  constructor() {
      this.gameChapter = 0;
      this.chapterProgress = 0;
      this.currentObjective = 'Null';
      this.discoveredHints = [];
      this.isInQuicktime = false;
      this.currentSong = 'reverie.mp3';
      this.isPlayingSong = false;
  }

  updateObjective(newObjective: string): void {
      this.currentObjective = newObjective;
  }

  addHint(hint: string): void {
      this.discoveredHints.push(hint);
  }
}
