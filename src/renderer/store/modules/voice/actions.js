import ffmpeg from 'fluent-ffmpeg'
import fs from 'fs'
export const mergeAllAudio = ({commit}, data) => {
  let filePath = getFileName(data.saveFolder) + '.mp3'
  let command = ffmpeg()
  command.outputFormat('mp3')
  data.files.forEach(item => {
    command.mergeAdd(item)
  })
  command.mergeToFile(filePath)
}
const getFileName = (folder) => {
  let names = folder.split('\\')
  let name = names[names.length - 1]
  return folder + `\\${name}`
}
export const genVoiceSrt = ({commit}, data) => {
  let filePath = getFileName(data.saveFolder) + '.srt'
  console.log(data)
  let srts = ''
  let times = []
  for (let i = 0; i < data.list.length; i++) {
    let item = data.list[i]
    let start = {}
    let end = {}
    if (i !== 0) {
      start = getHMSM(times[i - 1] + 1)
      end = getHMSM(times[i - 1] + item.duration)
      times.push(times[i - 1] + item.duration)
    } else {
      start = {hour: 0, min: 0, sec: 0, mil: 0}
      end = getHMSM(item.duration)
      times.push(item.duration)
    }
    let line = `${i + 1}\n${start.hour}:${start.min}:${start.sec},${start.mil} --> ${end.hour}:${end.min}:${end.sec},${end.mil}\n${item.text}\n`
    i <= 1 ? srts += line : srts += '\n' + line
  }
  fs.writeFileSync(filePath, '\uFEFF' + srts, {encoding: 'utf-8'})
}
/**
 * 获取时分秒毫秒
 * @param {Int} total 毫秒数
 */
const getHMSM = (total) => {
  let hour = parseInt(total / 3600000)
  let min = parseInt((total - hour * 3600 * 1000) / 60000)
  let sec = parseInt((total - hour * 3600 * 1000 - min * 60 * 1000) / 1000)
  let mil = parseInt(total - hour * 3600 * 1000 - min * 60 * 1000 - sec * 1000)
  return {hour, min, sec, mil}
}
