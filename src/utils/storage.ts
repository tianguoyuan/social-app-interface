const preKey = `${import.meta.env.VITE_GLOB_APP_TITLE}_`

export function clearAllStorage() {
  localStorage.clear()
  sessionStorage.clear()
}

// 开屏广告是否显示
const screenBanner = useLocalStorage(`${preKey}screenBanner`, false)
export function setScreenBannerStorage(val: boolean) {
  screenBanner.value = val
}
export function getScreenBannerStorage() {
  return screenBanner.value
}
