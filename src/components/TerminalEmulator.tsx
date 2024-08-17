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
            <div style={{ height: '400px', width: '600px', overflowY: 'auto', marginBottom: '10px', }}>
                {lines.map((line, index) => (
                    <pre key={index} style={{fontFamily: 'monospace'}}>{line}</pre>
                ))}
                {/* The ref is attached to this empty div at the end of the console */}
                <div ref={endOfConsoleRef}></div>
            </div>
            <form onSubmit={handleInputSubmit} style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', backgroundColor: '#000', borderRadius: '5px' }}>
                <div className="flex">
                    <div key='Carat' style={{ marginRight: '5px' }}>{'$UNAUTH >'}</div>
                </div>
                <input
                    type="text"
                    value={input}
                    placeholder="- Type your command here -"
                    onChange={handleInputChange}
                    className="outline-none focus:shadow-md"
                    style={{ flexGrow: 1, border: 'none', backgroundColor: 'inherit', color: 'lightgray', fontFamily: 'monospace', borderRadius: '5px' }}
                />
            </form>
        </div>
    );
};

export default TerminalEmulator;
