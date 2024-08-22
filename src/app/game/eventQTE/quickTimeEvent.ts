

export default abstract class QuickTimeEvent {
  name: string;


  constructor (name: string) {
    this.name = name;
  }

  /**
   * Starts the Quick Time Event (QTE).
   * This method is called by the game loop in lieu of the "start" loop.
   * 
   */
  runQTE(): void {
  }

  onTextChange(input: string): void {
  }

  onTextSubmit(input: string): void {
  }
}
