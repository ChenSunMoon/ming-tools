<template>
  <Input :value="value" icon="md-document" @on-click="start" @input="change"/>
</template>
<script>
/**
 * 选择文件夹
 */
import {remote, shell} from 'electron'

export default {
  name: 'v-file',
  props: {
    value: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      status: 0
    }
  },
  methods: {
    start() {
      if (this.status === 1) {
        return
      }
      this.status = 1
      remote.dialog.showOpenDialog({
        defaultPath: this.value || '',
        properties: ['promptToCreate'],
        filters: [
          {
            name: 'All',
            extensions: ['*']
          }
        ]
      }, (res) => {
        this.status = 0
        if (res) {
          this.$emit('input', res[0])
        }
      })
    },
    change (e) {
      this.$emit('input', e)
    },
    open() {
      shell.openExternal(this.value)
    }
  }
}
</script>