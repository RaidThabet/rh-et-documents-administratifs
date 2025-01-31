const {heroui} = require('@heroui/theme');
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@heroui/theme/dist/components/(accordion|avatar|breadcrumbs|button|card|chip|divider|dropdown|input|modal|pagination|table|ripple|spinner|menu|popover|form|checkbox|spacer).js"
  ],
  theme: {
    extend: {},
  },
  plugins: [heroui()],
}

