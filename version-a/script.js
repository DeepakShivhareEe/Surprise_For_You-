/* =====================================
   ⚙️ CONFIGURATION SECTION
   👉 CUSTOMIZE YOUR EXPERIENCE HERE
   ===================================== */

console.log('🚀 Script loaded successfully!');

const CONFIG = {
    // 🎨 Favorite Color (use any valid CSS color)
    favoriteColor: '#FF6B9D', // Soft pink
    
    // 💖 Nickname (will be displayed after name entry)
    nickname: 'Maya',
    
    // 😊 Inside Joke (something personal and funny)
    insideJokeLine: 'Aur haan... tumhari smile smile officially meri weakness hai 😌',
    
    // 💬 Emotional Messages (will be shown one by one)
    emotionalMessages: [
        'You are more special than you realize ✨',
        'Your smile can brighten anyone\'s day ☀️',
        'Keep shining, keep smiling every day 😌',
        'Small moments with you feel magical ✨',
        'Work hard, dream big, but never forget to laugh 😄',
        'Still waiting for that little promise 😉',
        'Late reply? Don\'t worry, I\'m used to it 😏',
        'You always steal the spotlight... even without trying 😎',
        'Your laugh... officially my favorite sound 😌',
        'Remember that Holi moment? 🌈',
        'And yes... chocolate war champion 🏆',
        'Who knew 2 minutes could become 20 minutes? 😄',
        'You + your quirks = pure magic ✨',
        'Never forget how amazing you already are ✨',
        'You deserve happiness every single day 🌸',
        'Keep being your awesome self 💖',
        'And yes... the world feels brighter with you 😌'
    ],
    
    // 🎵 Background Music URL (use a valid audio URL)
    // You can use:
    // - A local file: './maan-mera.mp3'
    // - A URL: 'https://example.com/song.mp3'
    // - Leave empty for no music: ''
    
    // 🎵 For "Jo Dariya Jeeni Re" song:
    // Option 1: Download the song and save as 'jo-dariya-jeeni-re.mp3' in the same folder as index.html
    //           Then use: songFileURL: './jo-dariya-jeeni-re.mp3'
    // Option 2: Use a streaming URL if you have one
    songFileURL: './jo-dariya-jeeni-re.mp3'  // ⚠️ Place your song file in the same folder
};

/* =====================================
   🎨 DYNAMIC COLOR SYSTEM
   ===================================== */

function applyColorTheme() {
    const root = document.documentElement;
    const color = CONFIG.favoriteColor;
    
    // Convert hex to RGB for glow effects
    const hexToRgb = (hex) => {
        const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16)
        } : { r: 255, g: 107, b: 157 };
    };
    
    const rgb = hexToRgb(color);
    const rgbaGlow = `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.5)`;
    
    // Calculate complementary colors for gradient
    const adjustColor = (r, g, b, amount) => {
        return `rgb(${Math.max(0, Math.min(255, r + amount))}, ${Math.max(0, Math.min(255, g + amount))}, ${Math.max(0, Math.min(255, b + amount))})`;
    };
    
    root.style.setProperty('--primary-color', color);
    root.style.setProperty('--primary-glow', rgbaGlow);
    root.style.setProperty('--gradient-1', color);
    root.style.setProperty('--gradient-2', adjustColor(rgb.r, rgb.g, rgb.b, -30));
    root.style.setProperty('--gradient-3', adjustColor(rgb.r, rgb.g, rgb.b, -60));
}

/* =====================================
   ✨ ENHANCED PARTICLE BACKGROUND WITH MOUSE INTERACTION
   ===================================== */

class ParticleBackground {
    constructor() {
        this.canvas = document.getElementById('particleCanvas');
        this.ctx = this.canvas.getContext('2d');
        this.particles = [];
        this.mouse = { x: null, y: null, radius: 150 };
        this.resize();
        this.init();
        
        window.addEventListener('resize', () => this.resize());
        window.addEventListener('mousemove', (e) => this.handleMouseMove(e));
        window.addEventListener('click', (e) => this.createBurst(e.clientX, e.clientY));
    }
    
    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }
    
    handleMouseMove(e) {
        this.mouse.x = e.clientX;
        this.mouse.y = e.clientY;
    }
    
    init() {
        const particleCount = window.innerWidth > 768 ? 80 : 40;
        for (let i = 0; i < particleCount; i++) {
            this.particles.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                radius: Math.random() * 2.5 + 1,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5,
                opacity: Math.random() * 0.5 + 0.2,
                baseOpacity: Math.random() * 0.5 + 0.2,
                pulsePhase: Math.random() * Math.PI * 2
            });
        }
        this.animate();
    }
    
    createBurst(x, y) {
        // Create temporary burst particles on click
        for (let i = 0; i < 15; i++) {
            const angle = (Math.PI * 2 * i) / 15;
            const velocity = Math.random() * 2 + 1;
            this.particles.push({
                x: x,
                y: y,
                radius: Math.random() * 3 + 2,
                vx: Math.cos(angle) * velocity,
                vy: Math.sin(angle) * velocity,
                opacity: 1,
                baseOpacity: 1,
                life: 60, // frames to live
                isBurst: true,
                pulsePhase: 0
            });
        }
    }
    
    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        this.particles = this.particles.filter(particle => {
            // Handle burst particles
            if (particle.isBurst) {
                particle.life--;
                particle.opacity = particle.life / 60;
                if (particle.life <= 0) return false;
            }
            
            // Mouse interaction - particles are attracted/repelled
            if (this.mouse.x !== null && this.mouse.y !== null) {
                const dx = this.mouse.x - particle.x;
                const dy = this.mouse.y - particle.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < this.mouse.radius) {
                    const force = (this.mouse.radius - distance) / this.mouse.radius;
                    const angle = Math.atan2(dy, dx);
                    particle.vx += Math.cos(angle) * force * 0.02;
                    particle.vy += Math.sin(angle) * force * 0.02;
                    particle.opacity = Math.min(1, particle.baseOpacity + force * 0.5);
                } else {
                    // Return to base opacity
                    particle.opacity += (particle.baseOpacity - particle.opacity) * 0.05;
                }
            }
            
            // Apply velocity with damping
            particle.x += particle.vx;
            particle.y += particle.vy;
            particle.vx *= 0.99;
            particle.vy *= 0.99;
            
            // Wrap around screen
            if (particle.x < 0) particle.x = this.canvas.width;
            if (particle.x > this.canvas.width) particle.x = 0;
            if (particle.y < 0) particle.y = this.canvas.height;
            if (particle.y > this.canvas.height) particle.y = 0;
            
            // Pulse effect
            particle.pulsePhase += 0.02;
            const pulse = Math.sin(particle.pulsePhase) * 0.3 + 0.7;
            
            // Draw particle with bioluminescent glow colors
            this.ctx.beginPath();
            this.ctx.arc(particle.x, particle.y, particle.radius * pulse, 0, Math.PI * 2);
            
            // Cycle through cyber-romantic colors
            const colorPhase = (particle.pulsePhase % (Math.PI * 2)) / (Math.PI * 2);
            let color;
            if (colorPhase < 0.33) {
                color = `rgba(0, 255, 200, ${particle.opacity})`; // Cyan
            } else if (colorPhase < 0.66) {
                color = `rgba(255, 0, 110, ${particle.opacity})`; // Magenta
            } else {
                color = `rgba(244, 196, 48, ${particle.opacity})`; // Gold
            }
            this.ctx.fillStyle = color;
            this.ctx.fill();
            
            // Multi-layer bioluminescent glow effect
            for (let i = 1; i <= 3; i++) {
                const gradient = this.ctx.createRadialGradient(
                    particle.x, particle.y, 0,
                    particle.x, particle.y, particle.radius * (3 + i)
                );
                
                // Use same color as particle for glow
                const glowColor = colorPhase < 0.33 ? '0, 255, 200' : 
                                  colorPhase < 0.66 ? '255, 0, 110' : '244, 196, 48';
                gradient.addColorStop(0, `rgba(${glowColor}, ${particle.opacity * 0.5 / i})`);
                gradient.addColorStop(1, `rgba(${glowColor}, 0)`);
                this.ctx.fillStyle = gradient;
                this.ctx.fill();
            }
            
            return true;
        });
        
        requestAnimationFrame(() => this.animate());
    }
}

/* =====================================
   🎵 MUSIC CONTROLLER
   ===================================== */

class MusicController {
    constructor() {
        this.audio = document.getElementById('bgMusic');
        this.toggleBtn = document.getElementById('musicToggle');
        this.isPlaying = false;
        
        if (CONFIG.songFileURL) {
            this.audio.src = CONFIG.songFileURL;
            this.audio.volume = 0;
            
            this.toggleBtn.addEventListener('click', () => this.toggle());
        }
    }
    
    async start() {
        if (!CONFIG.songFileURL) return;
        
        this.toggleBtn.style.display = 'flex';
        
        try {
            this.audio.currentTime = 20; // Skip first 20 seconds
            await this.audio.play();
            this.fadeIn();
            this.isPlaying = true;
            this.toggleBtn.classList.add('playing');
        } catch (error) {
            console.log('Autoplay prevented. User interaction required.');
        }
    }
    
    fadeIn() {
        const fadeInterval = setInterval(() => {
            if (this.audio.volume < 0.3) {
                this.audio.volume = Math.min(this.audio.volume + 0.02, 0.3);
            } else {
                clearInterval(fadeInterval);
            }
        }, 100);
    }
    
    toggle() {
        if (this.isPlaying) {
            this.audio.pause();
            this.toggleBtn.classList.remove('playing');
        } else {
            this.audio.play();
            this.toggleBtn.classList.add('playing');
        }
        this.isPlaying = !this.isPlaying;
    }
}

/* =====================================
   🎪 MAIN EXPERIENCE ORCHESTRATOR
   ===================================== */

class ExperienceOrchestrator {
    constructor() {
        console.log('🎭 ExperienceOrchestrator constructor called');
        this.landingPage = document.getElementById('landingPage');
        this.experiencePage = document.getElementById('experiencePage');
        this.nameInput = document.getElementById('nameInput');
        this.submitBtn = document.getElementById('submitBtn');
        this.dynamicBgLayer = document.getElementById('dynamicBgLayer'); // Dynamic background layer
        this.userName = '';
        
        console.log('Elements:', { 
            landingPage: this.landingPage, 
            experiencePage: this.experiencePage,
            nameInput: this.nameInput,
            submitBtn: this.submitBtn,
            dynamicBgLayer: this.dynamicBgLayer
        });
        
        this.musicController = new MusicController();
        console.log('MusicController created');
        
        this.init();
    }
    
    init() {
        console.log('🎬 Initializing ExperienceOrchestrator');
        // Apply color theme
        applyColorTheme();
        console.log('✅ Color theme applied');
        
        // Initialize particle background
        new ParticleBackground();
        console.log('✅ Particle background initialized');
        
        // Submit button handler
        this.submitBtn.addEventListener('click', () => this.handleSubmit());
        this.nameInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.handleSubmit();
        });
        console.log('✅ Event listeners attached');
        
        // Focus input on load
        setTimeout(() => this.nameInput.focus(), 500);
    }
    
    handleSubmit() {
        console.log('🎯 Submit button clicked');
        this.userName = this.nameInput.value.trim();
        console.log('📝 User name:', this.userName);
        
        if (!this.userName) {
            console.log('⚠️ No name entered');
            this.nameInput.style.animation = 'shake 0.5s';
            setTimeout(() => { this.nameInput.style.animation = ''; }, 500);
            return;
        }
        
        console.log('✅ Starting experience for:', this.userName);
        this.startExperience();
    }
    
    async startExperience() {
        console.log('🎬 START EXPERIENCE');
        // Transition to experience page
        this.landingPage.classList.remove('active');
        console.log('Landing page hidden');
        await this.delay(800);
        this.experiencePage.classList.add('active');
        console.log('Experience page shown');
        
        // Start music
        await this.delay(500);
        this.musicController.start();
        console.log('Music started');
        
        // Start experience sequence
        await this.delay(1000);
        console.log('About to show nickname');
        await this.showNickname();
        await this.delay(3000);
        console.log('About to show messages');
        await this.showMessages();
        await this.delay(2000);
        await this.showInsideJoke();
        await this.delay(6000);
        await this.showFinalScene();
        
        // Enable click surprise
        this.enableClickSurprise();
    }
    
    async showNickname() {
        console.log('👋 SHOW NICKNAME:', this.userName);
        const section = document.getElementById('nicknameReveal');
        const text = document.getElementById('nicknameText');
        
        console.log('Section element:', section);
        console.log('Text element:', text);
        
        text.innerHTML = `Hey ${this.userName} 💖`;
        console.log('Text set to:', text.innerHTML);
        section.classList.add('active');
        console.log('Section activated, opacity should be 1');
        
        // Create sparkle burst
        this.createSparkleBurst();
        
        // Create confetti burst
        await this.delay(500);
        this.createConfettiBurst();
        
        // Start floating hearts
        this.startFloatingHearts();
        
        await this.delay(3000);
        section.classList.remove('active');
        console.log('Nickname hidden');
    }
    
    async showMessages() {
        console.log('💬 SHOW MESSAGES');
        const section = document.getElementById('messagesContainer');
        const text = document.getElementById('messageText');
        
        console.log('Messages section:', section);
        console.log('Message text element:', text);
        console.log('Total messages:', CONFIG.emotionalMessages.length);
        
        section.classList.add('active');
        console.log('Messages section activated');
        
        for (let i = 0; i < CONFIG.emotionalMessages.length; i++) {
            const message = CONFIG.emotionalMessages[i];
            console.log(`Message ${i + 1}:`, message);
            
            // Apply dynamic background for this message
            this.applyBackground(i + 1);
            
            // Set message text
            text.textContent = message;
            text.classList.remove('show');
            console.log('Text reset');
            
            await this.delay(100);
            
            // Show with class
            text.classList.add('show');
            console.log('Text shown with .show class');
            
            await this.delay(5000);
            
            // Hide
            text.classList.remove('show');
            console.log('Text hidden');
            await this.delay(800);
        }
        
        // Remove background after all messages
        this.removeBackground();
        
        section.classList.remove('active');
        console.log('Messages section hidden');
    }
    
    /**
     * Apply dynamic background theme based on message index
     * @param {number} messageIndex - The current message number (1-based)
     */
    applyBackground(messageIndex) {
        if (!this.dynamicBgLayer) return;
        
        // Remove all existing theme classes
        this.dynamicBgLayer.className = 'dynamic-bg-layer';
        
        // Add new theme class with smooth transition
        setTimeout(() => {
            this.dynamicBgLayer.classList.add(`bg-theme-${messageIndex}`);
            this.dynamicBgLayer.classList.add('active');
            console.log(`🎨 Applied background theme ${messageIndex}`);
        }, 50);
    }
    
    /**
     * Remove dynamic background (fade out)
     */
    removeBackground() {
        if (!this.dynamicBgLayer) return;
        
        this.dynamicBgLayer.classList.remove('active');
        setTimeout(() => {
            this.dynamicBgLayer.className = 'dynamic-bg-layer';
            console.log('🎨 Background removed');
        }, 1200); // Wait for opacity transition to complete
    }
    
    async showInsideJoke() {
        const section = document.getElementById('insideJoke');
        const text = document.getElementById('jokeText');
        
        text.textContent = `And yes... ${CONFIG.insideJokeLine} 😌`;
        section.classList.add('active');
        
        await this.delay(6000);
        section.classList.remove('active');
    }
    
    async showFinalScene() {
        console.log('🎬 FINAL QUOTE SCENE');
        
        // Fade out dynamic background completely
        this.removeBackground();
        
        await this.delay(1000);
        
        // Transition particles to golden and slow them down
        this.transitionToGoldenParticles();
        
        // Darken background with midnight blue overlay
        const overlay = document.createElement('div');
        overlay.className = 'dark-overlay';
        overlay.style.background = 'radial-gradient(ellipse at center, rgba(25, 25, 112, 0.7) 0%, rgba(0, 0, 20, 0.85) 100%)';
        document.body.appendChild(overlay);
        await this.delay(100);
        overlay.classList.add('active');
        
        await this.delay(1500);
        
        // Show final quote scene
        const section = document.getElementById('finalScene');
        section.classList.add('active');
        
        await this.delay(800);
        
        // Animate quote lines one by one
        const quoteLines = section.querySelectorAll('.quote-line, .quote-signature');
        
        for (let i = 0; i < quoteLines.length; i++) {
            const line = quoteLines[i];
            line.classList.add('reveal');
            console.log(`✨ Quote line ${i + 1} revealed`);
            
            // Delay between lines (slightly longer for paragraph breaks)
            const isSpaced = line.classList.contains('quote-spacer');
            const delay = i === quoteLines.length - 1 ? 1200 : (isSpaced ? 1000 : 800);
            await this.delay(delay);
        }
        
        // Create floating golden sparkles
        await this.delay(500);
        this.createGoldenSparkles();
        
        console.log('🌟 Final quote scene complete');
        // Keep visible indefinitely
    }
    
    /**
     * Transition particles to golden color and slow animation
     */
    transitionToGoldenParticles() {
        // This would be handled by the ParticleBackground class
        // For now, we'll let the existing particles continue
        // You could add a method to ParticleBackground to change colors if needed
        console.log('✨ Particles transitioning to golden theme');
    }
    
    /**
     * Create floating golden sparkles for final scene
     */
    createGoldenSparkles() {
        const sparkleCount = 20;
        
        for (let i = 0; i < sparkleCount; i++) {
            setTimeout(() => {
                const sparkle = document.createElement('div');
                sparkle.className = 'golden-sparkle';
                
                // Random horizontal position
                sparkle.style.left = Math.random() * 100 + '%';
                
                // Random animation delay and duration
                sparkle.style.animationDelay = Math.random() * 8 + 's';
                sparkle.style.animationDuration = (Math.random() * 4 + 6) + 's';
                
                // Slight horizontal drift
                const drift = (Math.random() - 0.5) * 100;
                sparkle.style.setProperty('--drift', drift + 'px');
                
                document.body.appendChild(sparkle);
                
                // Remove after animation completes
                setTimeout(() => sparkle.remove(), 15000);
            }, i * 400);
        }
        
        // Continue creating sparkles
        setInterval(() => {
            if (document.getElementById('finalScene').classList.contains('active')) {
                for (let i = 0; i < 3; i++) {
                    setTimeout(() => {
                        const sparkle = document.createElement('div');
                        sparkle.className = 'golden-sparkle';
                        sparkle.style.left = Math.random() * 100 + '%';
                        sparkle.style.animationDelay = '0s';
                        sparkle.style.animationDuration = (Math.random() * 4 + 6) + 's';
                        document.body.appendChild(sparkle);
                        setTimeout(() => sparkle.remove(), 12000);
                    }, i * 300);
                }
            }
        }, 8000);
    }
    
    createSparkleBurst() {
        const centerX = window.innerWidth / 2;
        const centerY = window.innerHeight / 2;
        
        for (let i = 0; i < 30; i++) {
            setTimeout(() => {
                const sparkle = document.createElement('div');
                sparkle.className = 'sparkle';
                
                const angle = (Math.PI * 2 * i) / 30;
                const distance = Math.random() * 100 + 50;
                const tx = Math.cos(angle) * distance;
                const ty = Math.sin(angle) * distance;
                
                sparkle.style.cssText = `
                    left: ${centerX}px;
                    top: ${centerY}px;
                    --tx: ${tx}px;
                    --ty: ${ty}px;
                `;
                
                document.body.appendChild(sparkle);
                
                setTimeout(() => sparkle.remove(), 1000);
            }, i * 30);
        }
    }
    
    createConfettiBurst() {
        const container = document.getElementById('confettiContainer');
        const colors = [CONFIG.favoriteColor, '#FFD700', '#FF69B4', '#87CEEB', '#98FB98'];
        
        for (let i = 0; i < 50; i++) {
            setTimeout(() => {
                const confetti = document.createElement('div');
                confetti.className = 'confetti';
                confetti.style.left = Math.random() * 100 + '%';
                confetti.style.top = '0';
                confetti.style.background = colors[Math.floor(Math.random() * colors.length)];
                confetti.style.width = Math.random() * 10 + 5 + 'px';
                confetti.style.height = Math.random() * 10 + 5 + 'px';
                confetti.style.animationDelay = Math.random() * 0.5 + 's';
                confetti.style.animationDuration = Math.random() * 2 + 2 + 's';
                
                container.appendChild(confetti);
                confetti.classList.add('animate');
                
                setTimeout(() => confetti.remove(), 4000);
            }, i * 20);
        }
    }
    
    startFloatingHearts() {
        const container = document.getElementById('heartsContainer');
        
        // Create floating glassmorphic bubbles continuously
        let bubbleInterval = setInterval(() => {
            const bubble = document.createElement('div');
            bubble.className = 'floating-bubble';
            bubble.style.left = Math.random() * 100 + '%';
            
            // Randomize size and animation duration
            const size = Math.random() * 30 + 40; // 40-70px
            bubble.style.width = size + 'px';
            bubble.style.height = size + 'px';
            bubble.style.animationDuration = (Math.random() * 4 + 10) + 's';
            bubble.style.animationDelay = Math.random() * 2 + 's';
            
            container.appendChild(bubble);
            
            // Remove after animation completes
            setTimeout(() => bubble.remove(), 15000);
        }, 600);
        
        // Create initial burst of bubbles
        for (let i = 0; i < 8; i++) {
            setTimeout(() => {
                const bubble = document.createElement('div');
                bubble.className = 'floating-bubble';
                bubble.style.left = Math.random() * 100 + '%';
                const size = Math.random() * 30 + 40;
                bubble.style.width = size + 'px';
                bubble.style.height = size + 'px';
                bubble.style.animationDuration = (Math.random() * 4 + 10) + 's';
                bubble.style.animationDelay = (i * 0.3) + 's';
                container.appendChild(bubble);
                setTimeout(() => bubble.remove(), 15000);
            }, i * 200);
        }
        
        // Continue creating bubbles for the entire experience
        // Don't stop them - they'll run continuously
    }
    
    enableClickSurprise() {
        const surpriseElement = document.getElementById('clickSurprise');
        const messages = [
            'You deserve happiness 💫',
            'Keep shining ✨',
            'You are amazing 🌟',
            'Never stop smiling 😊',
            'You are loved 💕'
        ];
        
        this.experiencePage.addEventListener('click', (e) => {
            // Don't trigger on music button click
            if (e.target.closest('#musicToggle')) return;
            
            const message = messages[Math.floor(Math.random() * messages.length)];
            surpriseElement.textContent = message;
            surpriseElement.style.left = e.clientX + 'px';
            surpriseElement.style.top = e.clientY + 'px';
            surpriseElement.classList.remove('show');
            
            // Trigger reflow
            void surpriseElement.offsetWidth;
            
            surpriseElement.classList.add('show');
            
            setTimeout(() => {
                surpriseElement.classList.remove('show');
            }, 2000);
        });
    }
    
    delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}

/* =====================================
   🚀 INITIALIZE APPLICATION
   ===================================== */

// Shake animation for invalid input
const style = document.createElement('style');
style.textContent = `
    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        25% { transform: translateX(-10px); }
        75% { transform: translateX(10px); }
    }
`;
document.head.appendChild(style);

// Start the experience when DOM is loaded
window.addEventListener('DOMContentLoaded', () => {
    console.log('🌟 DOM Content Loaded - Initializing app...');
    new ExperienceOrchestrator();
    console.log('✅ ExperienceOrchestrator created');
});
