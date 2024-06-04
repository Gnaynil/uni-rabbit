import { httpInstance } from '@/utils/http'
export const getHomeBannerAPI = (distributionSite = 1) => {
  return httpInstance({
    method: 'GET',
    url: '/home/banner',
    data: {
      distributionSite
    }
  })
}
export const getHomeCategoryAPI = () => {
  return httpInstance({
    method: 'GET',
    url: '/home/category/mutli',
  })
}
export const getHomeHotItemAPI = () => {
  return httpInstance({
    method: 'GET',
    url: '/home/hot/mutli',
  })
}
export const getHomeGoodsGuessLikeAPI = (data) => {
  return httpInstance({
    method: 'GET',
    url: '/home/goods/guessLike',
    data
  })
}
