import { http } from '~/utils/request'

/** 推荐用户列表 */
export function followUserLike(data: API.FollowUserLike): Promise<API.FollowUserLikeRes> {
  return http.request({ url: '/follow/userLike/find', method: 'POST', data })
}
