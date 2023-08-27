// https://nuxt.com/docs/api/configuration/nuxt-config
import { resolve, dirname } from "node:path"
import { fileURLToPath } from "url"
import VueI18nVitePlugin from "@intlify/unplugin-vue-i18n/vite"

export default defineNuxtConfig({
  ssr: false,
  devtools: { enabled: true },
  spaLoadingTemplate: "./loading.html",
  alias: {
    types: resolve("./types.d.ts"),
  },
  // typescript: {
  //   strict: true
  // },
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
      endpoints: {
        getSession: { path: "/session", method: "post" },
        signUp: { path: "/register", method: "post" },
      },
      pages: {
        login: "/login",
      },
      token: {
        signInResponseTokenPointer: "/data/token",
      },
      sessionDataType: {
        name: "string",
        username: "string",
        recordId: "string",
        group: "string",
        permission: "string[]",
      },
    },
    globalAppMiddleware: {
      isEnabled: true,
    },
    session: {
      // Whether to refresh the session every time the browser window is refocused.
      enableRefreshOnWindowFocus: true,

      // Whether to refresh the session every `X` milliseconds. Set this to `false` to turn it off. The session will only be refreshed if a session already exists.
      enableRefreshPeriodically: 60000,
    },
  },
})
