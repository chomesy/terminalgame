

class quickTimeEvent {
  name: string;
  input: string;
  output: string;

  constructor (name: string) {
    this.name = name;
    this.input = "";
    this.output = "";
  }

  onTextChange(input: string): void {
  }

  onTextSubmit(input: string): void {
  }

  parseInput(input: string): void {
  }
}
