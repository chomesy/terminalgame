import React from 'react';
import TerminalEmulator from '../components/TerminalEmulator';
import ScreenEffects from '../components/ScreenEffects/ScreenEffects';
const Home: React.FC = () => {
    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', width: '100vw', backgroundColor: '#222' }}>
            <ScreenEffects>
                <TerminalEmulator />
            </ScreenEffects>
        </div>
    );
};

export default Home;
