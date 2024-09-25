/** @type {import('tailwindcss').Config} */
export default {
	content: [
		'./src/common/**/*.{js,vue}',
		'./src/modules/**/*.{js,vue}',
		'./src/pages/**/*.{js,vue}',
	],
	theme: {
		extend: {
			fontFamily: {
				ru: ['Helvetica', 'Arial', 'sans-serif'],
			},
			colors: {
				'spotify-black': '#121212',
			},
		},
	},
	plugins: [],
};
