<template>
  <Modal
      :value="value"
      title="运行命令"
      footer-hide
      @on-visible-change="onModalChange">
    <v-form ref='form' v-model="content" :options="options" :rules="rules">
      <FormItem style="display: flex;flex-direction: row-reverse">
        <Button @click="startWithCmd">CMD执行</Button>
        <Button @click="startWithPowerShell">PowerShell执行</Button>
        <Button type="primary" @click="copy">复制</Button>
      </FormItem>
    </v-form>
  </Modal>
</template>

<script>
import {clipboard} from 'electron'
import childProcess from 'child_process'
import fs from 'fs'
import base from '@/components/cmd/modal/base'

/**
 * 编辑运行参数
 */
export default {
  name: 'run-cmd',
  mixins: [base],
  data() {
    return {
      content: {},
      options: [],
      rules: {}
    }
  },

  methods: {
    onOpened() {
      if (!this.cmd || !this.cmd.options) return []
      this.options = []
      this.cmd.options.forEach(item => {
        let itemRule = []
        if (item.required && item.valueType !== 'null') {
          itemRule.push({required: true, message: `${item.name}不能为空`, trigger: 'blur'})
        }
        switch (item.valueType) {
          case 'url':
            itemRule.push({type: 'url', message: `${item.name}应输入网址`, trigger: 'blur'})
            break
          case 'folder':
            itemRule.push({type: 'string', message: `该目录不存在`, asyncValidator: this.folderValidator})
            break
        }
        this.options.push({
          key: item.key,
          type: item.valueType,
          label: item.name,
          rules: itemRule
        })
        this.$set(this.content, item.key, this.getValue(item))
      })
    },
    copy() {
      this.$refs.form.validate()
          .then(() => {
            clipboard.writeText(this.getCmd())
            this.$Message.success({content: '复制成功'})
          })
          .catch(() => {
            this.$Message.error('验证未通过,请检查输入')
          })
    },
    getCmd() {
      let args = this.getArgs()
      let res = this.cmd.execPath
      for (let arg of args) {
        res += ' ' + arg
      }
      return res
    },
    getArgs() {
      let args = []
      for (let item in this.cmd.options) {
        let option = this.cmd.options[item]
        let value = this.content[option.key]
        if (this.content[option.key]) {
          let key = option['cmdKey']
          if (key) {
            args.push(key)
          }
          args.push(`"${value}"`)
          if (option.isStore) { // 存储值
            localStorage.setItem(`${this.id}.${this.cmd.options[item]['key']}`, value)
          }
        } else if (option.valueType === 'null') {
          args.push(option.cmdKey)
        }
      }
      return args
    },
    startWithPowerShell() {
      this.$refs.form.validate()
          .then(() => {
            let data = this.getCmd()
            childProcess.exec(`start powershell.exe -Command ${data}`)
          })
          .catch(() => {
            this.$Message.error('验证未通过,请检查输入')
          })
    },
    startWithCmd() {
      this.$refs.form.validate()
          .then(() => {
            let data = this.getCmd()
            childProcess.exec(`start cmd.exe /k ${data}`)
          })
          .catch(() => {
            this.$Message.error('验证未通过,请检查输入')
          })
    },
    getValue(option) {
      let value = ''
      if (option.isStore) {
        value = localStorage.getItem(`${this.cmd.key}.${option['key']}`) || ''
      }
      return value
    },
    folderValidator: (rule, value) => {
      return new Promise((resolve, reject) => {
        if (!fs.existsSync(value)) {
          reject(rule.message)
        } else {
          resolve()
        }
      })
    }
  }
}
</script>

<style scoped>

</style>