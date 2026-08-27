import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import 'dayjs/locale/zh-cn'

dayjs.extend(relativeTime)
dayjs.locale('zh-cn') // 全局使用简体中文

/** 时间多少前 */
export function fromNowTime(time: string): string {
  return dayjs().to(dayjs(time)) // "31 years ago"
}
