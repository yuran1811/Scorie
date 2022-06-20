const colors = require('tailwindcss/colors');
module.exports = {
	mode: 'jit',
	content: ['./src/**/*.{js,jsx,ts,tsx}'],
	theme: {
		colors: {
			...colors,
		},
	},
	plugins: [require('@tailwindcss/line-clamp'), require('@tailwindcss/aspect-ratio')],
};
