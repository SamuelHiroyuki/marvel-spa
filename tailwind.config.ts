import type { Config } from 'tailwindcss'
import plugin from 'tailwindcss/plugin';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      translate: {
        "100_4": "calc(100% - 4px)"
      },
      boxShadow: {
        nprogress: "0 0 10px var(--tw-shadow-color), 0 0 5px var(--tw-shadow-color)",
      },
      animation: {
        nprogress: "spin 400ms linear infinite"
      }
    },
  },
  plugins: [
    plugin(function ({ addUtilities }) {
      addUtilities({
        ".overflow-anywhere": {
          overflowWrap: "anywhere"
        },
        ".-rotate-y-180": {
          transform: "rotateY(-180deg)",
        },
        ".grid-area-1": {
          gridArea: "1 / 1",
        },
        ".preserve-3d": {
          transformStyle: "preserve-3d",
        },
        ".perspective-1000": {
          perspective: "1000px",
        },
        ".backface-hidden": {
          backfaceVisibility: "hidden",
        },
      });
    })
  ],
}
export default config
