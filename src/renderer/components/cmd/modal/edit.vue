<template>
  <Modal
      :value="value"
      title="编辑"
      @on-ok="submit"
      @on-visible-change="onModalChange">
      <v-form ref="form" v-model="content" :options="options"></v-form>
  </Modal>
</template>

<script>
import base from '@/components/cmd/modal/base'
export default {
  name: 'edit-cmd',
  mixins: [base],
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
    onOpened () {
      this.content.name = this.cmd.name
      this.content.execPath = this.cmd.execPath
    },
    submit () {
      this.$refs.form.validate()
      .then(() => {
        return this.$api.cmd.update(this.cmd._id, this.content)
      }).then(doc => {
        this.cmd.name = this.content.name
        this.cmd.execPath = this.content.execPath
        this.$emit('cmd-update', doc)
      })
      .catch(() => {
        this.$Message.error('请检查输入')
      })
    }
  }
}
</script>

<style scoped>

</style>