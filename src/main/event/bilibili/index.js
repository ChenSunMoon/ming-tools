import {ipcMain} from 'electron'
// eslint-disable-next-line camelcase
import axios from 'axios'
const http = axios.create({
  adapter: require('axios/lib/adapters/http')
})
export const getAllUsers = async (BV, total) => {
  let users = {}
  let oid = bvToOid(BV)
  for (let i = 1; i <= total; i++) {
    let our = `https://api.bilibili.com/x/v2/reply?pn=${i}&type=1&oid=${oid}&sort=2`
    let response = await http.get(our)
    if (response.data.data.replies) {
      response.data.data.replies.forEach(element => {
        users[element.mid] = element
      })
    } else {
      break
    }
  }
  return users
}
const bvToOid = (BV) => {
  let table = 'fZodR9XQDSUm21yCkr6zBqiveYah8bt4xsWpHnJE7jL5VG3guMTKNPAwcF'
  let tr = {}
  for (let i = 0; i < 58; i++) {
    tr[table[i]] = i
  }
  let s = [11, 10, 3, 8, 4, 6]
  let xor = 177451812
  let add = 8728348608
  let r = 0
  for (let i = 0; i < 6; i++) {
    r += tr[BV[s[i]]] * 58 ** i
  }
  return (r - add) ^ xor
}
export default {
  tasks: {},
  init () {
    ipcMain.on('BILIBILI_GET_ALL_COMMENTS', (event, req) => {
      getAllUsers(req.BV, req.pageTotal)
        .then(data => {
          event.sender.send('RES_BILIBILI_GET_ALL_COMMENTS', data)
        })
    })
  }
}
