import bilibili from './bilibili'
import Voice from './voice'
import Convert from './convert'
export default {
  init () {
    bilibili.init()
    Voice.init()
    Convert.init()
  }
}
