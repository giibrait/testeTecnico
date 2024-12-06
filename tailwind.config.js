/** @type {import('tailwindcss').Config} */
import { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class", // Habilita modo escuro com a classe "dark"
  theme: {
    extend: {},
  },
  plugins: [],
};

export default config;
