/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        outfit: ['Outfit', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      colors: {
        navy: {
          950: '#040A18',
          900: '#070E21',
          800: '#0C1530',
          700: '#111E3D',
          600: '#172549',
          500: '#1E2F58',
        },
        slate2: {
          700: '#1E2B44',
          600: '#253354',
          500: '#3B4D6E',
          400: '#6B7EA8',
          300: '#9BAECE',
          200: '#C5D0E4',
          100: '#EEF2FF',
        },
        accent: {
          DEFAULT: '#6366F1',
          light: '#818CF8',
          dark: '#4F46E5',
          glow: 'rgba(99,102,241,0.3)',
        },
        income: {
          DEFAULT: '#10B981',
          light: '#34D399',
          bg: 'rgba(16,185,129,0.1)',
        },
        expense: {
          DEFAULT: '#F43F5E',
          light: '#FB7185',
          bg: 'rgba(244,63,94,0.1)',
        },
        warn: {
          DEFAULT: '#F59E0B',
          light: '#FCD34D',
          bg: 'rgba(245,158,11,0.1)',
        },
      },
      backgroundImage: {
        'dot-pattern': 'radial-gradient(circle, #1E2B44 1px, transparent 1px)',
        'card-gradient': 'linear-gradient(135deg, rgba(99,102,241,0.05) 0%, transparent 60%)',
      },
      backgroundSize: {
        'dot-sm': '24px 24px',
      },
      boxShadow: {
        card: '0 4px 24px rgba(0,0,0,0.4)',
        accent: '0 0 20px rgba(99,102,241,0.25)',
        income: '0 0 20px rgba(16,185,129,0.2)',
        expense: '0 0 20px rgba(244,63,94,0.2)',
        glow: '0 0 40px rgba(99,102,241,0.15)',
      },
      animation: {
        'fade-in': 'fadeIn 0.4s ease-out',
        'slide-up': 'slideUp 0.4s ease-out',
        'slide-in': 'slideIn 0.3s ease-out',
        'pulse-slow': 'pulse 3s ease-in-out infinite',
        'count-up': 'countUp 0.6s ease-out',
      },
      keyframes: {
        fadeIn: { from: { opacity: 0 }, to: { opacity: 1 } },
        slideUp: { from: { opacity: 0, transform: 'translateY(16px)' }, to: { opacity: 1, transform: 'translateY(0)' } },
        slideIn: { from: { opacity: 0, transform: 'translateX(-12px)' }, to: { opacity: 1, transform: 'translateX(0)' } },
      },
    },
  },
  plugins: [],
}
