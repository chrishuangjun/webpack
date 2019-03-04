export function getValueType(val) {
  if (!val && typeof val === 'object') {
    //null
    return 'null'
  }
  let type = typeof val //not object,is undefined、number、boolean、string、symbol
  if (type === 'object') {
    //object:object、array、date、regex
    let typeStr = Object.prototype.toString.call(val)
    type = val.match(/.*\s([^\[]*)\]$/)[1]
  }
  return type
}
