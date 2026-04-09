export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        'dark-bg': '#0F0F0F',
        'card-bg': '#151515',
        'text-light': '#E8E8E8',
        'text-secondary': '#999',
        'text-muted': '#666',
        'accent-gold': '#D4A574',
        'accent-brown': '#8B6F47',
        'accent-blue': '#2C3E50',
        'border-dark': '#2a2a2a',
      },
      fontFamily: {
        'sans': ['-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'Roboto', 'sans-serif'],
      },
      letterSpacing: {
        'tighter': '-0.5px',
        'caps': '2px',
      },
    },
  },
  plugins: [],
}
