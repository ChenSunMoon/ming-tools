<template>
  <Card>
    <p slot="title">
      百度应用Token
    </p>
    <a href="https://ai.baidu.com/tech/speech/tts_online" slot="extra" target="_blank">
        <Icon type="ios-loop-strong"></Icon>
        去注册
     </a>
    <Form :model="form" :rules="rules" ref="form">
      <FormItem label="ID" prop="id">
        <Input v-model="form.id" type="text"></Input>
      </FormItem>
      <FormItem label="Key" prop="key">
        <Input v-model="form.key" type="text"></Input>
      </FormItem>
      <FormItem label="SecretKey" prop="secretKey">
        <Input v-model="form.secretKey" type="text"></Input>
      </FormItem>
      <FormItem>
          <Button type="primary" @click="checkAndSubmit">保存</Button>
          <Button @click="$router.go(-1)">返回</Button>
      </FormItem>
    </Form>
  </Card>
</template>
<script>
import {ipcRenderer} from 'electron'
import {INIT_BAIDU_CLIENT, INIT_BAIDU_CLIENT_RES} from '../../../main/event/voice/tag'
export default {
  data () {
    return {
      form: {
        id: '',
        key: '',
        secretKey: ''
      },
      rules: {
        id: [{required: true, message: 'id不能为空', trigger: 'blur'}],
        key: [{required: true, message: 'key不能为空', trigger: 'blur'}],
        secretKey: [{required: true, message: 'secretKey不能为空', trigger: 'blur'}]
      },
      token: {}
    }
  },
  created () {
    this.form = {
      id: localStorage.getItem('baidu.id') || 'client_credentials',
      key: localStorage.getItem('baidu.key') || '',
      secretKey: localStorage.getItem('baidu.secretKey') || ''
    }
  },
  methods: {
    checkAndSubmit () {
      this.$refs.form.validate(res => {
        if (res) {
          this.submit()
        } else {
          this.$Message.error('请检查输入')
        }
      })
    },
    submit () {
      localStorage.setItem('baidu.id', this.form.id)
      localStorage.setItem('baidu.key', this.form.key)
      localStorage.setItem('baidu.secretKey', this.form.secretKey)
      ipcRenderer.send(INIT_BAIDU_CLIENT, this.form)
      ipcRenderer.on(INIT_BAIDU_CLIENT_RES, (event, arg) => {
        ipcRenderer.removeAllListeners(INIT_BAIDU_CLIENT_RES)
        this.$Message.success({content: '保存成功'})
      })
    }
  }
}
</script>
<style>
 
</style>