"use client";

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { GameLoop } from '../game/gameLoop';

interface GameStateProviderProps {
    children: ReactNode;
}

const GameStateContext = createContext<GameLoop | undefined>(undefined);

export const GameStateProvider: React.FC<GameStateProviderProps> = ({ children }) => {
    const [gameLoop] = useState(new GameLoop());
    return (
        <GameStateContext.Provider value={gameLoop}>
            {children}
        </GameStateContext.Provider>
    );
};

/**
 * Returns the current GameState, which is an instance of the GameLoop class.
 * Must be called from a component within the GameStateProvider.
 * @throws {Error} if called outside of a GameStateProvider.
 */
export const useGameState = () => {
    const context = useContext(GameStateContext);
    if (!context) {
        throw new Error('useGameState must be used within a GameStateProvider');
    }
    return context;
};
