"use client";

import React, { useState, useLayoutEffect, useRef } from 'react';
import { useGameState } from '@/app/context/GameStateContext';
import TypingText from './typingText/typingText';

const TerminalEmulator: React.FC = () => {
    const gameLoop = useGameState();
    const [input, setInput] = useState<string>('');
    const endOfConsoleRef = useRef<HTMLDivElement | null>(null);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInput(e.target.value);
    };

    const handleInputSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (input.trim() === '') return;

        // Process the input through the game loop
        const newLines = gameLoop.start(input);
        //setLines([...lines, ...newLines]); // This tacks on new lines into the React state for the console output

        setInput(''); // Clear the input box
    };

    return (
        <div style={{ height: '400px', width: '100%', backgroundColor: '#000', color: '#0f0', fontFamily: 'monospace' }}>
            <div style={{ height: '380px', overflowY: 'auto', scrollbarColor: '#0f0' }}>
                {gameLoop.getLog().map((line, index) => (
                    <div key={index}>
                        <TypingText 
                            key={index} 
                            line={line}
                            onRendered={() => {
                                if (endOfConsoleRef.current) {
                                    console.log('scroll');
                                    endOfConsoleRef.current.scrollIntoView({ behavior: 'smooth' });
                                }
                            }} 
                        />
                        
                    </div>
                ))}
                {/* The ref is attached to this empty div at the end of the console */}
                <div ref={endOfConsoleRef}></div>
            </div>
            <form onSubmit={handleInputSubmit} style={{ height: '20px', display: 'flex', flexDirection: 'row', alignItems: 'center', backgroundColor: '#000', borderRadius: '5px' }}>
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
