import { httpInstance } from '@/utils/http.js'
//获取购物车订单信息
export const getMemberOrderPreAPI = () => {
  return httpInstance({
    method: 'GET',
    url: '/member/order/pre'
  })
}
//获取立即购买订单信息
export const getMemberOrderPreNowAPI = (data) => {
  return httpInstance({
    method: 'GET',
    url: '/member/order/pre/now',
    data
  })
}
//获取再次购买信息
export const getMemberOrderPreAgainAPI = (id) => {
  return httpInstance({
    method: 'GET',
    url: `/member/order/repurchase/${id}`
  })
}
//提交订单
export const postMemberOrderAPI = (data) => {
  return httpInstance({
    method: 'POST',
    url: '/member/order',
    data
  })
}
//获取订单详情
export const getMemberOrderByIdAPI = (id) => {
  return httpInstance({
    method: 'GET',
    url: `/member/order/${id}`
  })
}
//获取微信支付参数 需要appid为端口的id才能使用
export const getPayWxPayMiniPayAPI = (data) => {
  return httpInstance({
    method: 'GET',
    url: '/pay/wxPay/miniPay',
    data
  })
}

//模拟支付
export const getPayMockAPI = (data) => {
  return httpInstance({
    method: 'GET',
    url: '/pay/mock',
    data
  })
}

//模拟发货
export const getMemberOrderConsignmentByIdAPI = (id) => {
  return httpInstance({
    method: 'GET',
    url: `/member/order/consignment/${id}`
  })
}
//确认收货
export const putMemberOrderReceiptByIdAPI = (id) => {
  return httpInstance({
    method: 'PUT',
    url: `/member/order/${id}/receipt`
  })
}
//订单物流

export const getMemberOrderLogisticsByIdAPI = (id) => {
  return httpInstance({
    method: 'GET',
    url: `/member/order/${id}/logistics`
  })
}
//删除订单
export const deleteMemberOrderAPI = (data = { ids }) => {
  return httpInstance({
    method: 'DELETE',
    url: '/member/order',
    data
  })
}
//取消订单
export const getMemberOrderCancelByIdAPI = (id, data = { cancelReason }) => {
  return httpInstance({
    method: 'PUT',
    url: `/member/order/${id}/cancel`,
    data
  })
}
//获取订单列表
export const getMemberOrderAPI = (data) => {
  return httpInstance({
    method: 'GET',
    url: '/member/order',
    data
  })
}
