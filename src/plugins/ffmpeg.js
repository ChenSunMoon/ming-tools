/**
 * 设置ffmpeg路径
 * @作者：陈明明
 * @创建日期 ： 2021/11/10 16:39
 */
import ffmpeg from 'fluent-ffmpeg'
export default () => {
    let ffmpegPath = `${process.cwd()}\\addons\\ffmpeg`
    ffmpeg.setFfmpegPath(ffmpegPath + '\\bin\\ffmpeg.exe');
    ffmpeg.setFfprobePath(ffmpegPath + '\\bin\\ffprobe.exe')
}