const utils = {}

utils.toJson = (target, keys = []) => {
  if (target instanceof Array) {
    return target.map(item => {
      return Object.assign(item, keys.reduce((heap, key) => {
        heap[key] = JSON.parse(item[key])
        return heap
      }, {}))
    })
  }

  return Object.assign(target, keys.reduce((heap, key) => {
    heap[key] = JSON.parse(target[key])
    return heap
  }, {}))
}

utils.objToUrlParams = (pageUrl, target) => {
  const flag = Object.keys(target).reduce((output, key) => {
    output += [key, target[key]].join('=') + '&'
    return output
  }, pageUrl + '?')

  return flag.substring(0, flag.length - 1)
}

utils.formatTime = n => {
  const str = n.toString()
  return str[1] ? str : `0${str}`
}

utils.formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()

  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  const t1 = [year, month, day].map(utils.formatNumber).join('/')
  const t2 = [hour, minute, second].map(utils.formatNumber).join(':')

  return `${t1} ${t2}`
}

export default utils
