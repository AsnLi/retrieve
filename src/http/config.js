// 引入 fly

const Fly = require('flyio/dist/npm/wx')
const fetch = new Fly()

fetch.config = {
  timeout: 10000,
  baseURL: 'https://codepoem.xyz',
  headers: {
    'content-type': 'application/json'
  }
}

// 添加拦截器
fetch.interceptors.request.use((config, promise) => {
  // 给所有请求添加自定义header
  config.headers['X-Tag'] = 'flyio'
  return config
})

// 添加拦截器
fetch.interceptors.response.use((res, promise) => {
  // 给所有请求添加自定义header
  const { data = [], status = 200, statusText = 'ok' } = res
  if (res.status === 200) {
    return data
  }
  return promise.reject({ status, statusText, code: 401 })
})

export default fetch