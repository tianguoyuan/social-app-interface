import { http } from '~/utils/request'

export function login(data: API.ILogin): Promise<API.ILoginRes> {
  return http.request({ url: '/auth/login', method: 'POST', data })
}

export function getUserInfo(data: API.IUserInfo): Promise<API.IUserInfoRes> {
  return http.request({ url: '/auth/userInfo', method: 'POST', data })
}

export function userLogout(): Promise<void> {
  return http.request({ url: '/auth/logout', method: 'POST' })
}

/** App-应用首次全屏介绍 */
export function appIntroduceBanner(): Promise<API.IAppIntroduceBannerRes> {
  return http.request({ url: '/app/introduceBanner', method: 'POST' })
}
