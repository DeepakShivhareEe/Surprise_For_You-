import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { initMouseParallax, initTiltParallax, initTouchParallax } from '../utils/cinematicEffects';

const FinalScene = () => {
  const [showSparkles, setShowSparkles] = useState([]);
  const [cinematicPhase, setCinematicPhase] = useState(0); // 0: quotes, 1: transform, 2: zoom, 3: signature, 4: freeze
  const containerRef = useRef(null);
  const cleanupRef = useRef(null);
  const sparkleIntervalRef = useRef(null);

  // Quote lines to be revealed sequentially
  const quoteLines = [
    '"In this little universe of moments,',
    'you are one of the brightest stars.',
    '',
    'May your path be filled with success,',
    'your heart filled with peace,',
    'and your days filled with genuine happiness.',
    '',
    'Never forget how special you are."',
    ''
  ];

  // Calculate total quote animation time
  const quoteDuration = quoteLines.length * 0.9 + 1.5; // 0.9s per line + 1.5s initial delay

  // Create floating sparkles effect (slows down in Phase 1)
  useEffect(() => {
    const createSparkle = () => {
      const newSparkle = {
        id: Date.now() + Math.random(),
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 3 + 1,
        duration: cinematicPhase >= 1 ? Math.random() * 5 + 4 : Math.random() * 3 + 2 // Slower in phase 1+
      };
      
      setShowSparkles(prev => [...prev.slice(-15), newSparkle]);
    };

    // Adjust interval based on phase
    const interval = cinematicPhase >= 1 ? 800 : 400;
    sparkleIntervalRef.current = setInterval(createSparkle, interval);

    return () => {
      if (sparkleIntervalRef.current) {
        clearInterval(sparkleIntervalRef.current);
      }
    };
  }, [cinematicPhase]);

  // Trigger cinematic ending sequence after quotes finish
  useEffect(() => {
    const timers = [];
    
    // Phase 1: Atmospheric transformation (after quotes complete)
    timers.push(setTimeout(() => {
      setCinematicPhase(1);
    }, quoteDuration * 1000));

    // Phase 2: Cinematic zoom (2.5s after Phase 1)
    timers.push(setTimeout(() => {
      setCinematicPhase(2);
    }, (quoteDuration + 2.5) * 1000));

    // Phase 3: Signature reveal (6s after Phase 2)
    timers.push(setTimeout(() => {
      setCinematicPhase(3);
    }, (quoteDuration + 2.5 + 6) * 1000));

    // Phase 4: Final freeze frame (3s after Phase 3)
    timers.push(setTimeout(() => {
      setCinematicPhase(4);
    }, (quoteDuration + 2.5 + 6 + 3) * 1000));

    return () => timers.forEach(timer => clearTimeout(timer));
  }, [quoteDuration]);

  // Initialize parallax effects
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const isDesktop = window.innerWidth > 768;
    
    if (isDesktop) {
      cleanupRef.current = initMouseParallax(container, 6);
    } else {
      const tiltCleanup = initTiltParallax(container, 10);
      if (tiltCleanup) {
        cleanupRef.current = tiltCleanup;
      } else {
        cleanupRef.current = initTouchParallax(container, 10);
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
      {/* ============================================
          PHASE 1: ATMOSPHERIC TRANSFORMATION
          Deep midnight blue + purple gradient shift
          ============================================ */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ 
          opacity: 1,
          background: cinematicPhase >= 1 
            ? 'linear-gradient(135deg, #0a0520 0%, #1a0f35 50%, #0f0a2e 100%)'
            : 'linear-gradient(135deg, #0a0e27 0%, #16213e 50%, #1a1a2e 100%)'
        }}
        transition={{ duration: 2.5, ease: 'easeInOut' }}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 14
        }}
      />

      {/* ============================================
          PHASE 1: ENHANCED VIGNETTE (darkens edges)
          ============================================ */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ 
          opacity: cinematicPhase >= 1 ? 0.7 : 0.4
        }}
        transition={{ duration: 2.5, ease: 'easeInOut' }}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'radial-gradient(circle at center, transparent 0%, rgba(0, 0, 0, 0.8) 100%)',
          zIndex: 14,
          pointerEvents: 'none'
        }}
      />

      {/* ============================================
          PHASE 1: AMBIENT GOLDEN GLOW (behind text)
          ============================================ */}
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ 
          opacity: cinematicPhase >= 1 ? 0.5 : 0.3,
          scale: cinematicPhase >= 1 ? 1.2 : 1
        }}
        transition={{ duration: 3, delay: cinematicPhase >= 1 ? 0 : 1 }}
        style={{
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '700px',
          height: '700px',
          background: 'radial-gradient(circle, rgba(255, 215, 0, 0.2) 0%, rgba(138, 43, 226, 0.1) 50%, transparent 70%)',
          filter: 'blur(80px)',
          zIndex: 15,
          pointerEvents: 'none'
        }}
      />

      {/* ============================================
          PHASE 2: BACKGROUND BLUR OVERLAY
          ============================================ */}
      {cinematicPhase >= 2 && (
        <motion.div
          initial={{ opacity: 0, backdropFilter: 'blur(0px)' }}
          animate={{ 
            opacity: 0.3,
            backdropFilter: 'blur(8px)'
          }}
          transition={{ duration: 2, ease: 'easeInOut' }}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 15,
            pointerEvents: 'none',
            background: 'rgba(0, 0, 0, 0.1)'
          }}
        />
      )}

      {/* ============================================
          FLOATING SPARKLES (slower in Phase 1+)
          ============================================ */}
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

      {/* ============================================
          GOLDEN PARTICLES EFFECT
          ============================================ */}
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

      {/* ============================================
          PHASE 2: CINEMATIC ZOOM CONTAINER
          Scales content from 1 to 1.05 over 6 seconds
          ============================================ */}
      <motion.div
        animate={{ 
          scale: cinematicPhase >= 2 ? 1.05 : 1
        }}
        transition={{ 
          duration: 6,
          ease: 'easeInOut'
        }}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 16,
          pointerEvents: 'none'
        }}
      >
        {/* ============================================
            MAIN QUOTE CONTAINER
            ============================================ */}
        <AnimatePresence mode="wait">
          {cinematicPhase < 3 && (
            <motion.div
              ref={containerRef}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ 
                opacity: 0,
                y: -30,
                transition: { duration: 1 }
              }}
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
                padding: '2rem',
                willChange: 'transform, opacity',
                pointerEvents: 'auto'
              }}
            >
              {/* Quote Lines - Staggered Animation */}
              <div style={{ marginBottom: '2.5rem' }}>
                {quoteLines.map((line, index) => (
                  <motion.p
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: line === '' ? 0 : 1, y: 0 }}
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
            </motion.div>
          )}
        </AnimatePresence>

        {/* ============================================
            PHASE 3 & 4: FINAL SIGNATURE REVEAL
            "With best wishes, Deepak Shivhare ✨"
            ============================================ */}
        <AnimatePresence>
          {cinematicPhase >= 3 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              style={{
                position: 'fixed',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                textAlign: 'center',
                width: '90%',
                maxWidth: '900px',
                zIndex: 18,
                pointerEvents: 'none'
              }}
            >
              {/* "With best wishes," line */}
              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 0.8, y: 0 }}
                transition={{ 
                  duration: 1.2,
                  delay: 0.8,
                  ease: [0.4, 0.0, 0.2, 1]
                }}
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: 'clamp(1.1rem, 2.5vw, 1.5rem)',
                  fontStyle: 'italic',
                  color: 'rgba(255, 255, 255, 0.7)',
                  marginBottom: '1.5rem',
                  letterSpacing: '0.05em'
                }}
              >
                With best wishes,
              </motion.p>

              {/* Decorative line above signature */}
              <motion.div
                initial={{ width: 0, opacity: 0 }}
                animate={{ width: '50%', opacity: 0.6 }}
                transition={{ 
                  duration: 1.5,
                  delay: 1.5,
                  ease: 'easeInOut'
                }}
                style={{
                  height: '2px',
                  background: 'linear-gradient(90deg, transparent, rgba(255, 215, 0, 0.8), transparent)',
                  margin: '0 auto 2rem',
                  boxShadow: '0 0 15px rgba(255, 215, 0, 0.6)'
                }}
              />

              {/* Main Signature with handwriting reveal */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2, duration: 0.5 }}
                style={{ position: 'relative', display: 'inline-block' }}
              >
                {/* Signature text with stroke animation */}
                <motion.h1
                  initial={{ 
                    opacity: 0,
                    y: 40,
                    scale: 0.9
                  }}
                  animate={{ 
                    opacity: 1,
                    y: 0,
                    scale: cinematicPhase >= 4 ? [1, 1.02, 1] : 1
                  }}
                  transition={{
                    opacity: { duration: 0.8, delay: 2 },
                    y: { duration: 1, delay: 2, ease: [0.4, 0.0, 0.2, 1] },
                    scale: cinematicPhase >= 4 ? {
                      duration: 4,
                      repeat: Infinity,
                      ease: 'easeInOut'
                    } : {}
                  }}
                  className="signature-text"
                  style={{
                    fontFamily: "'Playfair Display', serif",
                    fontSize: 'clamp(2rem, 5vw, 3.5rem)',
                    fontWeight: 700,
                    color: '#FFD700',
                    letterSpacing: '0.02em',
                    textShadow: `
                      0 0 30px rgba(255, 215, 0, 0.8),
                      0 0 60px rgba(255, 215, 0, 0.4),
                      0 2px 20px rgba(0, 0, 0, 0.8)
                    `,
                    position: 'relative',
                    background: 'linear-gradient(135deg, #FFD700 0%, #FFA500 50%, #FFD700 100%)',
                    backgroundSize: '200% auto',
                    backgroundClip: 'text',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    animation: 'shimmerGold 3s linear infinite',
                    willChange: 'transform, opacity'
                  }}
                >
                  Deepak Shivhare
                </motion.h1>

                {/* Golden shimmer sweep effect */}
                <motion.div
                  initial={{ x: '-150%' }}
                  animate={{ x: '150%' }}
                  transition={{
                    duration: 2,
                    delay: 2.5,
                    ease: 'easeInOut'
                  }}
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    background: 'linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.8) 50%, transparent 100%)',
                    pointerEvents: 'none',
                    zIndex: 1
                  }}
                />

                {/* Sparkle near emoji */}
                <motion.span
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ 
                    opacity: [0, 1, 1, 0],
                    scale: [0, 1.2, 1, 0.8],
                    rotate: [0, 180, 360]
                  }}
                  transition={{
                    duration: 1.5,
                    delay: 2.8,
                    ease: 'easeOut'
                  }}
                  style={{
                    position: 'absolute',
                    right: '-2rem',
                    top: '10%',
                    fontSize: 'clamp(1.5rem, 3vw, 2.5rem)'
                  }}
                >
                  ✨
                </motion.span>
              </motion.div>

              {/* Glowing underline animation */}
              <motion.div
                initial={{ width: 0, opacity: 0 }}
                animate={{ 
                  width: '100%', 
                  opacity: cinematicPhase >= 4 ? [0.6, 1, 0.6] : 0.8
                }}
                transition={{
                  width: { duration: 1.2, delay: 3, ease: 'easeInOut' },
                  opacity: cinematicPhase >= 4 ? {
                    duration: 4,
                    repeat: Infinity,
                    ease: 'easeInOut'
                  } : { duration: 0.5, delay: 3 }
                }}
                style={{
                  height: '3px',
                  background: 'linear-gradient(90deg, transparent, rgba(255, 215, 0, 1), transparent)',
                  marginTop: '1rem',
                  borderRadius: '2px',
                  boxShadow: '0 0 20px rgba(255, 215, 0, 0.8), 0 0 40px rgba(255, 215, 0, 0.4)',
                  filter: 'blur(1px)'
                }}
              />

              {/* Additional sparkles around signature (Phase 4) */}
              {cinematicPhase >= 4 && (
                <>
                  {[...Array(6)].map((_, i) => {
                    const positions = [
                      { left: '10%', top: '20%' },
                      { right: '15%', top: '30%' },
                      { left: '20%', bottom: '25%' },
                      { right: '20%', bottom: '20%' },
                      { left: '15%', top: '50%' },
                      { right: '10%', top: '60%' }
                    ];
                    
                    return (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ 
                          opacity: [0, 1, 0],
                          scale: [0, 1, 0],
                          rotate: [0, 180]
                        }}
                        transition={{
                          duration: 2,
                          delay: 0.5 + i * 0.2,
                          repeat: Infinity,
                          repeatDelay: 3
                        }}
                        style={{
                          position: 'absolute',
                          ...positions[i],
                          width: '8px',
                          height: '8px',
                          background: 'radial-gradient(circle, rgba(255, 215, 0, 1) 0%, transparent 70%)',
                          borderRadius: '50%',
                          boxShadow: '0 0 10px rgba(255, 215, 0, 0.8)',
                          pointerEvents: 'none'
                        }}
                      />
                    );
                  })}
                </>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* ============================================
          KEYFRAME ANIMATIONS
          ============================================ */}
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

        @keyframes shimmerGold {
          0% {
            background-position: 0% center;
          }
          100% {
            background-position: 200% center;
          }
        }

        /* Handwriting stroke effect */
        .signature-text {
          position: relative;
        }
      `}</style>
    </>
  );
};

export default FinalScene;
