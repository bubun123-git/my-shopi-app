import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: 'class', // Enable class-based dark mode
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#ffffff", // Set the background color to white
        foreground: "var(--foreground)",
      },
      screens: {
        'sm': '640px',
        'md': '768px',
        'lg': '1024px',
        'xl': '1280px',
        '2xl': '1536px',
      },
      container: {
        center: true,
        padding: '1rem', // Set padding to 1rem
        // Adjust container widths for larger screens
        screens: {
          sm: "100%",
          md: "100%",
          lg: "100%",
          xl: "100%",
          '2xl': "100%", // Set full width for larger screens as well
        },
      },
    },
  },
  plugins: [],
};

export default config;
