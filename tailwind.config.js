/** @type {import('tailwindcss').Config} */
export default {
	content: [
		'./src/*.{html,js}',
		'./index.html',
		'./src/**/*.{js,ts,jsx,tsx}',
	  ],
	theme: {
	  container: {
		center: true,
	  },
	  extend: {
		colors: {
		  primary: {
			1:'#fdc380',
			2:'#ff6000',
			3:'#d6ba9a',
			border:'#fab566',
			placeholder:'#918270d0',
		  },
		  secondary: {
			DEFAULT: '#40AF0C',
		  },
		  tertiary: {
			DEFAULT: '#E48B59',
		  },
		  customPlaceholder: '#B99A9A',
		},
		fontFamily: {
		  Peyda: ['Peyda', 'sans-serif'],
		  Potk: ['Potk', 'sans-serif'],
		},
		animation: {
		  shimmer: "shimmer 2s linear infinite",
		},
		keyframes: {
		  shimmer: {
			from: {
			  backgroundPosition: "0 0",
			},
			to: {
			  backgroundPosition: "-200% 0",
			},
		  },
		},
	  },
	},
	plugins: [],

  };
  

  