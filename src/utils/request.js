/* axios 请求模块 */
import axios from 'axios'
import jsonBig from 'json-bigint'
import store from '@/store'
const request = axios.create({
  baseURL: 'http://ttapi.research.itcast.cn/'
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
  const { user } = store.state
  user && (config.headers.Authorization = `Bearer ${user.token}`)
  return config
}, function (error) {
  // Do something with request error
  return Promise.reject(error)
})
export default request