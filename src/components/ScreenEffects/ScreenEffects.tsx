import React from 'react';
import './ScreenEffects.css';

const ScreenEffects: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
    return (
        <div className="screen-effects-wrapper">
            {children}
            <div className="screen-overlay"></div>
        </div>
    );
};

export default ScreenEffects;
