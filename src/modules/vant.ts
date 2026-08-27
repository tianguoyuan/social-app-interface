import { setToastDefaultOptions } from 'vant'

// vant桌面端适配
import '@vant/touch-emulator'
// 函数调用没有样式
import 'vant/lib/dialog/style'
import 'vant/lib/toast/style'

// toast 是否禁止背景点击
setToastDefaultOptions('loading', { forbidClick: true, teleport: 'body' })
