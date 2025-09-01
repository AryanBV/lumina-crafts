import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Nude color palette
        coffee: {
          DEFAULT: '#8B7355',
          light: '#A08970',
          dark: '#6B5A45',
        },
        caramel: {
          DEFAULT: '#C4A574',
          light: '#D4B590',
          dark: '#B49560',
        },
        nude: {
          DEFAULT: '#E8DCC4',
          light: '#F2E8D8',
          dark: '#D8CCB4',
        },
        cream: {
          DEFAULT: '#FAF7F2',
          light: '#FEFDFB',
          dark: '#F5F0E8',
        },
        brown: {
          DEFAULT: '#3A3330',
          light: '#524844',
          dark: '#2A2320',
        },
        gold: {
          DEFAULT: '#D4AF37',
          light: '#E4BF47',
          dark: '#C49F27',
        },
      },
      fontFamily: {
        serif: ['Playfair Display', 'serif'],
        sans: ['Inter', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
};
export default config;