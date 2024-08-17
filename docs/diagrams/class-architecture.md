# Class Diagram - TextAdventureGame

## GameStateManager

- **Attributes**:
  - `location: string`
  - `inventory: string[]`
- **Methods**:
  - `getState(): GameState`
  - `updateState(updates: Partial<GameState>): void`

## InputHandler

- **Methods**:
  - `handleInputChange(e: React.ChangeEvent<HTMLInputElement>, setInput: (input: string) => void): void`
  - `handleInputSubmit(e: React.FormEvent<HTMLFormElement>, input: string, processCommand: (command: string) => string | null): void`

## CommandParser

- **Methods**:
  - `parse(command: string): string`

## ActionDispatcher

- **Attributes**:
  - `gameStateManager: GameStateManager`
- **Methods**:
  - `executeCommand(command: string): string`
  - `getLocationDescription(location: string): string`

## OutputRenderer

- **Methods**:
  - `render(lines: string[], newLine: string): string[]`

## EventSystem

- **Attributes**:
  - `gameStateManager: GameStateManager`
- **Methods**:
  - `checkTriggers(): void`

## GameLoop

- **Attributes**:
  - `gameStateManager: GameStateManager`
  - `inputHandler: InputHandler`
  - `commandParser: CommandParser`
  - `actionDispatcher: ActionDispatcher`
  - `outputRenderer: OutputRenderer`
  - `eventSystem: EventSystem`
- **Methods**:
  - `start(input: string): string[]`
