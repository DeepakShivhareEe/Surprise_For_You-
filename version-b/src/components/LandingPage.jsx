import { useState } from 'react';
import { motion } from 'framer-motion';
import { CONFIG } from '../config';

const LandingPage = ({ onSubmit }) => {
  const [name, setName] = useState('');
  const [shake, setShake] = useState(false);

  const handleSubmit = () => {
    if (!name.trim()) {
      setShake(true);
      setTimeout(() => setShake(false), 500);
      return;
    }
    onSubmit(name);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') handleSubmit();
  };

  const colors = CONFIG.getGradientColors();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.secondary} 50%, ${colors.tertiary} 100%)`,
        backgroundSize: '400% 400%',
        animation: 'gradientShift 15s ease infinite',
        zIndex: 100
      }}
    >
      {/* Vignette Effect */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'radial-gradient(circle at center, transparent 0%, rgba(0, 0, 0, 0.4) 100%)',
        pointerEvents: 'none'
      }} />

      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.5, ease: 'easeOut' }}
        style={{ textAlign: 'center', zIndex: 2, position: 'relative' }}
      >
        {/* Title */}
        <motion.h1
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: 'clamp(2rem, 5vw, 3.5rem)',
            fontWeight: 700,
            marginBottom: '3rem',
            textShadow: '0 4px 20px rgba(0, 0, 0, 0.3)'
          }}
        >
          Something Special Awaits ✨
        </motion.h1>

        {/* Input Card with Glassmorphism */}
        <motion.div
          animate={{
            boxShadow: [
              '0 8px 32px rgba(0, 0, 0, 0.3), 0 0 0px ' + CONFIG.getRgbaGlow(0.5),
              '0 8px 32px rgba(0, 0, 0, 0.3), 0 0 30px ' + CONFIG.getRgbaGlow(0.5),
              '0 8px 32px rgba(0, 0, 0, 0.3), 0 0 0px ' + CONFIG.getRgbaGlow(0.5)
            ]
          }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          style={{
            background: 'rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(20px)',
            borderRadius: '30px',
            padding: '3rem 2.5rem',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            maxWidth: '450px',
            margin: '0 auto'
          }}
        >
          <label style={{
            display: 'block',
            fontSize: '1.1rem',
            marginBottom: '1rem',
            fontWeight: 500,
            letterSpacing: '0.5px'
          }}>
            Enter Your Name
          </label>

          <motion.input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            onKeyPress={handleKeyPress}
            autoFocus
            animate={shake ? { x: [-10, 10, -10, 10, 0] } : {}}
            transition={{ duration: 0.5 }}
            placeholder="Type here..."
            style={{
              width: '100%',
              padding: '1rem 1.5rem',
              fontSize: '1.1rem',
              border: '2px solid rgba(255, 255, 255, 0.3)',
              borderRadius: '15px',
              background: 'rgba(255, 255, 255, 0.15)',
              color: '#fff',
              fontFamily: "'Poppins', sans-serif",
              marginBottom: '1.5rem',
              outline: 'none',
              transition: 'all 0.3s ease'
            }}
            onFocus={(e) => {
              e.target.style.borderColor = 'rgba(255, 255, 255, 0.6)';
              e.target.style.background = 'rgba(255, 255, 255, 0.2)';
              e.target.style.boxShadow = `0 0 20px ${CONFIG.getRgbaGlow(0.5)}`;
            }}
            onBlur={(e) => {
              e.target.style.borderColor = 'rgba(255, 255, 255, 0.3)';
              e.target.style.background = 'rgba(255, 255, 255, 0.15)';
              e.target.style.boxShadow = 'none';
            }}
          />

          <motion.button
            onClick={handleSubmit}
            whileHover={{ y: -3, boxShadow: `0 10px 30px ${CONFIG.getRgbaGlow(0.5)}` }}
            whileTap={{ y: -1 }}
            style={{
              width: '100%',
              padding: '1rem 2rem',
              fontSize: '1.2rem',
              fontWeight: 600,
              background: `linear-gradient(135deg, ${CONFIG.favoriteColor} 0%, ${colors.secondary} 100%)`,
              border: 'none',
              borderRadius: '15px',
              color: '#fff',
              cursor: 'pointer',
              fontFamily: "'Poppins', sans-serif",
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem',
              position: 'relative',
              overflow: 'hidden'
            }}
          >
            <span style={{ position: 'relative', zIndex: 1 }}>Continue</span>
            <motion.span
              animate={{ x: [0, 5, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              style={{ position: 'relative', zIndex: 1, fontSize: '1.5rem' }}
            >
              →
            </motion.span>
          </motion.button>
        </motion.div>
      </motion.div>

      {/* Global Animation Styles */}
      <style>{`
        @keyframes gradientShift {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        
        input::placeholder {
          color: rgba(255, 255, 255, 0.6);
        }
      `}</style>
    </motion.div>
  );
};

export default LandingPage;
