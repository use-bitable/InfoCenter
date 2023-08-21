// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    "@element-plus/nuxt",
    "@vueuse/nuxt",
    "@vite-pwa/nuxt",
    "@sidebase/nuxt-auth",
  ],
  //@ts-ignore
  pwa: {
    registerType: "autoUpdate",
    workbox: {
      navigateFallback: "/",
      globPatterns: ["**/*.{js,css,html,png,svg,ico}"],
    },
    client: {
      installPrompt: true,
    },
    devOptions: {
      enabled: true,
      suppressWarnings: true,
      navigateFallbackAllowlist: [/^\/$/],
      type: "module",
    },
  },
  elementPlus: {
    themes: ["dark"],
  },
})
