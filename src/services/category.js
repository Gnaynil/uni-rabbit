import {httpInstance} from '@/utils/http'

export const getCategoryTopAPI = () =>{
  return httpInstance({
    method:'GET',
    url:'/category/top'
  })
}
