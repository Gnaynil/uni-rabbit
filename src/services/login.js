import { httpInstance } from '@/utils/http'
export const postLoginWxMin = (data) =>{
  return httpInstance({
    method:'POST',
    url:'/login/wxMin',
    data
  })
}
export const postLoginWxMinSimpleAPI = (phoneNumber) =>{
  return httpInstance({
    method:'POST',
    url:'/login/wxMin/simple',
    data:{
      phoneNumber
    }
  })
}
