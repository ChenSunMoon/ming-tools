<template>
    <Card style="height:100%;">
      <span slot="title" >工程目录：<select-folder   type="primary" v-model="saveFolder" @select="onSelect" style="display:inline-block">{{saveFolder}}</select-folder></span>
      <a href="#" slot="extra" @click.prevent="$router.push('/setting/baidu')">
      <Icon type="ios-loop-strong"></Icon>
        账号设置
      </a>
      <Row style="height:100%;">
        <Col span="12" class="left">
          <form-tts id="pr-edit" ref="form"></form-tts>
          <Button-Group>
             <Button type="primary" @click="checkAndAdd" >添加</Button>
             <Button type="info" @click="playAll" v-show="playStatus === 0 || playStatus === 2">试听全部</Button>
             <Button type="error" @click="stopPlay" v-show="playStatus === 1">停止播放</Button>
             <Button type="primary" @click="mergeAll">合并所有</Button>
             <Button type="success" @click="genVoiceSrt">生成字幕</Button>
          </Button-Group>
        </Col>
        <Col ref="list" span="12" style="overflow-y:scroll;height:100%;">
        <List>
          <item v-for="item in this.content" :key="item.id" :value="item" 
          @remove="removeItem" 
          @edit="onItemEdit"
          @click.native="selectItem(item.id)"
          @play="onItemPlay"></item>
          </List>
        </Col>
      </Row>
      <Modal
        v-model="modal"
        title="修改"
        @on-ok="ok">
        <form-tts id="pr-modal-edit" ref="editForm"></form-tts>
    </Modal>
    </Card>
</template>
<script>
import formTts from '../../../components/baidu/form-tts'
import item from './item'
import selectFolder from '../../../components/widget/selectFolder'
import fs from 'fs'
import {speech as ApiSpeech} from 'baidu-aip-sdk'
const audio = new Audio()
export default {
  components: {
    formTts,
    selectFolder,
    item
  },
  data () {
    return {
      saveFolder: '',
      content: [],
      curSelect: 0,
      baidu: undefined,
      curSelectedId: 0,
      modal: false,
      playStatus: 0, // 0默认,1播放中,2暂停
      editId: 0 // 需要修改的item的id
    }
  },
  mounted () {
    document.addEventListener('keyup', this.enterKey)
    this.$nextTick((res) => {
      this.$refs.form.clearTex()
    })
    this.loadProject(localStorage.getItem('tts.project.lastFolder') || '')
  },
  created () {
    let id = localStorage.getItem('baidu.id')
    let key = localStorage.getItem('baidu.key')
    let secretKey = localStorage.getItem('baidu.secretKey')
    this.baidu = new ApiSpeech(id, key, secretKey)
  },
  destroyed () {
    document.removeEventListener('keyup', this.enterKey)
    this.saveProject()
  },
  methods: {
    loadProject (path) {
      this.saveFolder = path
      this.content = []
      fs.readFile(this.saveFolder + '/config.json', (err, data) => {
        if (!err) {
          this.content = JSON.parse(data.toString())
          this.content.forEach(res => {
            if (res.isSelected) {
              this.curSelectedId = res.id
            }
          })
        } else {
          console.log('new project')
        }
      })
    },
    enterKey (e) {
      if (e.code === 'Enter' && !this.modal) {
        this.checkAndAdd()
      }
    },
    addItem () {
      let id = new Date().getTime()
      let item = {
        id,
        form: {...this.$refs.form.form},
        filePath: '',
        isSelected: false
      }
      item.form.tex = item.form.tex.replace(/[\r\n]/g, '') // 去除回车
      let curI = this.findItemById(this.curSelectedId)
      curI === -1 ? this.content.push(item) : this.content.splice(curI + 1, 0, item)
      this.$refs.form.clearTex()
      this.genVoiceFile(id)
      this.selectItem(id)
      this.$nextTick(() => {
        this.$refs.list.$el.scrollTop = this.$refs.list.$el.scrollHeight
      })
    },
    genVoiceFile (id) {
      let item = this.content[this.findItemById(id)]
      this.baidu.text2audio(item.form.tex, item.form)
        .then(res => {
          if (res.data) {
            let filePath = this.saveFolder + `\\${new Date().getTime()}.mp3`
            fs.writeFile(filePath, res.data, () => {
              item.filePath = filePath
              let audio = new Audio(filePath)
              audio.load()
              audio.oncanplay = () => {
                item.duration = audio.duration * 1000
                this.saveProject()
              }
            })
          } else {
            this.$Message.error('合成语音失败！')
          }
        })
        .catch(err => {
          console.error(err)
          this.$Message.error('合成语音失败！')
        })
    },
    findItemById (id) {
      return this.content.findIndex(v => { return v.id === id })
    },
    selectItem (id) {
      let i = this.findItemById(id)
      if (i === -1) return
      let curI = this.findItemById(this.curSelectedId)
      if (curI !== -1) {
        this.content[this.findItemById(this.curSelectedId)].isSelected = false
      }
      this.content[i].isSelected = true
      this.curSelectedId = id
    },
    removeItem (id) {
      let i = this.findItemById(id)
      fs.unlink(this.content[i].filePath, () => {
        console.log('delete file success ')
        this.saveProject()
      })
      this.content.splice(i, 1)
    },
    onItemEdit (id) {
      let item = this.content[this.findItemById(id)]
      this.editId = id
      this.modal = true
      this.$refs.editForm.form = {...item.form}
    },
    checkAndAdd () {
      this.$refs.form.getFormRef().validate(res => {
        if (res) {
          this.addItem()
        } else {
          this.$Message.error('请检查输入！')
        }
      })
    },
    playAll () {
      if (this.content.length > 0 && this.content.length > this.curSelect) {
        this.selectItem(this.content[this.curSelect].id)
        audio.src = this.content[this.curSelect].filePath
        audio.onended = () => {
          this.curSelect += 1
          this.playAll()
        }
        audio.play()
        this.playStatus = 1
      } else {
        this.curSelect = 0
        this.playStatus = 0
      }
    },
    stopPlay () {
      this.playStatus = 2
      this.curSelect = 0
      audio.pause()
      audio.onended = null
    },
    onSelect (e) {
      localStorage.setItem('tts.project.lastFolder', e)
      this.loadProject(e)
    },
    saveProject () {
      if (this.content.length <= 0) {
        return
      }
      fs.writeFile(this.saveFolder + '/config.json', JSON.stringify(this.content), (err, res) => {
        if (!err) {
          console.log('自动保存成功')
        } else {
          console.error(err)
        }
      })
    },
    onItemPlay (filePath) {
      if (this.playStatus === 1) {
        this.stopPlay()
      }
      audio.src = filePath
      audio.play()
    },
    ok () {
      let item = this.content[this.findItemById(this.editId)]
      let editForm = this.$refs.editForm.form
      item.form = {...editForm}
      fs.unlink(item.filePath, () => { console.log('delete file success') }) // 删除旧文件
      this.genVoiceFile(item.id)
      this.editId = 0
    },
    genVoiceSrt () {
      let list = []
      this.content.forEach(item => {
        list.push({duration: item.duration, text: item.form.tex})
      })
      this.$store.dispatch('voice/genVoiceSrt', {saveFolder: this.saveFolder, list}).then(res => {
        this.$Message.success('保存成功！')
      }
      )
    },
    mergeAll () {
      let files = []
      this.content.forEach(item => {
        files.push(item.filePath)
      })
      this.$store.dispatch('voice/mergeAllAudio', {saveFolder: this.saveFolder, files}).then(res => {
        this.$Message.success('生成成功！')
      }
      )
    }
  }
}
</script>
<style lang="less">
.left {
  border-right-style: solid;
  border-right-color: red;
  height: 100%;;
}
.ivu-card-body {
  height: calc(100% - 55px)
}</style>