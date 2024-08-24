"use client"

import React, { useMemo } from 'react';
import { useEffect, useState } from 'react';
import TerminalEmulator from '../components/TerminalEmulator';
import TerminalWrapper from '../components/TerminalWrapper';
import ScreenEffects from '../components/ScreenEffects/ScreenEffects';
import BatteryIcon from '../components/Menu/BatteryIcon';
import MusicPlayer from '../components/Menu/MusicPlayer';
import MicIcon from '../components/Menu/MicIcon';

import { useGameState } from '@/app/context/GameStateContext';

const Home: React.FC = () => {
    const gameLoop = useGameState();
    const [musicSituation, setMusicSituation] = useState({isPlaying: false, songName: 'reverie.mp3'});
    
    useEffect(() => {
        console.log("setting music")
        setMusicSituation( {
            isPlaying: gameLoop.getState().gameStateMeta.isPlayingSong,
            songName: gameLoop.getState().gameStateMeta.currentSong
        })}, [gameLoop.getState().gameStateMeta.isPlayingSong]);

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', width: '100vw', backgroundColor: '#222' }}>
            <TerminalWrapper>
                {/* <ScreenEffects> */}
                <div key="toolbar" 
                    style={{ 
                        height: '20px',
                        font: '14px monospace', 
                        width: '590px',
                        
                        color: 'grey', 
                        position: 'absolute',
                        padding: '0px',
                        margin: '4px',
                        backgroundColor: 'transparent', 
                        display: 'flex', 
                        justifyContent: 'flex-end', 
                        alignItems: 'center',
                        gap: '2px', 
                        }}
                    >
                        <MusicPlayer song={musicSituation.songName} startPlaying={musicSituation.isPlaying}/>
                        <MicIcon />
                        <BatteryIcon batteryLevel={47} isCharging={false} />
                        
                </div> {/* hard coding temporarily */}
                <TerminalEmulator />
                {/* </ScreenEffects> */}
            </TerminalWrapper>
            
        </div>
    );
};

export default Home;
