const colors = require('tailwindcss/colors');
module.exports = {
	mode: 'jit',
	content: ['./src/**/*.{js,jsx,ts,tsx}'],
	theme: {
		colors: {
			...colors,
			ctbg: '#312e81',
			ctcolor: '#a5b4fc',
		},
	},
	plugins: [require('@tailwindcss/line-clamp'), require('@tailwindcss/aspect-ratio')],
};
