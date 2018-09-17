import Vue from 'vue'
import store from '@/store'
import Router from 'vue-router'
/* front */
import Index from '@/page/index'
import Login from '@/page/front/login'
import Register from '@/page/front/register'
import Home from '@/page/front/home'
import Form from '@/page/front/form'
import List from '@/page/front/list'
import Detail from '@/page/front/detail'
import User from '@/page/front/user'
/* front */

/* admin */
import MenuList from '@/page/admin/menu/list'
import MenuModel from '@/page/admin/menu/model'
import ClassificationList from '@/page/admin/classification/list'
import ClassificationSubList from '@/page/admin/classification/subList'
import ClassificationModel from '@/page/admin/classification/model'
/* admin */

import Test from '@/page/front/quill-editor'
Vue.use(Router)

const routes = [
  {
    path: '/index',
    component: Index,
    redirect: '/home',
    children: [
      {
        path: '/home',
        name: 'HOME',
        component: Home
      }, {
        path: '/form/:id',
        component: Form
      }, {
        path: '/list/:type',
        component: List
      }, {
        path: '/detail/:id',
        component: Detail
      }, {
        path: '/user',
        component: User
      }, {
        path: '/admin/menu/list',
        component: MenuList
      }, {
        path: '/admin/menu/model/:id',
        name: 'MENU',
        component: MenuModel
      }, {
        path: '/admin/classification/list',
        component: ClassificationList
      }, {
        path: '/admin/classification/subList/:pid',
        component: ClassificationSubList
      }, {
        path: '/admin/classification/model/:pid/:id',
        name: 'CLASSIFICATION',
        component: ClassificationModel
      }, {
        path: '/test',
        name: 'Test',
        component: Test
      }
    ]
  }, {
    path: '/login',
    component: Login
  }, {
    path: '/register',
    component: Register
  }, {
    path: '/',
    redirect: '/login'
  }
]

// 页面刷新时，重新赋值token 和 userId
const token_info_ys = JSON.parse(sessionStorage.getItem('token_info_ys'))
if (token_info_ys && token_info_ys.token && token_info_ys.userId && token_info_ys.role && token_info_ys.token!=='' && token_info_ys.token!=='' && token_info_ys.role!=='') {
  store.commit('set_token_info', token_info_ys)
}

export default new Router({
  routes: routes,
  scrollBehavior (to, from, savedPosition) {
    return {
      x: 0,
      y: 0
    }
  }
})
