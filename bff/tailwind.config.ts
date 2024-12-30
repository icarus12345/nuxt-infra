// const plugin = require('tailwindcss/plugin')
/** @type {import('tailwindcss').Config} */
module.exports = {
  // darkMode: ['variant', '.dark'],
  // safelist: ["dark"],
  content: [
    "./components/**/*.{vue,ts}",
    "./composables/**/*.{vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{ts}",
    "./utils/**/*.{ts}",

    "./@dashboard/**/*.{vue,ts}",
    "./.dashboard/**/*.{vue,ts}",
    "./.ui/**/*.{vue,ts}",

    "./app.vue",
    "./error.vue",
  ],
  theme: {
    extend: {
      backgroundImage: {
        bff: "linear-gradient(to top, hsl(var(--muted) / 0.5), hsl(var(--muted) / 0.5)), linear-gradient(to top, hsl(var(--background)), hsl(var(--background)))",
      },
      keyframes: {
        slideDown: {
          from: { height: 0 },
          to: { height: 'var(--ui-accordion-content-height)' },
        },
        slideUp: {
          from: { height: 'var(--ui-accordion-content-height)' },
          to: { height: 0 },
        },
        gradientLoading: {
          '0': {
            'background-position': '0 0, 100% 0, 100% 100%, 0 100%'
          },
          '25%': {
            'background-position': '100% 0, 100% 100%, 0 100%, 0 0'
          },
          '50%': {
            'background-position': '100% 100%, 0 100%, 0 0, 100% 0'
          },
          '75%': {
            'background-position': '0 100%, 0 0, 100% 0, 100% 100%'
          },
          '100%': {
            'background-position': '0 0, 100% 0, 100% 100%, 0 100%'
          },
        }
      },
      animation: {
        slideDown: 'slideDown 300ms cubic-bezier(0.87, 0, 0.13, 1)',
        slideUp: 'slideUp 300ms cubic-bezier(0.87, 0, 0.13, 1)',
        gradientLoading: 'gradientLoading 4s linear infinite',
      },
      borderRadius: {
        xs: "calc(var(--radius) * 0.75)",
        sm: "calc(var(--radius) * 0.875)",
        DEFAULT: 'var(--radius, 0.6rem)',
        md: "calc(var(--radius, 0.6rem) * 1.125)",
        lg: "calc(var(--radius, 0.6rem) * 1.25)",
      	xl: "calc(var(--radius, 0.6rem) * 1.375)",
      },
      ringOffsetWidth: {
        0: '0.0rem',
        1: '0.1rem',
        2: '0.2rem',
        4: '0.4rem',
        8: '0.8rem',
      },
      ringWidth: {
        DEFAULT: '0.2rem',
        0: '0.0rem',
        1: '0.1rem',
        2: '0.2rem',
        4: '0.4rem',
        8: '0.8rem',
      },
      maxWidth: {
        xs: 'min(32rem, calc(100dvw - 3.2rem))',
        sm: 'min(40rem, calc(100dvw - 3.2rem))',
        md: 'min(48rem, calc(100dvw - 3.2rem))',
        lg: 'min(56rem, calc(100dvw - 3.2rem))',
        xl: 'min(64rem, calc(100dvw - 3.2rem))',
        '2xl': 'min(72rem, calc(100dvw - 3.2rem))',
        '3xl': 'min(84rem, calc(100dvw - 3.2rem))',
        '4xl': 'min(96rem, calc(100dvw - 3.2rem))',
      },
    },
  },
  plugins: [
    // require("@thoughtbot/tailwindcss-aria-attributes"),
    // plugin(({ addBase, addVariant }) => {
    //   addBase({
    //     ':root': { fontSize: "10px", lineHeight: "1.23076923" },
    //     'body': { fontSize: "13px" },
    //   })
    //   addVariant('not-first-last', '&:not(:first-child):not(:last-child)');
    // }),
  ],
}
