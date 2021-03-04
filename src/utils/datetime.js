/* moment 时间处理 */
import Vue from 'vue'
import moment from 'moment'
moment.locale('zh-cn')
Vue.filter('relativeTime', (time) => {
  return moment(time).fromNow()
})
