/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#eff6ff',
          100: '#dbeafe',
          500: '#3b82f6',
          700: '#1d4ed8',
          900: '#1e3a8a',
        },
        sidebar: '#0f172a',
        'sidebar-text': '#94a3b8',
        'sidebar-text-hover': '#f8fafc',
      }
    },
  },
  plugins: [],
}
