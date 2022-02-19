/**
 * @作者：陈明明
 * @创建日期 ： 2021/11/10 22:28
 */
import {ElNotification} from "element-plus";

export default {
  methods: {
    Toast(msg:string) {
      ElNotification({
        title: '提示',
        message: msg
      })
    }
  }
}