import type { App } from 'vue'
import { createI18n } from 'vue-i18n'
import en from '~/locales/en.json'
import zhCN from '~/locales/zh-CN.json'

export function setupI18n(app: App) {
  const i18n = createI18n({
    locale: 'en',
    messages: {
      'zh-CN': zhCN,
      en,
    },
  })

  app.use(i18n)
}
