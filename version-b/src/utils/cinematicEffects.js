/* =====================================
   🎬 CINEMATIC INTERACTION UTILITIES
   Premium Apple-level interaction system
   ===================================== */

// ============================================
// PART 1: TAP RIPPLE EFFECT
// ============================================

/**
 * Creates a ripple effect at the tap position
 * @param {number} x - X coordinate of tap
 * @param {number} y - Y coordinate of tap
 * @param {string} color - Ripple color (default: white)
 */
export const createRipple = (x, y, color = 'rgba(255, 255, 255, 0.4)') => {
  const ripple = document.createElement('div');
  ripple.className = 'cinematic-ripple';
  ripple.style.cssText = `
    position: fixed;
    left: ${x}px;
    top: ${y}px;
    width: 0;
    height: 0;
    border-radius: 50%;
    background: radial-gradient(circle, ${color} 0%, transparent 70%);
    pointer-events: none;
    z-index: 9999;
    transform: translate(-50%, -50%);
    will-change: transform, opacity;
  `;
  
  document.body.appendChild(ripple);
  
  // Trigger animation
  requestAnimationFrame(() => {
    ripple.style.transition = 'all 600ms cubic-bezier(0.4, 0.0, 0.2, 1)';
    ripple.style.width = '300px';
    ripple.style.height = '300px';
    ripple.style.opacity = '0';
  });
  
  // Remove element after animation
  setTimeout(() => {
    if (ripple.parentNode) {
      ripple.parentNode.removeChild(ripple);
    }
  }, 600);
};

// ============================================
// PART 2: TEXT GLOW BURST
// ============================================

/**
 * Triggers a glow effect on target element
 * @param {HTMLElement} element - Target element to glow
 */
export const triggerTextGlow = (element) => {
  if (!element) return;
  
  // Store original styles
  const originalBoxShadow = element.style.boxShadow;
  const originalTransition = element.style.transition;
  
  // Apply glow
  element.style.transition = 'all 300ms ease-out';
  element.style.boxShadow = `
    0 0 20px rgba(255, 255, 255, 0.6),
    0 0 40px rgba(255, 215, 0, 0.4),
    0 0 60px rgba(255, 215, 0, 0.2)
  `;
  
  // Fade out glow
  setTimeout(() => {
    element.style.transition = 'all 600ms ease-out';
    element.style.boxShadow = originalBoxShadow;
    
    // Restore original transition
    setTimeout(() => {
      element.style.transition = originalTransition;
    }, 600);
  }, 100);
};

// ============================================
// PART 3: PARTICLE BURST SYSTEM
// ============================================

/**
 * Creates a burst of particles from center
 * @param {number} x - X coordinate
 * @param {number} y - Y coordinate
 * @param {number} count - Number of particles (default: 10)
 */
export const createParticleBurst = (x, y, count = 10) => {
  const colors = ['#FFD700', '#FFA500', '#FF69B4', '#87CEEB', '#fff'];
  
  for (let i = 0; i < count; i++) {
    const particle = document.createElement('div');
    const angle = (Math.PI * 2 * i) / count;
    const distance = 60 + Math.random() * 40;
    const size = 3 + Math.random() * 4;
    const duration = 800 + Math.random() * 400;
    const color = colors[Math.floor(Math.random() * colors.length)];
    
    particle.style.cssText = `
      position: fixed;
      left: ${x}px;
      top: ${y}px;
      width: ${size}px;
      height: ${size}px;
      background: ${color};
      border-radius: 50%;
      pointer-events: none;
      z-index: 9998;
      box-shadow: 0 0 10px ${color};
      will-change: transform, opacity;
    `;
    
    document.body.appendChild(particle);
    
    // Animate using RAF for smooth performance
    let startTime = null;
    const animate = (currentTime) => {
      if (!startTime) startTime = currentTime;
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Easing function
      const easeOutQuad = 1 - (1 - progress) * (1 - progress);
      
      const tx = Math.cos(angle) * distance * easeOutQuad;
      const ty = Math.sin(angle) * distance * easeOutQuad - (progress * 30); // Slight upward drift
      const opacity = 1 - progress;
      const scale = 1 - progress * 0.5;
      
      particle.style.transform = `translate(${tx}px, ${ty}px) scale(${scale})`;
      particle.style.opacity = opacity;
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        if (particle.parentNode) {
          particle.parentNode.removeChild(particle);
        }
      }
    };
    
    requestAnimationFrame(animate);
  }
};

// ============================================
// PART 4: MOBILE VIBRATION
// ============================================

/**
 * Triggers haptic feedback on mobile devices
 * @param {number} duration - Vibration duration in ms (default: 20)
 */
export const triggerHapticFeedback = (duration = 20) => {
  if ('vibrate' in navigator) {
    try {
      navigator.vibrate(duration);
    } catch (e) {
      // Fail silently
    }
  }
};

// ============================================
// PART 5: UNIFIED GESTURE HANDLER
// ============================================

let lastTapTime = 0;
const TAP_DEBOUNCE = 800; // Minimum time between taps in ms

/**
 * Unified gesture handler with debouncing
 * @param {Event} event - Click or touch event
 * @param {Function} callback - Function to call on valid tap
 * @param {HTMLElement} glowElement - Optional element to apply glow effect
 */
export const handleCinematicTap = (event, callback, glowElement = null) => {
  const currentTime = Date.now();
  
  // Debounce rapid taps
  if (currentTime - lastTapTime < TAP_DEBOUNCE) {
    return;
  }
  
  lastTapTime = currentTime;
  
  // Get tap coordinates
  let x, y;
  if (event.type.startsWith('touch')) {
    const touch = event.touches[0] || event.changedTouches[0];
    x = touch.clientX;
    y = touch.clientY;
  } else {
    x = event.clientX;
    y = event.clientY;
  }
  
  // Trigger all effects
  createRipple(x, y);
  createParticleBurst(x, y, 10);
  triggerHapticFeedback(20);
  
  if (glowElement) {
    triggerTextGlow(glowElement);
  }
  
  // Execute callback
  if (callback) {
    callback(event);
  }
};

// ============================================
// PART 6: PARALLAX MOUSE TRACKING
// ============================================

let parallaxFrame = null;
let mouseX = window.innerWidth / 2;
let mouseY = window.innerHeight / 2;
let currentX = 0;
let currentY = 0;

/**
 * Initializes smooth mouse parallax effect
 * @param {HTMLElement} element - Element to apply parallax to
 * @param {number} intensity - Movement intensity (default: 10)
 */
export const initMouseParallax = (element, intensity = 10) => {
  if (!element) return;
  
  // Mouse move listener
  const handleMouseMove = (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  };
  
  // Smooth interpolation loop
  const animate = () => {
    // Calculate target position (inverse movement)
    const targetX = (mouseX - window.innerWidth / 2) / window.innerWidth * intensity;
    const targetY = (mouseY - window.innerHeight / 2) / window.innerHeight * intensity;
    
    // Smooth interpolation (lerp)
    currentX += (targetX - currentX) * 0.1;
    currentY += (targetY - currentY) * 0.1;
    
    // Apply transform (move opposite to cursor for parallax effect)
    element.style.transform = `translate(calc(-50% + ${-currentX}px), calc(-50% + ${-currentY}px))`;
    
    parallaxFrame = requestAnimationFrame(animate);
  };
  
  window.addEventListener('mousemove', handleMouseMove);
  animate();
  
  // Cleanup function
  return () => {
    window.removeEventListener('mousemove', handleMouseMove);
    if (parallaxFrame) {
      cancelAnimationFrame(parallaxFrame);
    }
  };
};

// ============================================
// PART 7: MOBILE TILT PARALLAX
// ============================================

/**
 * Initializes device orientation parallax for mobile
 * @param {HTMLElement} element - Element to apply parallax to
 * @param {number} intensity - Movement intensity (default: 15)
 */
export const initTiltParallax = (element, intensity = 15) => {
  if (!element) return;
  
  // Check for device orientation support
  if (!('DeviceOrientationEvent' in window)) {
    return null;
  }
  
  let tiltX = 0;
  let tiltY = 0;
  
  const handleOrientation = (event) => {
    // Beta: front-to-back tilt (-180 to 180)
    // Gamma: left-to-right tilt (-90 to 90)
    const beta = event.beta || 0;
    const gamma = event.gamma || 0;
    
    // Normalize and apply
    tiltX = (gamma / 90) * intensity;
    tiltY = (beta / 180) * intensity;
    
    element.style.transform = `translate(calc(-50% + ${tiltX}px), calc(-50% + ${tiltY}px))`;
  };
  
  window.addEventListener('deviceorientation', handleOrientation);
  
  // Cleanup function
  return () => {
    window.removeEventListener('deviceorientation', handleOrientation);
  };
};

// ============================================
// PART 8: TOUCH POSITION FALLBACK
// ============================================

/**
 * Touch-based parallax for mobile (fallback)
 * @param {HTMLElement} element - Element to apply parallax to
 * @param {number} intensity - Movement intensity (default: 15)
 */
export const initTouchParallax = (element, intensity = 15) => {
  if (!element) return;
  
  let touchX = window.innerWidth / 2;
  let touchY = window.innerHeight / 2;
  
  const handleTouch = (e) => {
    if (e.touches.length > 0) {
      touchX = e.touches[0].clientX;
      touchY = e.touches[0].clientY;
      
      const offsetX = (touchX - window.innerWidth / 2) / window.innerWidth * intensity;
      const offsetY = (touchY - window.innerHeight / 2) / window.innerHeight * intensity;
      
      element.style.transform = `translate(calc(-50% + ${-offsetX}px), calc(-50% + ${-offsetY}px))`;
    }
  };
  
  window.addEventListener('touchmove', handleTouch);
  
  // Cleanup function
  return () => {
    window.removeEventListener('touchmove', handleTouch);
  };
};
