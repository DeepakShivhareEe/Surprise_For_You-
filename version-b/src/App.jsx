import { useState, useEffect, useRef } from 'react';
import { AnimatePresence } from 'framer-motion';
import { CONFIG } from './config';
import LandingPage from './components/LandingPage';
import ParticleBackground from './components/ParticleBackground';
import NicknameReveal from './components/NicknameReveal';
import MessageSequence from './components/MessageSequence';
import InsideJoke from './components/InsideJoke';
import FinalScene from './components/FinalScene';
import FloatingHearts from './components/FloatingHearts';
import MusicToggle from './components/MusicToggle';
import ClickSurprise from './components/ClickSurprise';

// Experience stages
const STAGES = {
  LANDING: 'landing',
  NICKNAME: 'nickname',
  MESSAGES: 'messages',
  JOKE: 'joke',
  FINAL: 'final'
};

function App() {
  const [stage, setStage] = useState(STAGES.LANDING);
  const [userName, setUserName] = useState('');
  const [showHearts, setShowHearts] = useState(false);
  const [clickPosition, setClickPosition] = useState(null);
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  // Apply color theme on mount
  useEffect(() => {
    const root = document.documentElement;
    const colors = CONFIG.getGradientColors();
    
    root.style.setProperty('--primary-color', colors.primary);
    root.style.setProperty('--primary-glow', CONFIG.getRgbaGlow(0.5));
    root.style.setProperty('--gradient-1', colors.primary);
    root.style.setProperty('--gradient-2', colors.secondary);
    root.style.setProperty('--gradient-3', colors.tertiary);
  }, []);

  // Start the experience sequence
  const startExperience = async (name) => {
    setUserName(name);
    
    // Start music after 2 seconds (skip first 40 seconds)
    if (CONFIG.songFileURL && audioRef.current) {
      setTimeout(async () => {
        try {
          audioRef.current.currentTime = 40; // Skip first 40 seconds
          audioRef.current.volume = 0;
          await audioRef.current.play();
          fadeInAudio();
          setIsPlaying(true);
        } catch (error) {
          console.log('Autoplay prevented');
        }
      }, 2000); // Wait 2 seconds before playing
    }
    
    // Stage sequence with timing
    setTimeout(() => setStage(STAGES.NICKNAME), 1000);
    setTimeout(() => setShowHearts(true), 1500);
    setTimeout(() => setStage(STAGES.MESSAGES), 4500);
    setTimeout(() => setStage(STAGES.JOKE), 4500 + (CONFIG.emotionalMessages.length * 4800));
    setTimeout(() => setStage(STAGES.FINAL), 4500 + (CONFIG.emotionalMessages.length * 4800) + 6000);
  };

  const fadeInAudio = () => {
    const fadeInterval = setInterval(() => {
      if (audioRef.current && audioRef.current.volume < 0.3) {
        audioRef.current.volume = Math.min(audioRef.current.volume + 0.02, 0.3);
      } else {
        clearInterval(fadeInterval);
      }
    }, 100);
  };

  const toggleMusic = () => {
    if (!audioRef.current) return;
    
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  // Fade music to 0 over 2 seconds (for cinematic ending)
  const fadeMusic = () => {
    if (!audioRef.current) return;
    
    const fadeInterval = setInterval(() => {
      if (audioRef.current && audioRef.current.volume > 0.02) {
        audioRef.current.volume = Math.max(audioRef.current.volume - 0.02, 0);
      } else {
        if (audioRef.current) {
          audioRef.current.volume = 0;
          audioRef.current.pause();
        }
        clearInterval(fadeInterval);
      }
    }, 40); // 40ms * 50 iterations = 2000ms (2 seconds)
  };

  // Handle click surprise
  const handleExperienceClick = (e) => {
    if (stage === STAGES.LANDING) return;
    if (e.target.closest('.music-toggle')) return;
    // Don't trigger click surprise during MESSAGES stage (handled by MessageSequence)
    if (stage === STAGES.MESSAGES) return;
    // Don't trigger click surprise during FINAL stage (cinematic ending)
    if (stage === STAGES.FINAL) return;
    
    setClickPosition({ x: e.clientX, y: e.clientY });
  };

  return (
    <div className="app" onClick={handleExperienceClick} style={{ width: '100%', height: '100vh', position: 'relative' }}>
      {/* Particle Background - Depth Layer 0 */}
      <div style={{ zIndex: 0 }}>
        <ParticleBackground />
      </div>
      
      {/* Audio Element */}
      {CONFIG.songFileURL && (
        <audio ref={audioRef} loop>
          <source src={CONFIG.songFileURL} type="audio/mpeg" />
        </audio>
      )}
      
      {/* Music Toggle */}
      {stage !== STAGES.LANDING && CONFIG.songFileURL && (
        <MusicToggle isPlaying={isPlaying} onToggle={toggleMusic} />
      )}
      
      {/* Main Experience Flow */}
      <AnimatePresence mode="wait">
        {stage === STAGES.LANDING && (
          <LandingPage key="landing" onSubmit={startExperience} />
        )}
      </AnimatePresence>
      
      {/* Experience Page Components */}
      {stage !== STAGES.LANDING && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: 'linear-gradient(135deg, #1a0a2e 0%, #16213e 50%, #0f3460 100%)',
          backgroundSize: '200% 200%',
          animation: 'darkGradient 20s ease infinite',
          zIndex: 5
        }}>
          {/* Vignette overlay - Depth Layer 1 */}
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'radial-gradient(circle at center, transparent 0%, rgba(0, 0, 0, 0.6) 100%)',
            pointerEvents: 'none',
            zIndex: 1
          }} />
          
          {/* Floating Hearts */}
          {showHearts && <FloatingHearts />}
          
          {/* Stage Components */}
          <AnimatePresence mode="wait">
            {stage === STAGES.NICKNAME && (
              <NicknameReveal key="nickname" nickname={userName} />
            )}
            
            {stage === STAGES.MESSAGES && (
              <MessageSequence key="messages" messages={CONFIG.emotionalMessages} />
            )}
            
            {stage === STAGES.JOKE && (
              <InsideJoke key="joke" jokeLine={CONFIG.insideJokeLine} />
            )}
            
            {stage === STAGES.FINAL && (
              <FinalScene key="final" onFadeMusic={fadeMusic} />
            )}
          </AnimatePresence>
          
          {/* Click Surprise */}
          <ClickSurprise position={clickPosition} onComplete={() => setClickPosition(null)} />
        </div>
      )}
      
      {/* Global Animations */}
      <style>{`
        @keyframes darkGradient {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
      `}</style>
    </div>
  );
}

export default App;
