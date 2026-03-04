import { motion } from 'framer-motion';
import { CONFIG } from '../config';

const MusicToggle = ({ isPlaying, onToggle }) => {
  return (
    <motion.button
      onClick={onToggle}
      whileHover={{ 
        scale: 1.1, 
        y: -5,
        boxShadow: `0 5px 20px ${CONFIG.getRgbaGlow(0.5)}`
      }}
      whileTap={{ scale: 0.95 }}
      animate={isPlaying ? {
        y: [0, -10, 0],
        boxShadow: [
          '0 0 0 0 ' + CONFIG.getRgbaGlow(0.5),
          '0 0 0 15px ' + CONFIG.getRgbaGlow(0),
          '0 0 0 0 ' + CONFIG.getRgbaGlow(0.5)
        ]
      } : {}}
      transition={isPlaying ? {
        y: { duration: 3, repeat: Infinity, ease: 'easeInOut' },
        boxShadow: { duration: 1, repeat: Infinity, ease: 'easeOut' }
      } : {}}
      className="music-toggle"
      style={{
        position: 'fixed',
        bottom: '30px',
        right: '30px',
        width: '60px',
        height: '60px',
        borderRadius: '50%',
        background: 'rgba(255, 255, 255, 0.15)',
        backdropFilter: 'blur(10px)',
        border: '2px solid rgba(255, 255, 255, 0.2)',
        cursor: 'pointer',
        zIndex: 100,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '1.5rem',
        color: '#fff',
        outline: 'none'
      }}
    >
      <motion.span
        animate={isPlaying ? { rotate: [0, 10, -10, 0] } : {}}
        transition={{ duration: 0.5, repeat: isPlaying ? Infinity : 0, repeatDelay: 0.5 }}
      >
        🎵
      </motion.span>
    </motion.button>
  );
};

export default MusicToggle;
