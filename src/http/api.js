import fly from './config'

// 配置API接口地址
let prefix = '/public'
let apiList = {}

apiList.postSearch = params => {
  return fly.post(`${prefix}/search`, params)
}

apiList.postSearchBySenior = params => {
  return fly.post(`${prefix}/senior`, params)
}

export default apiList
