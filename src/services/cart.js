import { httpInstance } from '@/utils/http'
//加入购物车
export const postMemberCartAPI  = (data)=>{
  return httpInstance({
    method:'POST',
    url:'/member/cart',
    data
  })
}
//获得购物车列表
export const getMemberCartAPI = ()=>{
  return httpInstance({
    method:'GET',
    url:'/member/cart'
  })
}
//删除购物车
export const deleteMemberCartAPI =(data)=>{
  return httpInstance({
    method:'DELETE',
    url:'/member/cart',
    data
  })
}
//修改购买数量
export const putMemberCartBySkuIdAPI =(skuId,data)=>{
  return httpInstance({
    method:'PUT',
    url:`/member/cart/${skuId}`,
    data
  })
}
//修改商品选中/全选

export const putMemberCartSelectedAPI = (data)=>{
  return httpInstance({
    method:'PUT',
    url:'/member/cart/selected',
    data
  })
}
