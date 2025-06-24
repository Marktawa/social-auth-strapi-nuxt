// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from "@tailwindcss/vite";
export default defineNuxtConfig({
  compatibilityDate: '2025-05-15',
  devtools: { enabled: true },
  css: ['~/assets/css/main.css'],
  modules: ['nuxt-icon'],
  vite: {
    plugins: [
      tailwindcss(),
    ],
    server: {
      allowedHosts: true,
    },
  },
})
