import {httpInstance} from '@/utils/http'
export const getHomeBannerAPI = (distributionSite = 1) => {
  return httpInstance({
    method: 'GET',
    url: '/home/banner',
    data: {
      distributionSite
    }
  })
}
