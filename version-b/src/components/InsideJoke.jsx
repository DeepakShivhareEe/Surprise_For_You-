import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { initMouseParallax, initTiltParallax, initTouchParallax } from '../utils/cinematicEffects';

const InsideJoke = ({ jokeLine }) => {
  const containerRef = useRef(null);
  const cleanupRef = useRef(null);

  // Initialize parallax effects
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const isDesktop = window.innerWidth > 768;
    
    if (isDesktop) {
      cleanupRef.current = initMouseParallax(container, 8);
    } else {
      const tiltCleanup = initTiltParallax(container, 12);
      if (tiltCleanup) {
        cleanupRef.current = tiltCleanup;
      } else {
        cleanupRef.current = initTouchParallax(container, 12);
      }
    }

    return () => {
      if (cleanupRef.current) {
        cleanupRef.current();
      }
    };
  }, []);
  return (
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
      <motion.div
        initial={{ opacity: 0, y: 50, scale: 0.9 }}
        animate={{ 
          opacity: 1, 
          y: 0, 
          scale: 1
        }}
        transition={{ duration: 1.5, ease: 'easeOut' }}
      >
        <motion.p
          animate={{
            y: [0, -15, 0],
            scale: [1, 1.02, 1]
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 1.5
          }}
          className="glass-effect"
          style={{
            fontFamily: "'Poppins', sans-serif",
            fontSize: 'clamp(1.2rem, 3vw, 1.8rem)',
            fontWeight: 300,
            color: 'rgba(255, 255, 255, 0.85)',
            background: 'rgba(255, 255, 255, 0.05)',
            backdropFilter: 'blur(10px)',
            padding: '2rem 3rem',
            borderRadius: '20px',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            lineHeight: 1.6,
            willChange: 'transform, opacity',
            textShadow: '0 2px 20px rgba(0, 0, 0, 0.5)'
          }}
        >
          And yes... {jokeLine} 😌
        </motion.p>
      </motion.div>
    </motion.div>
  );
};

export default InsideJoke;
