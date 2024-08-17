### UML Class Diagram - TextAdventureGame

```mermaid
classDiagram
    %% GameStateProvider Context
    class GameStateProvider {
        + useGameState(): GameLoop
    }

    %% GameLoop class with associated modules
    class GameLoop {
        - gameStateManager: GameStateManager
        - inputHandler: InputHandler
        - commandParser: CommandParser
        - actionDispatcher: ActionDispatcher
        - outputRenderer: OutputRenderer
        - eventSystem: EventSystem
        + start(input: string): string[]
    }

    class GameStateManager {
        - state: GameState
        + getState(): GameState
        + updateState(updates: Partial<GameState>): void
    }

    class InputHandler {
        + handleInputChange(e: React.ChangeEvent<HTMLInputElement>, setInput: (input: string) => void): void
        + handleInputSubmit(e: React.FormEvent<HTMLFormElement>, input: string, processCommand: (command: string) => string | null): void
    }

    class CommandParser {
        + parse(command: string): string
    }

    class ActionDispatcher {
        - gameStateManager: GameStateManager
        + executeCommand(command: string): string
        + getLocationDescription(location: string): string
    }

    class OutputRenderer {
        + render(lines: string[], newLine: string): string[]
    }

    class EventSystem {
        - gameStateManager: GameStateManager
        + checkTriggers(): void
    }

    %% TerminalEmulator with note for client-side execution
    class TerminalEmulator {
        - input: string
        - lines: string[]
        + handleInputChange(e: React.ChangeEvent<HTMLInputElement>): void
        + handleInputSubmit(e: React.FormEvent<HTMLFormElement>): void
    }

    TerminalEmulator : <<use client>>


    %% Relationships between the classes
    GameStateProvider o-- GameLoop : provides
    GameLoop --> GameStateManager
    GameLoop --> InputHandler
    GameLoop --> CommandParser
    GameLoop --> ActionDispatcher
    GameLoop --> OutputRenderer
    GameLoop --> EventSystem

    TerminalEmulator --> GameLoop
    TerminalEmulator --> InputHandler

    ActionDispatcher --> GameStateManager
    EventSystem --> GameStateManager
