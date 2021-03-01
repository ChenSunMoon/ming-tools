<template>
  <Card>
    <p slot="title">
      语音合成
    </p>
    <a href="#" slot="extra" @click.prevent="$router.push('/setting/baidu')">
      <Icon type="ios-loop-strong"></Icon>
        账号设置
     </a>
     <form-tts ref="form" id="tts"></form-tts>
      <Button type="primary" @click="checkAndSart" style="display: inline-block">保存</Button>&nbsp;<select-folder  style="display: inline-block" type="primary" v-model="saveFolder" @select="onSelect">{{saveFolder}}</select-folder>
  </Card>
</template>
<script>
import formTts from '../../components/baidu/form-tts'
import selectFolder from '../../components/widget/selectFolder'
import {speech as ApiSpeech} from 'baidu-aip-sdk'
import fs from 'fs'
export default {
  components: {
    selectFolder,
    formTts
  },
  data () {
    return {
      saveFolder: '',
      baidu: undefined
    }
  },
  created () {
    this.saveFolder = localStorage.getItem('tts.saveFolder')
    let id = localStorage.getItem('baidu.id')
    let key = localStorage.getItem('baidu.key')
    let secretKey = localStorage.getItem('baidu.secretKey')
    this.baidu = new ApiSpeech(id, key, secretKey)
  },
  methods: {
    initClient () {
    },
    saveSetting () {
      localStorage.setItem('tts.saveFolder', this.saveFolder)
    },
    checkAndSart () {
      if (!this.saveFolder) {
        return this.$$Message.error('请选择保存路径！')
      }
      this.$refs.form.getFormRef().validate(res => {
        if (res) {
          this.download()
        } else {
          this.$Message.error('请检查输入')
        }
      })
    },
    download () {
      localStorage.setItem('tts.saveFolder', this.saveFolder)
      let form = this.$refs.form.form
      this.baidu.text2audio(form.tex, form)
        .then(res => {
          if (res.data) {
            fs.writeFile(this.saveFolder + `\\${form.tex}.mp3`, res.data, () => {
              this.$Message.success('保存成功！')
            })
          } else {
            this.$Message.error('合成语音失败！')
          }
        })
        .catch(err => {
          console.lgo(err)
          this.$Message.error('合成语音失败！')
        })
      this.saveSetting()
    },
    onSelect (res) {
      this.saveFolder = res
    }
  },
  destoryed () {
  }
}
</script>
<style>
 
</style>
