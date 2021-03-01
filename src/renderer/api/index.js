import Vue from 'vue'
import task from './task'
import baidu from './baidu'
import * as cmd from './cmd/index'
const install = () => {
  Vue.prototype.$api = {
    task,
    baidu,
    cmd
  }
}
export default {
  install
}
