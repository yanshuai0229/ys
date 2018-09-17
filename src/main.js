// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

import store from './store'
import $ from 'jquery'
import VueProgressBar from 'vue-progressbar'
import mavonEditor from 'mavon-editor'

import "../node_modules/vue-snotify/styles/simple.scss";
import Snotify from 'vue-snotify';
import Vuelidate from 'vuelidate'

// import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
// import '../node_modules/bootstrap/dist/js/bootstrap.min.js';
// 配置百度编辑器
import '../static/ue/ueditor.config.js'
import '../static/ue/ueditor.all.js'
import '../static/ue/lang/zh-cn/zh-cn.js'
import '../static/ue/ueditor.parse.js'

import VueQuillEditor from 'vue-quill-editor'

// require styles
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

import 'mavon-editor/dist/css/index.css'

// 引用全局变量文件
import global from './config/index.js'
// 引用工具文件
import utils from './utils/index.js'
// 引用API文件
import api from './api/index.js'
// TOKEN处理文件
import varDeal from './utils/globalVar.js'

// 将全局变量绑定到全局
Vue.prototype.$global = global
// 将工具方法绑定到全局
Vue.prototype.$utils = utils
// 将API方法绑定到全局
Vue.prototype.$api = api

Vue.prototype.$VD = varDeal

Vue.use(VueProgressBar, global.progressBarOptions)

Vue.use(mavonEditor)

Vue.use(VueQuillEditor)

Vue.use(Snotify, global.snotifyOptions)

Vue.use(Vuelidate)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  components: { App },
  template: '<App/>'
})
