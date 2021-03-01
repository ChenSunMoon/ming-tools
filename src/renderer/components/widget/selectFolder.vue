<template>
<div>
    <Button @click="start"><slot></slot></Button>
    <Button  @click="open"><Icon type="ios-albums-outline"/></Button>
</div>
</template>
<script>
import {remote, shell} from 'electron'
export default {
  props: ['value'],
  methods: {
    start () {
      remote.dialog.showOpenDialog({
        defaultPath: this.value || '../Desktop',
        properties: ['openDirectory'],
        filters: [
          {name: 'All',
            extensions: ['*']
          }
        ]
      }, (res) => {
        if (res) {
          this.$emit('select', res[0])
        }
      })
    },
    open () {
      shell.openExternal(this.value)
    }
  }
}
</script>