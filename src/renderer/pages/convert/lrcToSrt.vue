<template>
<Card>
  <Form :model="form" ref="form" :label-width="80" :rules="rules">
    <FormItem label="编码">
      <Select v-model="form.encoding">
          <Option value="gb2312">gb2312(QQ音乐)</Option>
          <Option value="utf-8">utf-8</Option>
      </Select>
    </FormItem>
    <FormItem label="选择文件" prop="originFilePath">
      <Input v-model="form.originFilePath"></Input>
        <Upload
         :before-upload="handleFile"
        type="drag"
        action="//jsonplaceholder.typicode.com/posts/"
        accept=".lrc">
        <div style="padding: 20px 0">
           <Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
            <p>点击或拖拽选择文件</p>
        </div>
    </Upload>
    </FormItem>
    <FormItem>
        <Button type="primary" @click="start">开始</Button>
        <Button  @click="openFolder"><Icon type="ios-folder"></Icon></Button>
    </FormItem>
  </Form>
</Card>
</template>

<script>
import {shell, ipcRenderer} from 'electron'
import {CONVERT_LRC_TO_SRT, CONVERT_LRC_TO_SRT_RES} from '../../../main/event/convert/flag'
export default {
  data () {
    return {
      converts: [
        {label: 'QQ歌词转Srt', key: 'qqLrcToSrt'}
      ],
      form: {
        encoding: 'gb2312',
        originFilePath: ''
      },
      rules: {
        originFilePath: [{required: true, message: '路径不能为空', trigger: 'blur'}]
      },
      newPath: ''
    }
  },
  created () {
  },
  methods: {
    save () {
    },
    openFolder () {
      if (this.newPath) {
        shell.showItemInFolder(this.newPath)
      }
    },
    handleFile (file) {
      this.form.originFilePath = file.path
      return false
    },
    start () {
      this.$refs.form.validate(res => {
        if (!res) {
          this.$Message.success('请检查输入')
          return
        }
        ipcRenderer.send(CONVERT_LRC_TO_SRT, this.form)
        ipcRenderer.on(CONVERT_LRC_TO_SRT_RES, (event, res) => {
          if (res.code === 200) {
            this.newPath = res.data.path
            this.form.originFilePath = ''
          }
          this.$Message.success({content: res.msg})
          ipcRenderer.removeAllListeners(CONVERT_LRC_TO_SRT_RES)
        })
      })
    }
  }
}
</script>

<style>

</style>