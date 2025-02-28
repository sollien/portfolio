/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
			gridTemplateColumns: {
				"20": "repeat(20, minmax(0, 1fr))",
			},
			backgroundColor: {
				"primary-default": "#98ff5c",
				"main-default": "#121615",
				"main-850": "#262d2d",
				"bright-default": "#defcfa"
			},
			borderColor: {
				"primary-default": "#98ff5c",
				"main-default": "#defcfa"
			},
			textColor: {
				"main-default": "#defcfa",
				"dark-default": "#121615",
			}
		},
	},
	plugins: [],
}
