import { httpInstance } from '@/utils/http'
export const getMemberProfileAPI = () => {
  return httpInstance({
    method: 'GET',
    url: '/member/profile',
  })
}
export const putMemberProfileAPI  = (data) => {
  return httpInstance({
    method: 'PUT',
    url: '/member/profile',
    data
  })
}
