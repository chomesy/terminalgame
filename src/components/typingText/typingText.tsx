"use client"

import { useState, useEffect } from 'react';

interface TypingTextProps {
  line: string;
  onRendered: () => void;
}

const TypingText: React.FC<TypingTextProps> = ({ line, onRendered }) => {
  const [typingText, setTypingText] = useState('');
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    const typingInterval = 25; // adjust the typing speed
    let i = 0;
    const intervalId = setInterval(() => {
      setTypingText(line.slice(0, i + 1));
      i++;
      if (i >= line.length) {
        clearInterval(intervalId);
        setIsTyping(false);
      }
    }, typingInterval);
    onRendered();
    return () => clearInterval(intervalId);
  }, [line, onRendered]);

  return (
    <pre style={{ fontFamily: 'monospace' }}>
      {isTyping ? typingText : line}
    </pre>
  );
};

export default TypingText;