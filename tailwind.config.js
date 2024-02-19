/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './stories/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      white: {
        DEFAULT: '#FFFFFF',
      },
      gray: {
        bg: '#FBFBFB',
        '01': '#F7F7F8',
        '02': '#ECECEE',
        '03': '#CBCCCD',
        '04': '#B1B2B4',
        '05': '#97999B',
        '06': '#707375',
        '07': '#4B4D4E',
        '08': '#323334',
        '09': '#191A1A',
      },
      red: {
        DEFAULT: 'E5262E',
        '01': '#FFF5F6',
        '02': '#FFEAED',
        '03': '#EF474A',
        '04': '#E5262E',
        '05': '#E56B6E',
      },
      green: {
        DEFAULT: '#006243',
        '01': '#DFF1EC',
        '02': '#B1DCCE',
        '03': '#0D815E',
        '04': '#006243',
        '05': '#80C7B0',
      },
      yellow: {
        DEFAULT: '#FFD457',
        '01': '#FFFBEE',
        '02': '#FFF8E2',
        '03': '#FFD457',
        '04': '#FFC124',
        '05': '#EBB700',
      },
      sys: {
        orange: '#FA8125',
        red: '#EF474A',
        green: '#72B96D',
        blue: '#3562D4',
      },
    },
    screens: {
      tablet: '480px',
      laptop: '960px',
      desktop: '1280px',
    },
    extend: {},
  },
  plugins: [],
}
