import React, { useState, useEffect, useRef } from 'react';

export default function TypingText({
  text,
  speed = 70,
  delay = 0,
  as: Component = 'span',
  className = '',
  style = {},
  showCursor = true,
  cursorChar = '|',
  onComplete
}) {
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const elementRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasStarted) {
          setHasStarted(true);
        }
      },
      { threshold: 0.15 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => observer.disconnect();
  }, [hasStarted]);

  useEffect(() => {
    if (!hasStarted) return;

    let timeoutId;
    let charIndex = 0;

    const startTyping = () => {
      setIsTyping(true);
      const timer = setInterval(() => {
        if (charIndex < text.length) {
          setDisplayedText(text.substring(0, charIndex + 1));
          charIndex++;
        } else {
          clearInterval(timer);
          setIsTyping(false);
          if (onComplete) onComplete();
        }
      }, speed);
    };

    if (delay > 0) {
      timeoutId = setTimeout(startTyping, delay);
    } else {
      startTyping();
    }

    return () => {
      clearTimeout(timeoutId);
    };
  }, [hasStarted, text, speed, delay, onComplete]);

  return (
    <Component ref={elementRef} className={className} style={{ display: 'inline-block', ...style }}>
      {displayedText}
      {showCursor && isTyping && (
        <span
          style={{
            display: 'inline-block',
            marginLeft: '2px',
            fontWeight: 'bold',
            color: '#1D4ED8',
            animation: 'typingCursorPulse 0.8s infinite'
          }}
        >
          {cursorChar}
        </span>
      )}
    </Component>
  );
}
