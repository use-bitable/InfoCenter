import { createI18n } from "vue-i18n"
import zh from "~/assets/locales/zh.json"

export default defineNuxtPlugin(({ vueApp }) => {
  const { language } = useNavigatorLanguage()
  const i18n = createI18n({
    legacy: true,
    globalInjection: true,
    locale: language.value?.includes("zh") ? "zh" : "en",
    messages: {
      zh,
    },
  })
  vueApp.use(i18n)
})
