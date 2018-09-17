// 引用全局变量文件
import global from '../config/index.js'
import store from '@/store'
import router from '@/router'
// 引用axios
var axios = require('axios')

// 将全局变量绑定到全局
var $global_api = global
export default{
  failureHandling (msg) {
    if (msg == 'Invalid Token') {
      store.commit('del_token_info')
      router.push({path: '/login'})
    } else if (msg== 'No Authorization') {
      router.push({path: '/login'})
    } else {
      alert(msg)
    }
  }
}
