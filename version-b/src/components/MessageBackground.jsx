import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';

const MessageBackground = ({ messageIndex }) => {
  const [particles, setParticles] = useState([]);

  // Generate particles for certain backgrounds
  useEffect(() => {
    if ([0, 2, 4, 12, 13].includes(messageIndex)) {
      const newParticles = Array.from({ length: 20 }, (_, i) => ({
        id: `${messageIndex}-${i}`,
        x: Math.random() * 100,
        y: Math.random() * 100,
        delay: Math.random() * 2,
        duration: 3 + Math.random() * 2
      }));
      setParticles(newParticles);
    }
  }, [messageIndex]);

  // Background theme configurations
  const backgrounds = [
    // 0: "You are more special than you realize ✨"
    {
      gradient: 'radial-gradient(circle at 50% 50%, rgba(255, 215, 0, 0.3), rgba(255, 165, 0, 0.2), transparent)',
      overlay: 'linear-gradient(135deg, rgba(255, 200, 100, 0.1), rgba(255, 150, 50, 0.1))',
      particles: 'golden'
    },
    // 1: "Your smile can brighten anyone's day ☀️"
    {
      gradient: 'linear-gradient(to top, rgba(255, 183, 197, 0.4), rgba(255, 218, 185, 0.4), rgba(255, 239, 186, 0.3))',
      overlay: 'radial-gradient(circle at 50% 0%, rgba(255, 200, 100, 0.3), transparent 70%)',
      animation: 'sunriseGlow'
    },
    // 2: "Keep shining, keep smiling every day 😌"
    {
      gradient: 'linear-gradient(180deg, rgba(135, 206, 250, 0.3), rgba(176, 224, 230, 0.2))',
      overlay: 'radial-gradient(circle at 30% 40%, rgba(255, 255, 255, 0.1), transparent)',
      particles: 'sparkles'
    },
    // 3: "Small moments with you feel magical ✨"
    {
      gradient: 'linear-gradient(135deg, rgba(138, 43, 226, 0.3), rgba(255, 105, 180, 0.3), rgba(147, 112, 219, 0.2))',
      overlay: 'radial-gradient(circle at 70% 30%, rgba(186, 85, 211, 0.2), transparent 60%)',
      animation: 'nebulaPulse'
    },
    // 4: "Work hard, dream big, but never forget to laugh 😄"
    {
      gradient: 'radial-gradient(circle at 20% 80%, rgba(255, 182, 193, 0.3), transparent 40%), radial-gradient(circle at 80% 20%, rgba(173, 216, 230, 0.3), transparent 40%)',
      overlay: 'linear-gradient(45deg, rgba(255, 200, 220, 0.1), rgba(200, 220, 255, 0.1))',
      animation: 'blobFloat'
    },
    // 5: "Still waiting for that little promise 😉"
    {
      gradient: 'linear-gradient(135deg, rgba(219, 112, 147, 0.4), rgba(138, 43, 226, 0.3), rgba(75, 0, 130, 0.2))',
      overlay: 'radial-gradient(circle at 50% 100%, rgba(255, 105, 180, 0.2), transparent)',
      animation: 'duskGlow'
    },
    // 6: "Late reply? Don't worry, I'm used to it 😏"
    {
      gradient: 'linear-gradient(135deg, rgba(20, 20, 40, 0.6), rgba(40, 20, 60, 0.5))',
      overlay: 'radial-gradient(circle at 50% 50%, rgba(138, 43, 226, 0.3), transparent 50%)',
      animation: 'neonFlicker'
    },
    // 7: "You always steal the spotlight... even without trying 😎"
    {
      gradient: 'radial-gradient(circle at 50% 50%, rgba(255, 255, 255, 0.15), rgba(255, 215, 0, 0.1) 30%, transparent 70%)',
      overlay: 'radial-gradient(circle at 50% 50%, transparent 20%, rgba(0, 0, 0, 0.4) 80%)',
      animation: 'spotlight'
    },
    // 8: "Your laugh... officially my favorite sound 😌"
    {
      gradient: 'linear-gradient(90deg, rgba(147, 197, 253, 0.2), rgba(196, 181, 253, 0.2), rgba(147, 197, 253, 0.2))',
      overlay: 'repeating-linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.05) 10%, transparent 20%)',
      animation: 'soundWave'
    },
    // 9: "Remember that Holi moment? 🌈"
    {
      gradient: 'linear-gradient(90deg, rgba(255, 0, 0, 0.2), rgba(255, 165, 0, 0.2), rgba(255, 255, 0, 0.2), rgba(0, 255, 0, 0.2), rgba(0, 127, 255, 0.2), rgba(139, 0, 255, 0.2))',
      overlay: 'linear-gradient(45deg, transparent, rgba(255, 255, 255, 0.1), transparent)',
      animation: 'rainbowFlow'
    },
    // 10: "And yes... chocolate war champion 🏆"
    {
      gradient: 'linear-gradient(135deg, rgba(139, 69, 19, 0.4), rgba(160, 82, 45, 0.3), rgba(210, 180, 140, 0.2))',
      overlay: 'radial-gradient(circle at 30% 70%, rgba(222, 184, 135, 0.3), transparent 60%)',
      animation: 'chocolateSwirl'
    },
    // 11: "Who knew 2 minutes could become 20 minutes? 😄"
    {
      gradient: 'radial-gradient(circle at 50% 50%, rgba(176, 224, 230, 0.2), transparent 50%)',
      overlay: 'conic-gradient(from 0deg at 50% 50%, transparent, rgba(135, 206, 250, 0.1) 25%, transparent 50%)',
      animation: 'clockRotate'
    },
    // 12: "You + your quirks = pure magic ✨"
    {
      gradient: 'radial-gradient(circle at 50% 50%, rgba(255, 215, 0, 0.4), rgba(255, 105, 180, 0.2), transparent)',
      overlay: 'radial-gradient(circle at 30% 30%, rgba(186, 85, 211, 0.2), transparent 40%)',
      particles: 'glitter'
    },
    // 13: "Never forget how amazing you already are ✨"
    {
      gradient: 'linear-gradient(135deg, rgba(25, 25, 112, 0.4), rgba(72, 61, 139, 0.3), rgba(123, 104, 238, 0.2))',
      overlay: 'radial-gradient(circle at 60% 40%, rgba(255, 215, 0, 0.15), transparent 50%)',
      particles: 'shimmer'
    },
    // 14: "You deserve happiness every single day 🌸"
    {
      gradient: 'linear-gradient(135deg, rgba(255, 182, 193, 0.4), rgba(255, 218, 224, 0.3), rgba(255, 240, 245, 0.2))',
      overlay: 'radial-gradient(circle at 70% 30%, rgba(255, 192, 203, 0.3), transparent)',
      animation: 'petalFloat'
    },
    // 15: "Keep being your awesome self 💖"
    {
      gradient: 'radial-gradient(circle at 50% 50%, rgba(255, 105, 180, 0.3), transparent 60%)',
      overlay: 'radial-gradient(circle at 40% 60%, rgba(255, 20, 147, 0.2), transparent 40%)',
      animation: 'heartGlow'
    },
    // 16: "And yes... the world feels brighter with you 😌"
    {
      gradient: 'radial-gradient(circle at 50% 50%, rgba(255, 255, 255, 0.3), rgba(255, 255, 224, 0.2) 40%, transparent 70%)',
      overlay: 'radial-gradient(circle at 50% 50%, rgba(255, 250, 205, 0.2), transparent)',
      animation: 'lightBloom'
    }
  ];

  const currentBg = backgrounds[messageIndex] || backgrounds[0];

  return (
    <>
      {/* Main Background Layer */}
      <AnimatePresence mode="wait">
        <motion.div
          key={`bg-${messageIndex}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: 'easeInOut' }}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: currentBg.gradient,
            zIndex: 6
          }}
        />
      </AnimatePresence>

      {/* Overlay Animation Layer */}
      <AnimatePresence mode="wait">
        <motion.div
          key={`overlay-${messageIndex}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1, ease: 'easeInOut' }}
          className={currentBg.animation || ''}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: currentBg.overlay,
            zIndex: 7,
            pointerEvents: 'none'
          }}
        />
      </AnimatePresence>

      {/* Particle Effects for Certain Messages */}
      {currentBg.particles && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 8,
          pointerEvents: 'none',
          overflow: 'hidden'
        }}>
          {particles.map(particle => (
            <motion.div
              key={particle.id}
              initial={{ 
                opacity: 0, 
                y: particle.y + '%', 
                x: particle.x + '%',
                scale: 0 
              }}
              animate={{ 
                opacity: [0, 1, 0],
                y: [(particle.y + '%'), ((particle.y - 30) + '%')],
                scale: [0, 1, 0.5],
                rotate: [0, 360]
              }}
              transition={{ 
                duration: particle.duration,
                delay: particle.delay,
                repeat: Infinity,
                ease: 'easeOut'
              }}
              style={{
                position: 'absolute',
                width: currentBg.particles === 'glitter' ? '4px' : '6px',
                height: currentBg.particles === 'glitter' ? '4px' : '6px',
                borderRadius: '50%',
                background: 
                  currentBg.particles === 'golden' ? 'rgba(255, 215, 0, 0.8)' :
                  currentBg.particles === 'sparkles' ? 'rgba(255, 255, 255, 0.9)' :
                  currentBg.particles === 'glitter' ? 'rgba(255, 105, 180, 0.9)' :
                  'rgba(255, 215, 0, 0.7)',
                boxShadow: `0 0 10px ${
                  currentBg.particles === 'golden' ? 'rgba(255, 215, 0, 0.6)' :
                  currentBg.particles === 'sparkles' ? 'rgba(255, 255, 255, 0.8)' :
                  currentBg.particles === 'glitter' ? 'rgba(255, 105, 180, 0.8)' :
                  'rgba(255, 215, 0, 0.5)'
                }`
              }}
            />
          ))}
        </div>
      )}

      {/* CSS Animations */}
      <style>{`
        @keyframes sunriseGlow {
          0%, 100% { opacity: 0.8; transform: translateY(0px); }
          50% { opacity: 1; transform: translateY(-10px); }
        }
        .sunriseGlow { animation: sunriseGlow 4s ease-in-out infinite; }

        @keyframes nebulaPulse {
          0%, 100% { opacity: 0.6; transform: scale(1); }
          50% { opacity: 0.9; transform: scale(1.05); }
        }
        .nebulaPulse { animation: nebulaPulse 5s ease-in-out infinite; }

        @keyframes blobFloat {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(10px, -15px) scale(1.1); }
          66% { transform: translate(-10px, -10px) scale(0.95); }
        }
        .blobFloat { animation: blobFloat 6s ease-in-out infinite; }

        @keyframes duskGlow {
          0%, 100% { opacity: 0.7; }
          50% { opacity: 1; }
        }
        .duskGlow { animation: duskGlow 3s ease-in-out infinite; }

        @keyframes neonFlicker {
          0%, 100% { opacity: 0.8; }
          20% { opacity: 1; }
          22% { opacity: 0.9; }
          24% { opacity: 1; }
          50% { opacity: 0.85; }
        }
        .neonFlicker { animation: neonFlicker 4s ease-in-out infinite; }

        @keyframes spotlight {
          0%, 100% { transform: scale(1); opacity: 0.8; }
          50% { transform: scale(1.1); opacity: 1; }
        }
        .spotlight { animation: spotlight 3s ease-in-out infinite; }

        @keyframes soundWave {
          0% { background-position: 0% 50%; opacity: 0.6; }
          50% { opacity: 0.9; }
          100% { background-position: 100% 50%; opacity: 0.6; }
        }
        .soundWave { 
          animation: soundWave 3s linear infinite;
          background-size: 200% 100%;
        }

        @keyframes rainbowFlow {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .rainbowFlow { 
          animation: rainbowFlow 8s linear infinite;
          background-size: 200% 100%;
        }

        @keyframes chocolateSwirl {
          0%, 100% { transform: rotate(0deg); opacity: 0.8; }
          50% { transform: rotate(5deg); opacity: 1; }
        }
        .chocolateSwirl { animation: chocolateSwirl 6s ease-in-out infinite; }

        @keyframes clockRotate {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        .clockRotate { animation: clockRotate 20s linear infinite; }

        @keyframes petalFloat {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-15px) rotate(10deg); }
        }
        .petalFloat { animation: petalFloat 5s ease-in-out infinite; }

        @keyframes heartGlow {
          0%, 100% { opacity: 0.7; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.05); }
        }
        .heartGlow { animation: heartGlow 2.5s ease-in-out infinite; }

        @keyframes lightBloom {
          0%, 100% { transform: scale(1); opacity: 0.7; }
          50% { transform: scale(1.3); opacity: 1; }
        }
        .lightBloom { animation: lightBloom 4s ease-in-out infinite; }
      `}</style>
    </>
  );
};

export default MessageBackground;
