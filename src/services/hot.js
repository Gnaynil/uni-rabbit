import { httpInstance } from '@/utils/http'
export const getHotRecommendAPI  = (url,data)=>{
  return httpInstance({
    method:'GET',
    url,
    data
  })
}
