import {ipcMain} from 'electron'
import fs from 'fs'
import {CONVERT_LRC_TO_SRT, CONVERT_LRC_TO_SRT_RES} from './flag'
import iconv from 'iconv-lite'
const init = () => {
  ipcMain.on(CONVERT_LRC_TO_SRT, (event, req) => {
    let file = fs.readFileSync(req.originFilePath, {encoding: 'binary'})
    let buffer = Buffer.from(file, 'binary')
    let data = iconv.decode(buffer, req.encoding)
    let res = convert(data.toString())
    let path = req.originFilePath.replace('lrc', 'srt')
    fs.writeFileSync(path, '\uFEFF' + res)
    event.sender.send(CONVERT_LRC_TO_SRT_RES, {code: 200, msg: '转换成功！', data: {path}})
  })
}
const convert = (data) => {
  let pattern = /\[(\d{2}):(\d{2})\.(\d{2})\](.*)/
  let lines = data.split('\n')
  let srts = []
  // 头部
  // let ti = /\[ti:(.*)\]/.exec(data)[1] || ''
  // let ar = /\[ar:(.*)\]/.exec(data)[1] || ''
  // let by = /\[by:(.*)\]/.exec(data)[1] || ''
  // let al = /\[ti:(.*)\]/.exec(data)[1] || ''
  // srts.push({min: '00', sec: '01', mil: '000', content: ` ${ti}`})
  // srts.push({min: '00', sec: '02', mil: '000', content: `歌手:${ar}`})
  // srts.push({min: '00', sec: '03', mil: '000', content: `专辑:${al}`})
  // srts.push({min: '00', sec: '04', mil: '000', content: `制作:${by}`})
  // 歌词主体
  for (let item of lines) {
    let lrc = pattern.exec(item)
    console.log(lrc)
    if (lrc) {
      srts.push({
        min: lrc[1],
        sec: lrc[2],
        mil: lrc[3] + '0',
        content: lrc[4]
      })
    }
  }
  let str = ''
  for (let i = 0; i < srts.length; i++) {
    let item = srts[i]
    if (!item.content) continue // 跳过空行
    if (i !== srts.length - 1) {
      let next = srts[i + 1]
      str += `${i + 1}\n00:${item.min}:${item.sec},${item.mil} --> 00:${next.min}:${next.sec},${next.mil}\n${item.content}\n\n`
    } else {
      str += `${i + 1}\n00:${item.min}:${item.sec},${item.mil} --> 00:10:00,000\n${item.content}\n\n`
    }
  }

  return str
}
export default {
  init
}
