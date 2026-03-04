import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import MessageBackground from './MessageBackground';

const MessageSequence = ({ messages }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < messages.length) {
      const timer = setTimeout(() => {
        setCurrentIndex(prev => prev + 1);
      }, 4800); // Show each message for 4.8 seconds

      return () => clearTimeout(timer);
    }
  }, [currentIndex, messages.length]);

  return (
    <>
      {/* Dynamic Background System - synced with message index */}
      {currentIndex < messages.length && (
        <MessageBackground messageIndex={currentIndex} />
      )}

      {/* Message Content */}
      <motion.div
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
          zIndex: 15
        }}
      >
        <AnimatePresence mode="wait">
          {currentIndex < messages.length && (
            <motion.p
              key={currentIndex}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.8 }}
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: 'clamp(1.5rem, 4vw, 2.5rem)',
                fontStyle: 'italic',
                lineHeight: 1.6,
                color: 'rgba(255, 255, 255, 0.95)',
                textShadow: '0 2px 10px rgba(0, 0, 0, 0.5)'
              }}
            >
              {/* Stagger animation for each word */}
              {messages[currentIndex].split(' ').map((word, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ 
                    duration: 0.3,
                    delay: i * 0.1
                  }}
                  style={{ display: 'inline-block', marginRight: '0.3em' }}
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
