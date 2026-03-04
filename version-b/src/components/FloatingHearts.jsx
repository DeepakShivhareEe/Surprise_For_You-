import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CONFIG } from '../config';

const FloatingHearts = () => {
  const [hearts, setHearts] = useState([]);
  const [nextId, setNextId] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      const newHeart = {
        id: nextId,
        left: Math.random() * 100,
        size: Math.random() * 20 + 20,
        duration: Math.random() * 2 + 4,
        delay: Math.random() * 1
      };
      
      setHearts(prev => [...prev, newHeart]);
      setNextId(prev => prev + 1);

      // Remove heart after animation completes
      setTimeout(() => {
        setHearts(prev => prev.filter(h => h.id !== newHeart.id));
      }, (newHeart.duration + newHeart.delay) * 1000);
    }, 800);

    // Stop after 20 seconds
    const stopTimeout = setTimeout(() => {
      clearInterval(interval);
    }, 20000);

    return () => {
      clearInterval(interval);
      clearTimeout(stopTimeout);
    };
  }, [nextId]);

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      pointerEvents: 'none',
      zIndex: 12
    }}>
      <AnimatePresence>
        {hearts.map(heart => (
          <motion.div
            key={heart.id}
            initial={{ 
              opacity: 0,
              y: 0,
              scale: 0
            }}
            animate={{ 
              opacity: [0, 1, 1, 0],
              y: '-100vh',
              scale: [0, 1, 0.5],
              rotate: 15
            }}
            transition={{
              duration: heart.duration,
              delay: heart.delay,
              ease: 'easeIn'
            }}
            style={{
              position: 'absolute',
              left: `${heart.left}%`,
              bottom: 0,
              fontSize: `${heart.size}px`,
              color: CONFIG.favoriteColor,
              filter: `drop-shadow(0 0 10px ${CONFIG.getRgbaGlow(0.5)})`
            }}
          >
            💖
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default FloatingHearts;
