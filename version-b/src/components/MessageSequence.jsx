import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import MessageBackground from './MessageBackground';
import { initMouseParallax, initTiltParallax, initTouchParallax } from '../utils/cinematicEffects';

const MessageSequence = ({ messages }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const messageRef = useRef(null);
  const containerRef = useRef(null);
  const cleanupRef = useRef(null);

  // Auto-advance through messages with timer
  useEffect(() => {
    if (currentIndex < messages.length) {
      const timer = setTimeout(() => {
        setCurrentIndex(prev => prev + 1);
      }, 4800); // Show each message for 4.8 seconds

      return () => clearTimeout(timer);
    }
  }, [currentIndex, messages.length]);

  // Initialize parallax effects when component mounts
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Try mouse parallax first (desktop)
    const isDesktop = window.innerWidth > 768;
    
    if (isDesktop) {
      cleanupRef.current = initMouseParallax(container, 12);
    } else {
      // Try tilt parallax, fallback to touch parallax
      const tiltCleanup = initTiltParallax(container, 15);
      if (tiltCleanup) {
        cleanupRef.current = tiltCleanup;
      } else {
        cleanupRef.current = initTouchParallax(container, 15);
      }
    }

    return () => {
      if (cleanupRef.current) {
        cleanupRef.current();
      }
    };
  }, []);

  return (
    <>
      {/* Dynamic Background System - synced with message index */}
      {currentIndex < messages.length && (
        <MessageBackground messageIndex={currentIndex} />
      )}

      {/* Message Content - auto-advance only */}
      <motion.div
        ref={containerRef}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1 }}
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          textAlign: 'center',
          width: '90%',
          maxWidth: '800px',
          zIndex: 15,
          willChange: 'transform, opacity'
        }}
      >
        <AnimatePresence mode="wait">
          {currentIndex < messages.length && (
            <motion.p
              ref={messageRef}
              key={currentIndex}
              initial={{ 
                opacity: 0, 
                y: 20,
                scale: 0.95
              }}
              animate={{ 
                opacity: 1, 
                y: 0,
                scale: 1,
                letterSpacing: ['0.02em', '0.03em', '0.02em']
              }}
              exit={{ 
                opacity: 0, 
                y: -20,
                scale: 0.98
              }}
              transition={{ 
                duration: 0.6,
                ease: [0.4, 0.0, 0.2, 1]
              }}
              className="cinematic-text"
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: 'clamp(1.5rem, 4vw, 2.5rem)',
                fontStyle: 'italic',
                lineHeight: 1.6,
                color: 'rgba(255, 255, 255, 0.95)',
                textShadow: '0 2px 20px rgba(0, 0, 0, 0.6), 0 4px 40px rgba(255, 255, 255, 0.1)',
                willChange: 'transform, opacity',
                borderRadius: '12px',
                padding: '1rem'
              }}
            >
              {/* Stagger animation for each word */}
              {messages[currentIndex].split(' ').map((word, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ 
                    opacity: 1,
                    y: 0
                  }}
                  transition={{ 
                    duration: 0.4,
                    delay: i * 0.08,
                    ease: [0.4, 0.0, 0.2, 1]
                  }}
                  style={{ 
                    display: 'inline-block', 
                    marginRight: '0.3em',
                    willChange: 'transform, opacity'
                  }}
                >
                  {word}
                </motion.span>
              ))}
            </motion.p>
          )}
        </AnimatePresence>
      </motion.div>
    </>
  );
};

export default MessageSequence;
