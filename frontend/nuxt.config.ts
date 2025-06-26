export default defineNuxtConfig({
  compatibilityDate: '2025-05-15',
  devtools: { enabled: true },
  ssr: false,
  css: [
    '@vueup/vue-quill/dist/vue-quill.snow.css' // Load "Snow" theme
  ],
  vite: {
    server: {
      allowedHosts: true,
    },
  },
  nitro: {
    devProxy: {
      '/api': {
        target: 'http://localhost:1337/api',
        changeOrigin: true
      }
    }
  }
})
