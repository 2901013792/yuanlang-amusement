/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#FF6B35',    // 活力橙
        secondary: '#004E89',  // 专业蓝
        accent: '#FFD23F',     // 明亮黄
      },
    },
  },
  plugins: [],
}
