import type { AxiosRequestHeaders } from 'axios'
import axios from 'axios'

const instance = axios.create({
  baseURL: import.meta.env.VITE_APP_AXIOS_BASE_URL,
  // baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  timeout: 5000, // request timeout
})

/**
 * 请求拦截
 */
instance.interceptors.request.use(
  (config) => {
    const { method, params } = config
    let customHeader = {}
    if (config.headers)
      customHeader = handleCustomHeaders(config.headers)

    // 附带鉴权的token
    const headers: AxiosRequestHeaders = {
      'Authorization': localStorage.getItem('token') ?? '',
      'X-Platform': 'H5',
      'X-Client-version': '0.1.0',
    }
    // 不缓存get请求
    if (method === 'get')
      headers['Cache-Control'] = 'no-cache'

    // delete请求参数放入body中
    if (method === 'delete') {
      headers['Content-type'] = 'application/json;'
      Object.assign(config, {
        data: params,
        params: {},
      })
    }

    return {
      ...config,
      headers: {
        ...headers,
        ...customHeader,
      },
    }
  },
  (error) => {
    return Promise.reject(error)
  },
)

/**
 * 响应拦截
 */
instance.interceptors.response.use((v) => {
  if (v.data?.code === 401) {
    localStorage.removeItem('token')
    // alert('即将跳转登录页。。。', '登录过期')
    // setTimeout(redirectHome, 1500)
    return v.data
  }
  if (v.status >= 200 && v.status < 300)
    return v.data

  // alert(v.statusText, '网络错误')
  track('requestError', { error: v.toString() })
  return Promise.reject(v)
}, (err) => {
  track('requestError', { error: err.toString() })
  return Promise.reject(err)
})

/**
 * 添加自定义 headers
 * @param headers AxiosRequestHeaders
 * @returns AxiosRequestHeaders
 */
function handleCustomHeaders(headers: AxiosRequestHeaders): AxiosRequestHeaders {
  const newHeaders: AxiosRequestHeaders = {}
  const defaultHeaders = ['common', 'delete', 'get', 'head', 'patch', 'post', 'put']
  for (const key in headers) {
    if (!defaultHeaders.includes(key))
      newHeaders[key] = headers[key]
  }
  return newHeaders
}
export default instance
