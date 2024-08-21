"use client"

import React from 'react';
import TerminalEmulator from '../components/TerminalEmulator';
import TerminalWrapper from '../components/TerminalWrapper';
import ScreenEffects from '../components/ScreenEffects/ScreenEffects';
import BatteryIcon from '../components/Menu/BatteryIcon';

const Home: React.FC = () => {
    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', width: '100vw', backgroundColor: '#222' }}>
            <TerminalWrapper>
                {/* <ScreenEffects> */}
                <div key="toolbar" 
                    style={{ 
                        height: '20px', 
                        width: '600px',
                        color: 'grey', 
                        position: 'absolute',
                        padding: '2px',
                        backgroundColor: 'transparent', 
                        display: 'flex', 
                        justifyContent: 'flex-end', 
                        alignItems: 'center', }}
                    ><BatteryIcon batteryLevel={47} isCharging={false} /></div> {/* hard coding temporarily */}
                    <TerminalEmulator />
                {/* </ScreenEffects> */}
            </TerminalWrapper>
            
        </div>
    );
};

export default Home;
