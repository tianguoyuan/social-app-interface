interface ImportMeta {
  env: ImportMetaEnv
}

interface ImportMetaEnv extends ViteEnv {
  __: unknown
}

/** 环境变量 */
declare interface ViteEnv {
  VITE_USER_NODE_ENV: 'local' | 'uat' | 'prod'
  VITE_GLOB_APP_TITLE: string
  VITE_PORT: number
  VITE_OPEN: boolean
  VITE_REPORT: boolean
  VITE_ROUTER_MODE: 'hash' | 'history'
  VITE_BUILD_COMPRESS: 'gzip' | 'brotli' | 'gzip,brotli' | 'none'
  VITE_BUILD_COMPRESS_DELETE_ORIGIN_FILE: boolean
  VITE_DROP_CONSOLE: boolean
  VITE_PWA: boolean
  /** 网站前缀 */
  VITE_PUBLIC_PATH: string
  /** 接口前缀 */
  VITE_API_URL: string
  /** 网站标题 */
  VITE_GLOB_APP_TITLE: string
}

declare interface Window {
  /** 高德地图sdk */
  _AMapSecurityConfig: {
    securityJsCode: string
  }
}
