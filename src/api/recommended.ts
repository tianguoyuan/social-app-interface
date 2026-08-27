import { http } from '~/utils/request'

/** 推荐 */

/** 列表标签 */
export function recommendedTagsFind(data: API.RecommendedTagsFind): Promise<API.RecommendedTagsFindRes> {
  return http.request({ url: '/recommended/tags/find', method: 'POST', data })
}

/** 查找列表 */
export function recommendedListFind(data: API.RecommendedListFind): Promise<API.RecommendedListFindRes> {
  return http.request({ url: '/recommended/list/find', method: 'POST', data })
}

/** 查找列表 */
export function recommendedBannerList(): Promise<API.RecommendedBannerListRes> {
  return http.request({ url: '/recommended/bannerList', method: 'POST' })
}
