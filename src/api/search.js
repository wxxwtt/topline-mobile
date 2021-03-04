/* 文章模块 */
import request from '@/utils/request'
// 获取频道对应的文章列表
export const getrSearchSuggestion = searchValue => {
  return request({
    method: 'GET',
    url: '/app/v1_0/suggestion',
    params: {
      q: searchValue
    }
  })
}
/**
 * 获取搜索结果
 */
export const getSearch = params => {
  return request({
    method: 'GET',
    url: '/app/v1_0/search',
    params
  })
}
