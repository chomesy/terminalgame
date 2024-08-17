import React from 'react';
import TerminalEmulator from '../components/TerminalEmulator';

const Home: React.FC = () => {
    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', width: '100vw', backgroundColor: '#222' }}>
            <TerminalEmulator />
        </div>
    );
};

export default Home;
