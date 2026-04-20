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
        blostem: {
          50: '#f2f8fe',
          100: '#deedfc',
          500: '#4d9dee',
          600: '#2688ea',
          700: '#0073e6',
          900: '#00458a',
        }
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
export default config;
