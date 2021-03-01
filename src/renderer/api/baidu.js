import axios from 'axios'
const token = (grantType, clientId, clientSecret) => {
  return axios.get('https://openapi.baidu.com/oauth/2.0/token', {params: {
    grant_type: grantType,
    client_id: clientId,
    client_secret: clientSecret
  }})
}
const text2audio = (data) => {
  return axios.post('https://tsn.baidu.com/text2audio', data)
}
const text2audioUrl = (data) => {
  let url = 'https://tsn.baidu.com/text2audio?'
  // data.tex = encodeURI(data.tex)
  for (let key in data) {
    url += key + '=' + data[key] + '&'
  }
  return url
}
export default {
  token,
  text2audio,
  text2audioUrl
}
