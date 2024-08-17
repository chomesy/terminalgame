// game/inputHandler.ts
export class InputHandler {
  handleInputChange(e: React.ChangeEvent<HTMLInputElement>, setInput: (input: string) => void): void {
      setInput(e.target.value);
  }

  handleInputSubmit(e: React.FormEvent<HTMLFormElement>, input: string, processCommand: (command: string) => string | null): void {
      e.preventDefault();
      if (input.trim() === '') return;

      const response = processCommand(input);
      if (response) {
          // Add the command and response to the output
          // This can be handled by the Output Renderer
      }
  }
}
