/* axios 请求模块 */
import axios from 'axios'
import jsonBig from 'json-bigint'
import store from '@/store'
import router from '@/router/'
const request = axios.create({
  baseURL: 'http://ttapi.research.itcast.cn/'
  // baseURL: 'https://toutiao.m.lipengzhou.com'
  // baseURL: 'http://toutiao-app.itheima.net'
  // baseURL: 'http://api-toutiao-web.itheima.net'
})

request.defaults.transformResponse = [function (data) {
  try {
    return jsonBig.parse(data)
  } catch (error) {
    return {}
  }
}]
// Add a request interceptor
request.interceptors.request.use(function (config) {
  // Do something before request is sent
  const { userInfo } = store.state
  userInfo && (config.headers.authorization = `Bearer ${userInfo.token}`)
  return config
}, function (error) {
  // Do something with request error
  return Promise.reject(error)
})
// Add a response interceptor
request.interceptors.response.use(function (response) {
  // Any status code that lie within the range of 2xx cause this function to trigger
  // Do something with response data
  return response
}, async function (error) {
  const { config, response } = error
  if (response && response.status === 401) {
    const { userInfo } = store.state
    if (!userInfo || !userInfo.refresh_token) {
      redirectLogin()
      return
    }
    try {
      const { data } = await axios({
        method: 'PUT',
        url: 'http://ttapi.research.itcast.cn/app/v1_0/authorizations',
        headers: {
          Authorization: `Bearer ${userInfo.refresh_token}`
        }
      })

      store.commit({
        type: 'updatedUser',
        userInfo: {
          ...userInfo,
          token: data.data.token
        }
      })
      return request(config) // 把本次因为token失效请求失败的请求，在重新发送 并把请求返回
    } catch (error) {
      redirectLogin()
    }
  }
  // Any status codes that falls outside the range of 2xx cause this function to trigger
  // Do something with response error
  return Promise.reject(error)
})
function redirectLogin () {
  // router.currentRoute 当前路由对象，和你在组件中访问的 this.$route 是同一个东西
  router.push('/login')
}
export default request
