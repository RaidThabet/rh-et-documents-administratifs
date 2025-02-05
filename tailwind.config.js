const {heroui} = require('@heroui/theme');
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@heroui/theme/dist/components/(accordion|avatar|breadcrumbs|button|card|chip|divider|drawer|dropdown|input|modal|navbar|pagination|select|table|popover|user|ripple|spinner|menu|form|listbox|scroll-shadow|checkbox|spacer).js"
  ],
  theme: {
    extend: {},
  },
  plugins: [heroui()],
}

