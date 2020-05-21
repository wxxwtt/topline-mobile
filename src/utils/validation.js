/* 表单验证配置模块 */
import Vue from 'vue'
import { ValidationProvider, ValidationObserver, extend } from 'vee-validate'

// 加载内置验证规则
import * as rules from 'vee-validate/dist/rules'

// 加载中文语言包
import { messages } from 'vee-validate/dist/locale/zh_CN.json'

Vue.component('ValidationProvider', ValidationProvider)
Vue.component('ValidationObserver', ValidationObserver)
Vue.component('extend', extend)

Object.keys(rules).forEach(rule => {
  extend(rule, {
    ...rules[rule],
    message: messages[rule]
  })
})

// 添加自定义规则

extend('mobile', {
  validate: value => {
    return /^1\d{10}$/.test(value)
  },
  message: '{_field_}格式有误'
})
extend('code', {
  validate: value => {
    return /^\d{6}$/.test(value)
  },
  message: '{_field_}格式有误'
})
