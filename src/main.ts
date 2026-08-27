import { Lazyload } from 'vant'
import { createApp } from 'vue'
import { setupI18n, setupRouter, setupStore } from '~/modules'

import App from './App.vue'
import '@unocss/reset/tailwind.css'
import './styles/main.css'
import 'uno.css'

// vant-ui
import '~/modules/vant'

async function bootstrap() {
  const app = createApp(App)

  app.use(Lazyload)

  // pinia
  setupStore(app)

  // i18n
  setupI18n(app)

  // router
  setupRouter(app)

  app.mount('#app')
}
bootstrap()
