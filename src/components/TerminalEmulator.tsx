"use client";

import React, { useState, useEffect, useRef } from 'react';

import { useGameState } from '@/app/context/GameStateContext';
import TypingText from './typingText/typingText';
import { logObject } from '@/app/game/state/substates/systemLog';

const TerminalEmulator: React.FC = () => {
    const gameLoop = useGameState();
    const [input, setInput] = useState<string>('');
    const endOfConsoleRef = useRef<HTMLDivElement | null>(null);
    const [logData, setLogData] = useState<logObject[]>([]);

    useEffect(() => {
        const subscription = gameLoop.getLogStream().getObservable().subscribe((logData) => {
            setLogData((prevLogData) => [...prevLogData, logData]);
            
        });
        return () => {
            subscription.unsubscribe();
        };
    }, []);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInput(e.target.value);
    };

    const handleInputSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (input.trim() === '') return;

        // Process the input through the game loop
        const newLines = gameLoop.start(input);
        setInput(''); // Clear the input box
    };

    return (
        <div style={{ height: '400px', width: '100%', backgroundColor: '#000', color: '#0f0', fontFamily: 'monospace', overflowY: 'scroll' }}>
            <div className="console-div" style={{ height: '380px', marginTop: 'auto', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', overflowY: 'auto' }}>
                {logData.map((log, index) => (
                    <TypingText key={index} logObject={log} />
                ))}
            </div>
            <form onSubmit={handleInputSubmit} style={{ height: '20px', display: 'flex', flexDirection: 'row', alignItems: 'center', backgroundColor: '#000', borderRadius: '5px' }}>
                <div className="flex">
                    <div key='Carat' style={{ marginRight: '5px' }}>{gameLoop.getUsername() + ' >'}</div>
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
