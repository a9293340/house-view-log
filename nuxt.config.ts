// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  css: ['~/assets/css/main.css', 'element-plus/dist/index.css'],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  plugins: [],
  vite: {
    server: {
      proxy: {
        '/upl': {
          target: 'https://house-view-log-express.onrender.com/',
          changeOrigin: true,
        },
      },
    },
    css: {
      postcss: {
        plugins: [require('tailwindcss'), require('autoprefixer')],
      },
      preprocessorOptions: {
        scss: {
          charset: false,
        },
      },
    },
  },
});
