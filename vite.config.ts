import path from 'node:path'
import process from 'node:process'
import VueI18nPlugin from '@intlify/unplugin-vue-i18n/vite'
import { VantResolver } from '@vant/auto-import-resolver'
import Vue from '@vitejs/plugin-vue'
import { visualizer } from 'rollup-plugin-visualizer'
import UnoCSS from 'unocss/vite'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import VueMacros from 'unplugin-vue-macros/vite'

import { VueRouterAutoImports } from 'unplugin-vue-router'
import VueRouter from 'unplugin-vue-router/vite'
import { type ConfigEnv, defineConfig, loadEnv, type UserConfig } from 'vite'
import Layouts from 'vite-plugin-vue-layouts'
// import VueDevTools from 'vite-plugin-vue-devtools'
import vueSetupExtend from 'unplugin-vue-setup-extend-plus/vite'
import viteCompression from 'vite-plugin-compression'
import { createHtmlPlugin } from 'vite-plugin-html'
import obfuscatorPlugin from 'vite-plugin-javascript-obfuscator'
import { viteVConsole } from 'vite-plugin-vconsole'

export default defineConfig(({ mode }: ConfigEnv): UserConfig => {
  const root = process.cwd()
  const viteEnv = loadEnv(mode, root) as unknown as ViteEnv

  return {
    base: viteEnv.VITE_PUBLIC_PATH,
    server: {
      host: '0.0.0.0',
      port: +viteEnv.VITE_PORT,
      open: viteEnv.VITE_OPEN,
      proxy: {
        [viteEnv.VITE_API_URL]: {
          target: 'http://127.0.0.1:4523/m1/5142882-4806818-default',
          // target: 'https://apifoxmock.com/m1/5142882-0-default',
          changeOrigin: true,
          rewrite: path => path.replace(new RegExp(`${viteEnv.VITE_API_URL}`), ''),
        },
      },
    },
    resolve: {
      alias: {
        '~/': `${path.resolve(__dirname, 'src')}/`,
      },
    },
    plugins: [
      viteVConsole({
        entry: path.resolve('src/main.ts'),
        localEnabled: true,
        enabled: true,
        config: {
          maxLogNumber: 1000,
          theme: 'dark',
        },
      }),
      VueMacros({
        defineOptions: false,
        defineModels: false,
        plugins: {
          vue: Vue({
            script: {
              propsDestructure: true,
              defineModel: true,
            },
          }),
        },
      }),

      // https://github.com/posva/unplugin-vue-router
      VueRouter({
        dts: './src/types/types-router.d.ts',
        exclude: [
          'src/pages/**/components/**',
          'src/pages/home/Follow.vue', // 首页-关注
          'src/pages/home/Recommended.vue', // 首页-推荐
          'src/pages/home/Nearby.vue', // 首页-附近
        ],
      }),

      // https://github.com/JohnCampionJr/vite-plugin-vue-layouts
      Layouts(),

      // https://github.com/antfu/unplugin-auto-import
      AutoImport({
        imports: [
          'vue',
          '@vueuse/core',
          'vue-i18n',
          VueRouterAutoImports,
          {
            // add any other imports you were relying on
            'vue-router/auto': ['useLink'],
          },
        ],
        dts: './src/types/auto-imports.d.ts',
        dirs: [
          './src/composables',
          './src/stores',
        ],
        vueTemplate: true,
        resolvers: [VantResolver()],
      }),

      // https://github.com/antfu/vite-plugin-components
      Components({
        dts: './src/types/components.d.ts',
        resolvers: [VantResolver()],
      }),

      // https://github.com/antfu/unocss
      // see uno.config.ts for config
      UnoCSS(),
      // i18n
      VueI18nPlugin({
        include: [path.resolve(__dirname, 'src/locales/**')],
      }),

      // https://github.com/webfansplz/vite-plugin-vue-devtools
      // VueDevTools(),

      // name 可以写在 script 标签上
      vueSetupExtend({}),

      // gzip压缩
      viteCompression({
        ext: '.gz',
        algorithm: 'gzip',
        threshold: 0,
        deleteOriginFile: false,
      }),
      // 注入变量到 html 文件
      createHtmlPlugin({
        minify: true,
        inject: {
          data: { title: viteEnv.VITE_GLOB_APP_TITLE },
        },
      }),
      // 是否生成包预览，分析依赖包大小做优化处理
      visualizer({ filename: 'stats.html', gzipSize: true, brotliSize: true }),
      // js加密
      obfuscatorPlugin({
        apply: 'build',
      }),
    ],

    // https://github.com/vitest-dev/vitest
    test: {
      environment: 'jsdom',
    },
    css: {
      preprocessorOptions: {
        scss: {
          api: 'modern-compiler',
        },
      },
    },
    // 构建配置
    build: {
      chunkSizeWarningLimit: 2000, // 消除打包大小超过500kb警告
      minify: 'terser', // Vite 2.6.x 以上需要配置 minify: "terser", terserOptions 才能生效
      terserOptions: {
        compress: {
          keep_infinity: true, // 防止 Infinity 被压缩成 1/0，这可能会导致 Chrome 上的性能问题
          drop_console: true, // 生产环境去除 console
          drop_debugger: true, // 生产环境去除 debugger
        },
        format: {
          comments: true, // 删除注释
        },
      },
      rollupOptions: {
        output: {
          // manualChunks: {
          //   "vue-i18n": ["vue-i18n"],
          // },
          // 用于从入口点创建的块的打包输出格式[name]表示文件名,[hash]表示该文件内容hash值
          entryFileNames: 'assets/js/[name].[hash].js',
          // 用于命名代码拆分时创建的共享块的输出命名
          chunkFileNames: 'assets/js/[name].[hash].js',
          // 用于输出静态资源的命名，[ext]表示文件扩展名
          assetFileNames: (assetInfo: any) => {
            const info = assetInfo.name.split('.')
            let extType = info[info.length - 1]
            if (
              // eslint-disable-next-line regexp/no-unused-capturing-group
              /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/i.test(assetInfo.name)
            ) {
              extType = 'media'
            }
            // eslint-disable-next-line regexp/no-unused-capturing-group
            else if (/\.(png|jpe?g|gif|svg)(\?.*)?$/.test(assetInfo.name)) {
              extType = 'img'
            }
            // eslint-disable-next-line regexp/no-unused-capturing-group
            else if (/\.(woff2?|eot|ttf|otf)(\?.*)?$/i.test(assetInfo.name)) {
              extType = 'fonts'
            }
            return `assets/${extType}/[name].[hash].[ext]`
          },
        },
      },
    },
  }
})
