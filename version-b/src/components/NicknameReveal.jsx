import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { CONFIG } from '../config';
import { initMouseParallax, initTiltParallax, initTouchParallax } from '../utils/cinematicEffects';

const NicknameReveal = ({ nickname }) => {
  const [showConfetti, setShowConfetti] = useState(false);
  const containerRef = useRef(null);
  const cleanupRef = useRef(null);

  useEffect(() => {
    // Trigger confetti after component mounts
    setTimeout(() => setShowConfetti(true), 500);
  }, []);

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
      {/* Sparkle Burst */}
      {[...Array(30)].map((_, i) => {
        const angle = (Math.PI * 2 * i) / 30;
        const distance = Math.random() * 100 + 50;
        const tx = Math.cos(angle) * distance;
        const ty = Math.sin(angle) * distance;
        
        return (
          <motion.div
            key={i}
            initial={{ 
              opacity: 1, 
              scale: 1,
              x: 0,
              y: 0
            }}
            animate={{ 
              opacity: 0, 
              scale: 2,
              x: tx,
              y: ty
            }}
            transition={{ 
              duration: 1,
              delay: i * 0.03,
              ease: 'easeOut'
            }}
            style={{
              position: 'absolute',
              left: '50%',
              top: '50%',
              width: '4px',
              height: '4px',
              background: '#fff',
              borderRadius: '50%',
              pointerEvents: 'none'
            }}
          />
        );
      })}

      {/* Confetti */}
      {showConfetti && [...Array(50)].map((_, i) => {
        const colors = [CONFIG.favoriteColor, '#FFD700', '#FF69B4', '#87CEEB', '#98FB98'];
        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        
        return (
          <motion.div
            key={i}
            initial={{ 
              opacity: 1,
              x: `${Math.random() * 100}vw`,
              y: 0,
              rotate: 0
            }}
            animate={{ 
              opacity: 0,
              y: '100vh',
              rotate: 720
            }}
            transition={{
              duration: Math.random() * 2 + 2,
              delay: i * 0.02,
              ease: 'easeOut'
            }}
            style={{
              position: 'fixed',
              width: `${Math.random() * 10 + 5}px`,
              height: `${Math.random() * 10 + 5}px`,
              background: randomColor,
              pointerEvents: 'none',
              zIndex: 20
            }}
          />
        );
      })}

      {/* Nickname Text */}
      <motion.h2
        initial={{ 
          opacity: 0, 
          scale: 0.5,
          rotateY: 90
        }}
        animate={{ 
          opacity: 1, 
          scale: [0.5, 1.05, 1],
          rotateY: 0
        }}
        transition={{ 
          duration: 2,
          ease: 'easeOut'
        }}
        style={{
          fontFamily: "'Dancing Script', cursive",
          fontSize: 'clamp(3rem, 8vw, 6rem)',
          fontWeight: 700,
          color: CONFIG.favoriteColor,
          textShadow: `
            0 0 20px ${CONFIG.getRgbaGlow(0.5)},
            0 0 40px ${CONFIG.getRgbaGlow(0.5)},
            0 0 60px ${CONFIG.getRgbaGlow(0.5)}
          `,
          position: 'relative',
          zIndex: 10
        }}
      >
        <motion.span
          animate={{
            scale: [1, 1.05, 1],
            filter: ['brightness(1)', 'brightness(1.2)', 'brightness(1)']
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 2
          }}
        >
          Hey {nickname} 💖
        </motion.span>
      </motion.h2>
    </motion.div>
  );
};

export default NicknameReveal;
