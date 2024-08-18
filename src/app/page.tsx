import React from 'react';
import TerminalEmulator from '../components/TerminalEmulator';
import TerminalWrapper from '../components/TerminalWrapper';
import ScreenEffects from '../components/ScreenEffects/ScreenEffects';
const Home: React.FC = () => {
    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', width: '100vw', backgroundColor: '#222' }}>
            <TerminalWrapper>
                <ScreenEffects>
                    <TerminalEmulator />
                </ScreenEffects>
            </TerminalWrapper>
            
        </div>
    );
};

export default Home;
