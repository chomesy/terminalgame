"use client";

import React, { useState, useEffect, useRef } from 'react';
import { useGameState } from '@/app/context/GameStateContext';

const TerminalEmulator: React.FC = () => {
    const gameLoop = useGameState();
    const [input, setInput] = useState<string>('');
    const [lines, setLines] = useState<string[]>([]);
    const endOfConsoleRef = useRef<HTMLDivElement | null>(null);

    // Scroll to the bottom whenever lines are updated
    useEffect(() => {
        if (endOfConsoleRef.current) {
            endOfConsoleRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [lines]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInput(e.target.value);
    };

    const handleInputSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (input.trim() === '') return;

        // Process the input through the game loop
        const newLines = gameLoop.start(input);
        setLines([...lines, ...newLines]);

        setInput(''); // Clear the input box
    };

    return (
        <div style={{ padding: '10px', backgroundColor: '#000', color: '#0f0', fontFamily: 'monospace' }}>
            <div style={{ height: '400px', overflowY: 'auto', marginBottom: '10px' }}>
                {lines.map((line, index) => (
                    <div key={index}>{line}</div>
                ))}
                {/* The ref is attached to this empty div at the end of the console */}
                <div ref={endOfConsoleRef}></div>
            </div>
            <form onSubmit={handleInputSubmit}>
                <input
                    type="text"
                    value={input}
                    onChange={handleInputChange}
                    style={{ width: '100%', padding: '5px', backgroundColor: '#111', color: '#0f0', border: 'none' }}
                />
            </form>
        </div>
    );
};

export default TerminalEmulator;
