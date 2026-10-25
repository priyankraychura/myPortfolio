/** @type {import('tailwindcss').Config} */


export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // Colors resolve to the CSS variables in src/styles/tokens.css, so they follow the theme
      colors: {
        bg: 'var(--bg)',
        raise: 'var(--bg-raise)',
        surface: 'var(--surface)',
        'surface-2': 'var(--surface-2)',
        line: 'var(--line)',
        'line-strong': 'var(--line-strong)',
        fg: 'var(--text)',
        'fg-2': 'var(--text-2)',
        muted: 'var(--muted)',
        cobalt: 'var(--cobalt)',
        'cobalt-fill': 'var(--cobalt-fill)',
        'cobalt-soft': 'var(--cobalt-soft)',
        marigold: 'var(--marigold)',
        'marigold-soft': 'var(--marigold-soft)',
        mint: 'var(--mint)',
      },
      fontFamily: {
        sans: ['"Instrument Sans"', '"Segoe UI"', 'Roboto', '"Helvetica Neue"', 'Arial', 'sans-serif'],
        display: ['Archivo', '"Helvetica Neue"', 'Arial', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'Consolas', 'monospace'],
      },
      transitionTimingFunction: {
        'out-expo': 'cubic-bezier(0.16, 1, 0.3, 1)',
        'in-out-strong': 'cubic-bezier(0.65, 0, 0.35, 1)',
      },
    },
  },
  plugins: [],
}
