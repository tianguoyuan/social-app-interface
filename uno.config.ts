import presetRemToPx from '@unocss/preset-rem-to-px'
import {
  defineConfig,
  // presetAttributify,
  presetIcons,
  presetUno,
  presetWebFonts,
} from 'unocss'

export default defineConfig({
  shortcuts: [
    ['btn', 'px-4 py-1 rounded inline-block bg-teal-600 text-white cursor-pointer hover:bg-teal-700 disabled:cursor-default disabled:bg-gray-600 disabled:opacity-50'],
    ['icon-btn', 'text-[0.9em] inline-block cursor-pointer select-none opacity-75 transition duration-200 ease-in-out hover:opacity-100 hover:text-teal-600 !outline-none'],
  ],
  rules: [
    /** 去掉banner tabbar 内容高度 */
    ['h-container', { height: 'calc(100vh - 46px - 50px)' }],
    ['mh-container', { 'min-height': 'calc(100vh - 46px - 50px)' }],

    ['color-gray', { color: ' #8D93A6' }],
  ],
  presets: [
    presetUno(),
    // presetAttributify(),
    presetIcons({
      scale: 1.2,
      warn: true,
    }),
    presetWebFonts({
      fonts: {
        sans: 'DM Sans',
        serif: 'DM Serif Display',
        mono: 'DM Mono',
      },
    }),
    presetRemToPx() as unknown as any,
  ],
})
