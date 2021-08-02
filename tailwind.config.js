module.exports = {
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      textColor: {
        skin: {
          base: 'var(--color-text-base)',
          muted: 'var(--color-text-muted)',
          inverted: 'var(--color-text-inverted)',
          'accent-light': 'var(--color-text-accent-light)',
        },
      },
      backgroundColor: {
        skin: {
          'accent-dark': 'var(--color-accent-dark)',
          'accent-light': 'var(--color-accent-light)',
          'accent-neutral': 'var(--color-accent-neutral)',
        },
      },
      borderColor: {
        skin: {
          'accent-dark': 'var(--color-accent-dark)',
          'accent-light': 'var(--color-text-accent-light)',
        },
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
