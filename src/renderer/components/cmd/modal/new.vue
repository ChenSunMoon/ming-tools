<template>
  <Modal
      :value="value"
      title="增加命令"
      @on-ok="submit"
      @on-visible-change="onModalChange">
    <v-form ref="form" v-model="content" :options="options"></v-form>
  </Modal>
</template>

<script>
import base from '@/components/cmd/modal/base'
export default {
  name: 'add-cmd',
  mixins:[base],
  props: {
    value: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      content: {
        name: '',
        execPath: ''
      },
      options: [
        {
          key: 'name',
          type: 'string',
          label: '名称',
          rules: [
            { required: true, message: `名称不能为空`, trigger: 'blur' }
          ]
        },
        {
          key: 'execPath',
          label: '执行程序',
          type: 'string',
          rules: [
            { required: true, message: `名称不能为空`, trigger: 'blur' }
          ]
        }
      ]
    }
  },
  methods: {
    onOpened() {
      this.content.name = ''
      this.content.execPath = ''
    },
    submit () {
      this.$refs.form.validate()
      .then(() => {
        return this.$api.cmd.insert(this.content)
      }).then(doc => {
        console.log(doc)
        this.$emit('cmd-added', doc)
      })
      .catch((err) => {
        console.log(err)
        this.$Message.error('请检查输入')
      })
    }
  }
}
</script>

<style scoped>

</style>