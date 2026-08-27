import type { ToastWrapperInstance } from 'vant'
import axios, { type AxiosInstance, type AxiosRequestConfig, type Canceler, type Method } from 'axios'
import { showDialog, showLoadingToast, showToast } from 'vant'
import { ResultEnum as REQUEST } from '~/enums/ResultEnum'
import { router } from '~/modules/router'

interface RequestState {
  baseUrl: string
}
interface InterceptorsState {
  instance: AxiosInstance
  url: string
  loading: boolean
  cancelToken: boolean
}
class Request {
  public queueUrl: number
  public cancelTokenList: { url?: string, cancel: Canceler }[] = []
  private baseUrl: string
  private loadingInstance: null | ToastWrapperInstance = null
  constructor(props: RequestState) {
    this.queueUrl = 0
    this.cancelTokenList = []
    this.baseUrl = props.baseUrl
  }

  private errorToast(msg: string) {
    // eslint-disable-next-line no-console
    console.log('errorToast', msg)
    showToast(msg)
  }

  /** 登录过期, 重新登录 */
  private errorAuthToast(msg: string) {
    // eslint-disable-next-line no-console
    console.log('errorAuthToast', msg)
    showDialog({
      title: '提示',
      message: msg,
      theme: 'round-button',
    }).then(() => {
      router.replace(`/user/login?redirectPath=${encodeURIComponent(router.currentRoute.value.fullPath)}`)
    })
  }

  private hideLoading() {
    // eslint-disable-next-line no-console
    console.log('hideLoading')
    this.loadingInstance?.close()
  }

  private showLoading() {
    // eslint-disable-next-line no-console
    console.log('showLoading')
    this.loadingInstance = showLoadingToast({
      message: '加载中...',
      duration: 1000 * 10,
    })
  }

  public cancelAllRequest() {
    this.cancelTokenList.forEach(item => item.cancel())
  }

  public cancelRequest(url: string) {
    const item = this.cancelTokenList.find(item => item.url === url)
    if (item)
      item.cancel()
  }

  private destroy(url: string, loading: boolean) {
    if (loading)
      this.queueUrl--
    // eslint-disable-next-line no-console
    console.log('destroy', this.queueUrl)
    this.cancelTokenList = this.cancelTokenList.filter(cancel => url !== cancel.url)
    if (!this.queueUrl)
      this.hideLoading()
  }

  private interceptors(options: InterceptorsState) {
    const { instance, url, loading, cancelToken } = options
    // eslint-disable-next-line no-console
    console.time(url)
    instance.interceptors.request.use((config) => {
      if (cancelToken) {
        config.cancelToken = new axios.CancelToken((cancel) => {
          this.cancelTokenList.push({ url, cancel })
        })
      }
      if (loading) {
        if (!this.queueUrl)
          this.showLoading()

        this.queueUrl++
      }

      const userStore = useUserStore()
      if (userStore.token)
        config.headers[REQUEST.REQUEST_HEADER_TOKEN_FIELD] = userStore.token

      return config
    })
    instance.interceptors.response.use(
      (response) => {
        this.destroy(url, loading)
        const code = response.data[REQUEST.RESPONSE_CODE_FIELD]
        const data = response.data[REQUEST.RESPONSE_DATA_FIELD]
        const msg = response.data[REQUEST.RESPONSE_MSG_FIELD] || '系统错误，请稍候再试'

        // eslint-disable-next-line no-console
        console.timeEnd(url)
        // eslint-disable-next-line no-console
        console.log('request: success->', url, response.config.data || response.config.params, data)
        if (REQUEST.SUCCESS_CODE_ARR.includes(code))
          return data
        if (REQUEST.RESPONSE_CODE_ERROR_AUTH === code)
          this.errorAuthToast(msg)
        else
          this.errorToast(msg)

        return Promise.reject(response)
      },
      (error) => {
        this.destroy(url, loading)
        // eslint-disable-next-line no-console
        console.timeEnd(url)
        // eslint-disable-next-line no-console
        console.log('request: error->', url, error)
        const { code, message } = error || {}
        const err: string = error.toString()
        let msg = '系统错误，请稍候再试'
        if (code === 'ECONNABORTED' && message.includes('timeout'))
          msg = '接口请求超时，请刷新页面重试!'
        else if (err && err.includes('Network Error'))
          msg = '网络异常, 请检查您的网络连接是否正常'

        this.errorToast(msg)
        return Promise.reject(error)
      },
    )
  }

  public request = <T>(
    options: AxiosRequestConfig & { method: Method },
    loading?: boolean,
    cancelToken?: boolean,
  ): Promise<T> => {
    const instance = axios.create({
      baseURL: this.baseUrl,
      timeout: REQUEST.TIMEOUT,
      // 设置跨域是否携带凭证
      withCredentials: true,
    })
    this.interceptors({
      instance,
      url: options.url || '',
      loading: loading || true,
      cancelToken: cancelToken || false,
    })
    return instance(options)
  }
}
export const http = new Request({
  baseUrl: import.meta.env.VITE_API_URL,
})
