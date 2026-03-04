import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const FinalScene = () => {
  const [showSparkles, setShowSparkles] = useState([]);

  // Quote lines to be revealed sequentially
  const quoteLines = [
    '"In this little universe of moments,',
    'you are one of the brightest stars.',
    '',
    'May your path be filled with success,',
    'your heart filled with peace,',
    'and your days filled with genuine happiness.',
    '',
    'Never forget how special you are.',
    '',
    'With best wishes,'
  ];

  // Create floating sparkles effect
  useEffect(() => {
    const sparkleInterval = setInterval(() => {
      const newSparkle = {
        id: Date.now() + Math.random(),
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 3 + 1,
        duration: Math.random() * 3 + 2
      };
      
      setShowSparkles(prev => [...prev.slice(-15), newSparkle]);
    }, 400);

    return () => clearInterval(sparkleInterval);
  }, []);

  return (
    <>
      {/* Midnight Blue Background Overlay */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2 }}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'linear-gradient(135deg, #0a0e27 0%, #16213e 50%, #1a1a2e 100%)',
          zIndex: 14
        }}
      />

      {/* Radial Glow Behind Text */}
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 0.3, scale: 1 }}
        transition={{ duration: 3, delay: 1 }}
        style={{
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '600px',
          height: '600px',
          background: 'radial-gradient(circle, rgba(255, 215, 0, 0.15) 0%, transparent 70%)',
          filter: 'blur(60px)',
          zIndex: 15,
          pointerEvents: 'none'
        }}
      />

      {/* Floating Sparkles */}
      {showSparkles.map(sparkle => (
        <motion.div
          key={sparkle.id}
          initial={{ opacity: 0, y: 0 }}
          animate={{ 
            opacity: [0, 1, 0],
            y: -100,
            scale: [0, 1, 0.5]
          }}
          transition={{ 
            duration: sparkle.duration,
            ease: 'easeOut'
          }}
          style={{
            position: 'fixed',
            left: `${sparkle.x}%`,
            top: `${sparkle.y}%`,
            width: `${sparkle.size}px`,
            height: `${sparkle.size}px`,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(255, 215, 0, 0.8) 0%, rgba(255, 223, 0, 0) 70%)',
            boxShadow: '0 0 10px rgba(255, 215, 0, 0.6)',
            zIndex: 16,
            pointerEvents: 'none'
          }}
        />
      ))}

      {/* Golden Particles Effect */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.4 }}
        transition={{ duration: 2, delay: 1 }}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: `
            radial-gradient(2px 2px at 20% 30%, rgba(255, 215, 0, 0.3), transparent),
            radial-gradient(2px 2px at 60% 70%, rgba(255, 215, 0, 0.3), transparent),
            radial-gradient(1px 1px at 50% 50%, rgba(255, 215, 0, 0.3), transparent),
            radial-gradient(1px 1px at 80% 10%, rgba(255, 215, 0, 0.3), transparent),
            radial-gradient(2px 2px at 90% 60%, rgba(255, 215, 0, 0.3), transparent),
            radial-gradient(1px 1px at 33% 80%, rgba(255, 215, 0, 0.3), transparent)
          `,
          backgroundSize: '200% 200%',
          animation: 'goldenParticles 8s ease-in-out infinite',
          zIndex: 15,
          pointerEvents: 'none'
        }}
      />

      {/* Main Quote Container */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5, delay: 0.5 }}
        style={{
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          textAlign: 'center',
          width: '90%',
          maxWidth: '900px',
          zIndex: 17,
          padding: '2rem'
        }}
      >
        {/* Quote Lines - Staggered Animation */}
        <div style={{ marginBottom: '2.5rem' }}>
          {quoteLines.map((line, index) => (
            <motion.p
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ 
                duration: 1,
                delay: index * 0.9,
                ease: 'easeOut'
              }}
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: line === '' ? '0.5rem' : 'clamp(1.2rem, 3vw, 1.8rem)',
                lineHeight: line === '' ? 1 : 1.8,
                color: 'rgba(255, 255, 255, 0.95)',
                textShadow: `
                  0 0 20px rgba(255, 215, 0, 0.5),
                  0 2px 10px rgba(0, 0, 0, 0.8),
                  0 0 40px rgba(255, 215, 0, 0.2)
                `,
                marginBottom: line === '' ? '0.5rem' : '0.4rem',
                fontStyle: 'italic',
                fontWeight: 400
              }}
            >
              {line}
            </motion.p>
          ))}
        </div>

        {/* Signature with Special Animation */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ 
            opacity: 1, 
            scale: 1
          }}
          transition={{ 
            duration: 1.5,
            delay: quoteLines.length * 0.9 + 0.5,
            ease: 'easeOut'
          }}
          style={{
            marginTop: '2rem'
          }}
        >
          <motion.p
            animate={{
              textShadow: [
                '0 0 20px rgba(255, 215, 0, 0.5), 0 2px 10px rgba(0, 0, 0, 0.8)',
                '0 0 30px rgba(255, 215, 0, 0.7), 0 2px 15px rgba(0, 0, 0, 0.8)',
                '0 0 20px rgba(255, 215, 0, 0.5), 0 2px 10px rgba(0, 0, 0, 0.8)'
              ]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut'
            }}
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 'clamp(1.3rem, 3.5vw, 2rem)',
              color: '#FFD700',
              fontWeight: 600,
              letterSpacing: '0.05em'
            }}
          >
            Deepak Shivhare ✨
          </motion.p>
        </motion.div>

        {/* Decorative Golden Line Above Signature */}
        <motion.div
          initial={{ width: 0, opacity: 0 }}
          animate={{ width: '60%', opacity: 0.6 }}
          transition={{ 
            duration: 1.5,
            delay: quoteLines.length * 0.9,
            ease: 'easeInOut'
          }}
          style={{
            height: '2px',
            background: 'linear-gradient(90deg, transparent, rgba(255, 215, 0, 0.8), transparent)',
            margin: '1.5rem auto',
            boxShadow: '0 0 10px rgba(255, 215, 0, 0.5)'
          }}
        />
      </motion.div>

      {/* Keyframe Animations */}
      <style>{`
        @keyframes goldenParticles {
          0%, 100% {
            background-position: 0% 0%;
            opacity: 0.3;
          }
          50% {
            background-position: 100% 100%;
            opacity: 0.5;
          }
        }
      `}</style>
    </>
  );
};

export default FinalScene;
