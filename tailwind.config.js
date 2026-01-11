/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        space: {
            deep: '#030712', // Very dark blue/black background
            light: '#1e293b', // Lighter modal/keyboard background
            accent: '#00d0ff', // Cyan/Blue accent
            success: '#4ade80', // Green for correct
            warning: '#facc15', // Yellow for present
            error: '#9ca3af', // Gray for absent
        },
        // Custom keyframes for falling stars if needed
      }
    },
  },
  plugins: [],
}
