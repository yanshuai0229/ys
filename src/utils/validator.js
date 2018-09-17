import Vue from 'vue'
import VeeValidate, {Validator} from 'vee-validate'
import zh from 'vee-validate/dist/locale/zh_CN' // 引入中文文件
Validator.localize(zh)
const config = {
  locale: 'zh_CN',
  events: 'blur'
}
Vue.use(VeeValidate, config)
const dictionary = {
  zh_CN: {
    messages: {
      required: (field) => '该字段为必填项！'
    },
    attributes: {
      userPhone: '手机号',
      authPhone: '手机号'
    }
  }
}
Validator.localize(dictionary)
Validator.extend('phone', {
  getMessage: field => '请输入正确的手机号',
  validate: value => value.length === 11 && /^((13|14|15|17|18)[0-9]{1}\d{8})$/.test(value)
})
Validator.extend('positiveNumber', {
  getMessage: field => '请输入正确的数值',
  validate: value => /^([1-9]\d*(\.\d*[1-9])?)|(0\.\d*[1-9])$/.test(value)
})
