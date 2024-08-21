"use client";

import React, { useState, useEffect, useRef, useMemo, useLayoutEffect } from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import InputBase from '@mui/material/InputBase';
import Input from '@mui/material/Input';


import { useGameState } from '@/app/context/GameStateContext';
import TypingText from './typingText/typingText';
import { logObject } from '@/app/game/state/substates/systemLog';
import AutoCompleteBox from './AutoCompleteBox';

const TerminalEmulator: React.FC = () => {
    const gameLoop = useGameState();
    const [input, setInput] = useState<string>('');
    const [logData, setLogData] = useState<logObject[]>([]);
    
    const typingOptions = useMemo(() => {
        return gameLoop.getCurrentCommandsList().concat(gameLoop.getCurrentFilesList());
    }, [gameLoop.getCurrentCommandsList(), gameLoop.getCurrentFilesList()]);

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
        <div style={{ height: '100%', width: '100%', maxWidth: '100vw', backgroundColor: '#000', color: '#0f0', fontFamily: 'monospace', overflowY: 'clip' }}>
            <div className="console-div" style={{ height: '375px', marginLeft:'5px', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', overflowY: 'auto' }}>
                {logData.map((log, index) => (
                    <TypingText key={index} logObject={log} />
                ))}
            </div>
            <form onSubmit={handleInputSubmit} style={{ height: '25px', display: 'flex', flexDirection: 'row', alignItems: 'center', backgroundColor: '#000', borderRadius: '5px' }}>
                <div key='Carat' style={{ marginLeft: '5px', marginRight: '5px', fontSize: '14px',fontFamily: 'monospace', color: 'grey', backgroundColor: 'transparent' }}>{gameLoop.getUsername() + ' @ ' + gameLoop.getCurrentFolderName() + ' >'}</div>
                <AutoCompleteBox inputString={input} setInputString={setInput} options= {typingOptions}/>
            </form>
        </div>
    );
};

export default TerminalEmulator;
