/**
 * api接口的统一出口
 */
import axios from '../http/http'; // 导入http中创建的axios实例
import qs from 'qs'; // 根据需求是否导入qs模块
// 登录模块接口
import login from './login/login';

let api = {};
/**
 * 自动引入api模块
 *
 * @param {*} r require.context的返回值
 */
function importAll(r) {
  let fileName,
    reg = /(?:.*\/)*(\w+)\.js$/;
  r.keys().forEach(key => {
    if (key == './index.js') return;
    fileName = key.match(reg)[1];
    api[fileName] = r(key).default;
  });
}
importAll(require.context('./', true, /\.js$/));
console.log(api);
//生成hash值
function hash(input) {
  var I64BIT_TABLE = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789_-'.split(
    ''
  );
  var hash = 5381;
  var i = input.length - 1;

  if (typeof input == 'string') {
    for (; i > -1; i--) hash += (hash << 5) + input.charCodeAt(i);
  } else {
    for (; i > -1; i--) hash += (hash << 5) + input[i];
  }
  var value = hash & 0x7fffffff;

  var retValue = '';
  do {
    retValue += I64BIT_TABLE[value & 0x3f];
  } while ((value >>= 6));

  return retValue;
}
//将请求地址配置文件转换成对应的url对象
function toUrl() {
  let url = {};
  for (let [module, moduleValue] of Object.entries(api)) {
    url[module] = {};
    for (let [key, value] of Object.entries(moduleValue)) {
      url[module][key] = value.url;
    }
  }
  return url;
}
//将请求地址转换成对应的ajax函数
function toApi() {
  let apiHttp = {};
  for (let [module, moduleValue] of Object.entries(api)) {
    apiHttp[module] = {};
    for (let [key, value] of Object.entries(moduleValue)) {
      value.method = value.method || 'get';
      apiHttp[module][key] = (function() {
        let repeatAjax = []; //存放每个ajax请求对应的hash值
        return p => {
          let hashVal = hash(`${value.url}${value.method}${JSON.stringify(p)}`);
          //防止上次请求还未返回，再次发送同样的ajax请求
          if (repeatAjax.indexOf(hashVal) != -1)
            return new Promise((resolve, reject) => {
              resolve();
            });
          repeatAjax.push(hashVal);
          return axios[value.method](
            value.url,
            value.method == 'get'
              ? {
                  params: p,
                }
              : qs.stringify(p)
          )
            .then(res => {
              repeatAjax.splice(repeatAjax.indexOf(hashVal), 1);
              return Promise.resolve(res);
            })
            .catch(err => {
              // 出错也要删除
              repeatAjax.splice(repeatAjax.indexOf(hashVal), 1);
              return Promise.reject(err);
            });
        };
      })();
    }
  }
  return apiHttp;
}
// 导出接口
export const apiUrl = toUrl();
export const apiHttp = toApi();
