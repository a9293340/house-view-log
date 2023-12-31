// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	devtools: { enabled: true },
	css: [
		"~/assets/css/main.css",
		"element-plus/dist/index.css",
		"tinymce/skins/ui/oxide/skin.css",
	],
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
		{
			src: "~/plugins/iconify.ts",
		},
		{
			src: "~/plugins/client-recaptcha.ts",
		},
		{
			src: "~/plugins/i18n.ts",
		},
	],
	modules: ["@pinia/nuxt"],
	imports: { dirs: ["stores"] },
	nitro: {
		plugins: ["~/server/db/index.js"],
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
		define: {
			"process.env": process.env,
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
	runtimeConfig: {
		admin: process.env.VITE_ADMIN,
		password: process.env.VITE_PASSWORD,
		db: process.env.VITE_DB,
	},
});
