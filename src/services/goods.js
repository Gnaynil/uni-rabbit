import { httpInstance } from '@/utils/http'
export const getGoodsByIdAPI = (id)=>{
  return httpInstance({
    method:'GET',
    url:'/goods',
    data:{id}
  })
}
