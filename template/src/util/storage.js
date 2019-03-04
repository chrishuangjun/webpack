/**
 *存储localStorage、sessionStorage
 * **/
const storages = [window.sessionStorage, window.localStorage]
export const setStorage = (name, content, index = 0) => {
  if (!name) return null
  if (typeof content !== 'string') {
    content = JSON.stringify(content)
  }
  if (index !== 0) index = 1
  storages[index].setItem(name, content)
}

/**
 * 获取localStorage
 */
export const getStorage = (name, index = 0) => {
  if (!name) return null
  if (index !== 0) index = 1
  return storages[index].getItem(name)
}

export const getStorageParse = (name, index = 0) => {
  let objStr = getStorage(name, index)
  if (objStr === null) return null
  objStr = objStr
    .replace(/[\\"']/g, function(r) {
      return '\\' + r
    })
    .replace(/%/g, '\\x25')
    .replace(/\n/g, '\\n')
    .replace(/\r/g, '\\r')
    .replace(/\x01/g, '\\x01')
    .replace(/[\\\^\$\*\+\?\{\}\.\(\)\[\]]/g, function(a) {
      return '\\' + a
    })
    .replace(/function/gi, '')
  return JSON.parse(objStr)
}

/**
 * 删除localStorage
 */
export const removeStorage = (name, index = 0) => {
  if (!name) return null
  if (index !== 0) index = 1
  storages[index].removeItem(name)
}

/**
 * 删除localStorage
 */
export const clearStorage = (index = 0) => {
  if (index !== 0) index = 1
  storages[index].clear()
}
