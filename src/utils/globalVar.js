import Vue from 'vue'
export default {
  getVal (key) {
    return Vue.prototype[key]
  },
  setVal (key, token_val) {
    Vue.prototype[key] = token_val
    return Vue.prototype[key]
  }
}
