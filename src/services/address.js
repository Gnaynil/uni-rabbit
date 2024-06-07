import { httpInstance } from '@/utils/http'
//新建地址
export const postMemberAddressAPI = (data) => {
  return httpInstance({
    method: 'POST',
    url: '/member/address',
    data
  })
}
//获取列表地址
export const getMemberAddressAPI = () => {
  return httpInstance({
    method: 'GET',
    url: '/member/address'
  })
}
//获取详情地址
export const getMemberAddressByIdAPI = (id) => {
  return httpInstance({
    method: 'GET',
    url: `/member/address/${id}`
  })
}
//修改地址
export const putMemberAddressByIdAPI = (id, data) => {
  return httpInstance({
    method: 'PUT',
    url: `/member/address/${id}`,
    data
  })
}
//删除地址
export const deleteMemberAddressByIdAPI = (id) => {
  return httpInstance({
    method: 'DELETE',
    url: `/member/address/${id}`,
  })
}
