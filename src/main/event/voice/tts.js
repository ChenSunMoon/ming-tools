import {speech as ApiSpeech} from 'baidu-aip-sdk'
import {ipcMain} from 'electron'
import fs from 'fs'
import {INIT_BAIDU_CLIENT_RES, INIT_BAIDU_CLIENT, BAIDU_TTS_START, BAIDU_TTS_START_RES} from './tag'

const self = {client: null}
const init = () => {
  initClientEvent()
  initStartEvent()
}
const initClientEvent = () => {
  ipcMain.on(INIT_BAIDU_CLIENT, (event, req) => {
    self.client = new ApiSpeech(req.id, req.key, req.secretKey)
    event.sender.send(INIT_BAIDU_CLIENT_RES, {code: 200, msg: 'success'})
  })
}
const initStartEvent = () => {
  ipcMain.on(BAIDU_TTS_START, (event, req) => {
    if (self.client) {
      self.client.text2audio(req.tex, req).then((res) => {
        if (!res.err_no && !req.data) {
          let data = req.data
          let filePath = req.filePath ? req.filePath : `${req.folder}\\${req.tex}.mp3`
          fs.writeFileSync(filePath, data)
          event.sender.send(BAIDU_TTS_START_RES, {code: 200, msg: '保存成功！'})
        } else {
          event.sender.send(BAIDU_TTS_START_RES, {code: 400, msg: res.err_msg})
        }
      })
        .catch(error => {
          console.log(error)
          event.sender.send(BAIDU_TTS_START_RES, {code: 400, msg: '出错：' + error.errorType})
        })
    } else {
      event.sender.send(BAIDU_TTS_START_RES, {code: 400, msg: '百度账号初始化失败！'})
    }
  })
}
export default {
  init
}
