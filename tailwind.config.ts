import type { Config } from "tailwindcss"

export const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "var(--color-primary)",
        text: {
          primary: "var(--color-text-primary)",
          secondary: "var(--color-text-secondary)",
        },
      },
    },
  },

  plugins: [require("tailwind-scrollbar")],
  mode: "jit",

  variants: {
    scrollbar: ["rounded"],
  },
}
export default config
