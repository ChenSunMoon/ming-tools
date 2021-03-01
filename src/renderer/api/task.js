import axios from 'axios'
// const cmds = () => {
//   return axios.get('http://api.chensunmoon.cn/cmds')
// }
const cmds = () => {
  return axios.get('static/taskConfig.json')
}
const start = () => {
  return new Promise((resolve, reject) => {
  })
}
export default {
  cmds,
  start
}
