const {heroui} = require('@heroui/theme');
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@heroui/theme/dist/components/(avatar|breadcrumbs|button|card|chip|divider|input|pagination|table|ripple|spinner|form|checkbox|spacer).js"
  ],
  theme: {
    extend: {},
  },
  plugins: [heroui()],
}

