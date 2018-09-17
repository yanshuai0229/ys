// 引用接口返回值处理文件
import Vue from 'vue'
import qs from 'qs';
import store from '@/store'
import handling from './error.js'
// 引用axios
var axios = require('axios')
var failure = handling.failureHandling
var token = ''
// 判断参数是否为空对象
function isEmptyObject (obj) {
  for (var key in obj) {
    return false// 返回false，不为空对象
  }
  return true// 返回true，为空对象
}
// Token参数处理函数
function dealToken (type, o) {
  token = store.state.token_info.token
  if (isEmptyObject(o)) {
    o = {}
  }
  return o
}
/*
  接口处理函数
*/
function apiAxios (method, baseURL, url, params, success, error) {
  params = dealToken(method, params)
  axios({
    method: method,
    url: url,
    data: method === 'POST' ? qs.stringify(params) : null,
    params: (method === 'GET') ? params : null,
    headers: {
      'Authorization': 'Bearer ' + token
    },
    baseURL: baseURL,
    withCredentials: false
  })
    .then(function (res) {
      if (res.data.result === 'Success') {
        if (success) {
          success(res.data)
        }
      } else if (res.data.result === 'Error') {
        if (error) {
          error(res.data.message)
        } else {
          failure(res.data.message)
        }
      }
    })
    .catch(function (err) {
      if (err) {
        console.log(err)
      }
    })
}
// 返回在vue模板中的调用接口

export default {
  get: function (baseURL, url, params, success, error) {
    return apiAxios('GET', baseURL, url, params, success, error)
  },
  post: function (baseURL, url, params, success, error) {
    return apiAxios('POST', baseURL, url, params, success, error)
  }
}
