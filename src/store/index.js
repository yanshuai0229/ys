import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token_info: {
      userId: '',
      token: '',
      role: ''
    }
  },
  mutations: {
    set_token_info (state, tokenInfo) {
      state.token_info.userId = tokenInfo.userId
      state.token_info.token = tokenInfo.token
      state.token_info.role = tokenInfo.role
      sessionStorage.token_info_ys = JSON.stringify(state.token_info)
    },
    del_token_info (state) {
      state.token_info = {token: '', userId: '', role: ''}
      sessionStorage.removeItem('token_info_ys')
    }
  }
})
