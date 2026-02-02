import { useState, useEffect } from 'react';

const TypeWriter = ({ 
  text, 
  speed = 50, 
  delay = 0, 
  className = '', 
  cursor = true,
  cursorChar = '█',
  onComplete = () => {}
}) => {
  const [displayedText, setDisplayedText] = useState('');
  const [showCursor, setShowCursor] = useState(true);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    let timeout;
    let charIndex = 0;

    const startTyping = () => {
      timeout = setInterval(() => {
        if (charIndex < text.length) {
          setDisplayedText(text.slice(0, charIndex + 1));
          charIndex++;
        } else {
          clearInterval(timeout);
          setIsComplete(true);
          onComplete();
        }
      }, speed);
    };

    const delayTimeout = setTimeout(startTyping, delay);

    return () => {
      clearTimeout(delayTimeout);
      clearInterval(timeout);
    };
  }, [text, speed, delay, onComplete]);

  // Cursor blink effect
  useEffect(() => {
    if (!cursor) return;
    const blinkInterval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 530);
    return () => clearInterval(blinkInterval);
  }, [cursor]);

  return (
    <span className={className}>
      {displayedText}
      {cursor && (
        <span 
          className={`inline-block transition-opacity duration-100 ${showCursor ? 'opacity-100' : 'opacity-0'}`}
          style={{ color: 'inherit' }}
        >
          {cursorChar}
        </span>
      )}
    </span>
  );
};

export default TypeWriter;
