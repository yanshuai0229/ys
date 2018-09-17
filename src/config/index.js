import { SnotifyPosition } from 'vue-snotify'
// 配置全局变量
const domains = 'http://localhost'
const ports = 8039

const noAuthApiPath = domains + ':' + ports + '/learn'
const authApiPath = domains + ':' + ports + '/learn/auth'

// 进度条配置
const progressBarOptions = {
  color: '#bffaf3',
  failedColor: '#874b4b',
  thickness: '5px',
  position: 'relative'
}

// 分页配置
const paginationOptions = {
  initial_page: 0,
  page_num: 9,
  container_class: 'pagination',
  container_class_evaluate: 'pagination_evaluate',
  page_class: 'page-item',
  page_link_class: 'page-link-item',
  prev_class: 'prev-item',
  prev_link_class: 'prev-link-item',
  next_class: 'next-item',
  next_link_class: 'next-link-item',
  break_view_class: 'break-view',
  break_view_link_class: 'break-view-link',
  first_last_button: true,
  active_class: 'active-class',
  disabled_class: 'disabled-class',
  first_button_text: '首页',
  last_button_text: '尾页',
  prev_text: '上一页',
  next_text: '下一页'
}

const snotifyOptions = {
  toast: {
    position: SnotifyPosition.rightTop
  }
}

export default {
  domains,
  authApiPath,
  noAuthApiPath,
  progressBarOptions,
  paginationOptions,
  snotifyOptions
}
