/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        brand: {
          yellow: '#FACC15', // Warm yellow CTA highlight
          teal: '#14B8A6',   // Secondary teal accent
          purple: '#7C3AED', // Secondary purple accent
          indigo: '#4F46E5',
        },
        glass: {
          border: 'rgba(255, 255, 255, 0.12)',
          bg: 'rgba(255, 255, 255, 0.08)',
          'bg-dark': 'rgba(15, 23, 42, 0.65)',
          hover: 'rgba(255, 255, 255, 0.18)',
        },
        weather: {
          clearDay: { start: '#0284C7', end: '#0D9488' },
          clearNight: { start: '#0F172A', end: '#1E1B4B' },
          cloudy: { start: '#334155', end: '#1E293B' },
          rain: { start: '#1E1B4B', end: '#0F172A' },
          thunderstorm: { start: '#2E1065', end: '#0F172A' },
          snow: { start: '#38BDF8', end: '#0284C7' },
          fog: { start: '#475569', end: '#334155' },
        }
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', '"Poppins"', 'sans-serif'],
      },
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.5rem',
      },
      backdropBlur: {
        xs: '2px',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
        'rain-drop': 'rain 1s linear infinite',
        'snow-flake': 'snow 5s linear infinite',
        'cloud-drift': 'cloudDrift 20s linear infinite',
        'sun-spin': 'spin 12s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        cloudDrift: {
          '0%': { transform: 'translateX(-10%)' },
          '50%': { transform: 'translateX(10%)' },
          '100%': { transform: 'translateX(-10%)' },
        }
      }
    },
  },
  plugins: [],
}
