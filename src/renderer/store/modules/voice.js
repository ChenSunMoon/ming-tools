import * as actions from './voice/actions'
import mutations from './voice/mutations'
const state = {
  appid: '',
  key: '',
  secretKey: ''
}
export default {
  namespaced: true,
  state,
  actions,
  mutations
}
