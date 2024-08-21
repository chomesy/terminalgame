"use client"

import { useState, useEffect } from 'react';

import { logObject } from '@/app/game/state/substates/systemLog';

interface TypingTextProps {
  logObject: logObject
}

const TypingText: React.FC<TypingTextProps> = ({logObject}) => {
  const logType = logObject.logType;
  let line = logObject.logText;
  if (logType === 'command') line = `${logObject.logSubmitter} > ` + line
  const logTimeStamp = logObject.logTimeStamp;
  const logSubmitter = logObject.logSubmitter;
  const [typingText, setTypingText] = useState('');
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    const typingInterval = 30; // adjust the typing speed
    let i = 0;
    const intervalId = setInterval(() => {
      setTypingText(line.slice(0, i));

      // Parsing and processing the text here

      i+=Math.floor(Math.random() * 9) + 1;
      if (i >= line.length) {
        clearInterval(intervalId);
        setIsTyping(false);
      }
    }, typingInterval);
    return () => clearInterval(intervalId);
  }, [line]);

  return (
    <pre style={{ 
      color: 
        (logType === 'error' ? 'red' :
          (logType === 'response' ? '#0f0' :
            (logType === 'command' ? 'white' :
            'grey')))
      , fontFamily: 'monospace' }}>
      {isTyping ? typingText : line}
    </pre>
  );
};

export default TypingText;