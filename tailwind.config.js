/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "var(--color-primary)",
        "primary-light": "var(--color-primary-light)",
        "primary-dark": "var(--color-primary-dark)",
        accent: "var(--color-accent)",
        "off-white": "var(--color-off-white)",
        "light-gray": "var(--color-light-gray)",
        "text-dark": "var(--color-text-dark)",
        "text-light": "var(--color-text-light)",
      },
      animation: {
        "gentle-float": "gentle-float 4s ease-in-out infinite",
        "soft-pulse": "soft-pulse 3s ease-in-out infinite",
        "fade-in": "fade-in 0.5s ease-out forwards",
      },
      boxShadow: {
        soft: "0 4px 6px rgba(0, 0, 0, 0.05), 0 1px 3px rgba(0, 0, 0, 0.1)",
        hover: "0 10px 15px rgba(0, 0, 0, 0.05), 0 4px 6px rgba(0, 0, 0, 0.05)",
      },
      fontFamily: {
        sans: ["Poppins", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};
