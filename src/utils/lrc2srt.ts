import fs from "fs";
import iconv from 'iconv-lite'

export interface LrcLine  {
  min:string,
  sec:string,
  mil:string,
  content:string
}
class Lrc2SrtConvert {
  sourcePath: string
  encoding: string

  constructor(sourcePath: string, encoding: string) {
    this.sourcePath = sourcePath
    this.encoding = encoding
  }
  start () {
    try {
      const lrcLines = this.getLrcLines(this.readFile())
      let str = ''
      for (let i = 0; i < lrcLines.length; i++) {
        const item = lrcLines[i]
        if (!item.content) continue // 跳过空行
        if (i !== lrcLines.length - 1) {
          const next = lrcLines[i + 1]
          str += `${i + 1}\n00:${item.min}:${item.sec},${item.mil} --> 00:${next.min}:${next.sec},${next.mil}\n${item.content}\n\n`
        } else {
          str += `${i + 1}\n00:${item.min}:${item.sec},${item.mil} --> ${item.min}:${item.sec},999\n${item.content}\n\n`
        }
      }
      const path = this.sourcePath.replace('lrc', 'srt')
      fs.writeFileSync(path, '\uFEFF' + str)
      return Promise.resolve(path)
    } catch (e) {
      return Promise.reject(e)
    }
  }
  readFile(): string {
    const file = fs.readFileSync(this.sourcePath, {encoding: 'binary'})
    const buffer = Buffer.from(file, 'binary')
    return iconv.decode(buffer, this.encoding)
  }
  getLrcLines (data:string):Array<LrcLine> {
    const pattern = /\[(\d{2}):(\d{2})\.(\d{2})\](.*)/
    const lines = data.split('\n')
    const lrcLines:Array<LrcLine> = []
    // 歌词主体
    for (const item of lines) {
      const lrc = pattern.exec(item)
      if (lrc) {
        lrcLines.push({
          min: lrc[1],
          sec: lrc[2],
          mil: lrc[3] + '0',
          content: lrc[4]
        })
      }
    }
    return lrcLines
  }
}

export default Lrc2SrtConvert