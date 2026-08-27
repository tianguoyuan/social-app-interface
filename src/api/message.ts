import { http } from '~/utils/request'

/** 消息-列表 */
export function messageFind(): Promise<API.MessageFindRes> {
  return http.request({ url: '/message/find', method: 'POST' })
}
