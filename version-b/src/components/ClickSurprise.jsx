import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CONFIG } from '../config';

const ClickSurprise = ({ position, onComplete }) => {
  const [show, setShow] = useState(false);
  const [message, setMessage] = useState('');

  const messages = [
    'You deserve happiness 💫',
    'Keep shining ✨',
    'You are amazing 🌟',
    'Never stop smiling 😊',
    'You are loved 💕'
  ];

  useEffect(() => {
    if (position) {
      setMessage(messages[Math.floor(Math.random() * messages.length)]);
      setShow(true);
      
      const timer = setTimeout(() => {
        setShow(false);
        setTimeout(onComplete, 300);
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [position]);

  if (!position) return null;

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ 
            opacity: 0, 
            y: 0,
            scale: 0.8
          }}
          animate={{ 
            opacity: [0, 1, 1, 0],
            y: -60,
            scale: [0.8, 1, 1.2]
          }}
          exit={{ opacity: 0 }}
          transition={{ duration: 2, ease: 'easeOut' }}
          style={{
            position: 'fixed',
            left: position.x,
            top: position.y,
            fontSize: '1.5rem',
            fontWeight: 500,
            color: CONFIG.favoriteColor,
            pointerEvents: 'none',
            zIndex: 25,
            textShadow: `0 0 10px ${CONFIG.getRgbaGlow(0.5)}`,
            whiteSpace: 'nowrap',
            transform: 'translate(-50%, -50%)'
          }}
        >
          {message}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ClickSurprise;
