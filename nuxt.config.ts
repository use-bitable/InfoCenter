// https://nuxt.com/docs/api/configuration/nuxt-config
import { resolve, dirname } from "node:path"
import { fileURLToPath } from "url"
import VueI18nVitePlugin from "@intlify/unplugin-vue-i18n/vite"

export default defineNuxtConfig({
  ssr: false,
  devtools: { enabled: true },
  alias: {
    types: resolve("./types.d.ts"),
  },
  modules: [
    "@element-plus/nuxt",
    "@vueuse/nuxt",
    "@vite-pwa/nuxt",
    "nuxt-svgo",
    "@sidebase/nuxt-auth",
  ],
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
  vite: {
    plugins: [
      VueI18nVitePlugin({
        include: [
          resolve(dirname(fileURLToPath(import.meta.url)), "./locales/*.json"),
        ],
      }),
    ],
  },
  auth: {
    provider: {
      type: "local",
      pages: {
        login: "/login",
      },
    },
    globalAppMiddleware: {
      isEnabled: true,
    },
  },
})
