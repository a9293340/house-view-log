// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	devtools: { enabled: true },
	css: ["~/assets/css/main.css", "element-plus/dist/index.css"],
	postcss: {
		plugins: {
			tailwindcss: {},
			autoprefixer: {},
		},
	},
	plugins: [
		{
			src: "~/plugins/element-plus.ts",
		},
	],
	modules: ["@pinia/nuxt"],
	imports: { dirs: ["stores"] },
	nitro: {
		plugins: ["~/server/db/index.js"],
		preset: "vercel",
	},
	vite: {
		server: {
			proxy: {
				"/upl": {
					target: "https://house-view-log-express.onrender.com/",
					changeOrigin: true,
				},
				"/maps/api": {
					target: "https://maps.googleapis.com",
					changeOrigin: true,
				},
			},
		},
		css: {
			postcss: {
				plugins: [require("tailwindcss"), require("autoprefixer")],
			},
			preprocessorOptions: {
				scss: {
					charset: false,
				},
			},
		},
	},
});
