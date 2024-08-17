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

export const useGameState = () => {
    const context = useContext(GameStateContext);
    if (!context) {
        throw new Error('useGameState must be used within a GameStateProvider');
    }
    return context;
};
