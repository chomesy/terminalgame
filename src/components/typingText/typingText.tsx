"use client"

import { useState, useEffect } from 'react';

interface TypingTextProps {
  line: string;
}

const TypingText: React.FC<TypingTextProps> = ({ line }) => {
  const [typingText, setTypingText] = useState('');
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    const typingInterval = 15; // adjust the typing speed
    let i = 0;
    const intervalId = setInterval(() => {
      setTypingText(line.slice(0, i + 1));
      i++;
      if (i >= line.length) {
        clearInterval(intervalId);
        setIsTyping(false);
      }
    }, typingInterval);
    return () => clearInterval(intervalId);
  }, [line]);

  return (
    <pre style={{ fontFamily: 'monospace' }}>
      {isTyping ? typingText : line}
    </pre>
  );
};

export default TypingText;