/* =====================================
   ⚙️ CONFIGURATION FILE
   👉 CUSTOMIZE YOUR EXPERIENCE HERE
   ===================================== */

export const CONFIG = {
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
  // - A local file: '/jo-dariya-jeeni-re.mp3'
  // - A URL: 'https://example.com/song.mp3'
  // - Leave empty for no music: ''
  songFileURL: '/jo-dariya-jeeni-re.mp3',  // 🎵 Jo Dariya Jeeni Re song

  // 🎨 Color utilities
  hexToRgb: (hex) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : { r: 255, g: 107, b: 157 };
  },
  
  // Get RGBA string for glow effects
  getRgbaGlow: function(opacity = 0.5) {
    const rgb = this.hexToRgb(this.favoriteColor);
    return `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${opacity})`;
  },
  
  // Get gradient colors
  getGradientColors: function() {
    const rgb = this.hexToRgb(this.favoriteColor);
    const adjustColor = (r, g, b, amount) => {
      return `rgb(${Math.max(0, Math.min(255, r + amount))}, ${Math.max(0, Math.min(255, g + amount))}, ${Math.max(0, Math.min(255, b + amount))})`;
    };
    
    return {
      primary: this.favoriteColor,
      secondary: adjustColor(rgb.r, rgb.g, rgb.b, -30),
      tertiary: adjustColor(rgb.r, rgb.g, rgb.b, -60)
    };
  }
};
