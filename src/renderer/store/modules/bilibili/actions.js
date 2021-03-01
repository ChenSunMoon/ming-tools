import axios from 'axios'
axios.defaults.adapter = require('axios/lib/adapters/http')
export const getComments = ({ commit }, { BV }) => {
  let oid = bvToOid(BV)
  let our = `https://api.bilibili.com/x/v2/reply?pn=1&type=1&oid=${oid}&sort=2`
  axios.get(our)
    .then(res => {
      console.log(res)
    })
    .catch(err => {
      console.log(err)
    })
}
export const getOid = () => {
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
