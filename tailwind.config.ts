import type { Config } from "tailwindcss";
import { nextui } from "@nextui-org/theme";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        w: "#f4f4f5",
        db: "#293064",
        b: "#6f87c0",
        dg: "#7d8e9c",
        g: "#bfbec0",
        pr: "#ccb8d6",
        prs: "#d6c6de",
        dpr: "#B19BBD ",
        w2: "#fefbff",
      },
      fontFamily: {
        PPGoshaReg: ["PPGoshaReg", "sans-serif"],
        PPGoshaBold: ["PPGoshaBold", "sans-serif"],
      }
    },
  },
  darkMode: "class",
  plugins: [nextui()],
};
export default config;
