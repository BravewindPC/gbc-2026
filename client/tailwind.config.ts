import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        blueberryBlue: '#0041C2',
        royalBlue: '#4169E1',
        cornflowerBlue: '#6495ED',
        blueGray: '#98AFC7',
        blueJay: '#28547E',
        azure: '#4863A0',
        lightPurpleBlue: '#728FCE',
        slateBlueGray: '#737CA1',
        steelBlue: '#4682B4',
        denimBlue: '#79BAEC',
        columbiaBlue: '#87AFC7',
        babyBlue: '#95B9C7',
        deepSeaBlue: '#123456',
        darkBlueGray: '#29465B',
        charcoalBlue: '#36454F',
        marbleBlue: '#566D7E',
        
        templateDarkBlue: '#001840',
        templateBlue: '#102A71',
        templateYellow: '#F5C400',
        templatePaleYellow: '#FFF0BA',
        templateWhite: '#FFFDF0'
      },
      fontFamily: {
        balmy: ['Balmy', 'sans-serif']
      },
      screens: {
        'sm': '640px',
        'md': '768px',
        'lg': '1024px',
        'xl': '1280px',
        'custom': '375px',
      }
    },
  },
  plugins: [],
};
export default config;
