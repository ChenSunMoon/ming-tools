<template>
<Form ref="form" :model="value"  label-position="right" :label-width="80" :inline="inline">
  <FormItem v-for="option in options" :label="option.label" :prop="option.key" :key="option.key"  :rules="option.rules">
    <template v-if="option.type === 'string' || !option.type">
      <Input v-model="value[option.key]" :placeholder="`请输入${option.label}`" clearable></Input>
    </template>
    <template v-else-if="option.type === 'url'">
      <Input type="url" v-model="value[option.key]" :placeholder="`请输入${option.label}`"></Input>
    </template>
    <template v-else-if="option.type === 'folder'">
      <v-folder v-model="value[option.key]" :placeholder="`请输入${option.label}`"></v-folder>
    </template>
    <template v-else-if="option.type === 'file'">
      <v-file v-model="value[option.key]" :placeholder="`请先择${option.label}`"></v-file>
    </template>
    <template v-else-if="option.type === 'select'">
      <Select v-model="value[option.key]">
        <Option v-for="item in option.options" :value="item.key" >{{item.label}}</Option>
      </Select>
    </template>
    <template v-else-if="option.type === 'switch'">
      <i-switch v-model="value[option.key]" />
    </template>
    <template v-else-if="option.type === 'null'">
     {{option.key}}
    </template>
    <template v-else>
     尚未支持{{ option.type }}类型值输入
    </template>
  </FormItem>
  <slot></slot>
</Form>
</template>

<script>
import VFolder from '@/components/widget/input/folder'
import VFile from '@/components/widget/input/file'
export default {
  name: 'v-form',
  components: {VFile, VFolder},
  props: {
    value: Object,
    rules: [Array,Object],
    options: Array,
    inline:{
      type:Boolean,
      default:false
    }
  },
  methods: {
    validate() {
      return new Promise((resolve, reject) => {
        this.$refs.form.validate((valid) => {
          if (valid) {
            resolve(valid)
          } else {
            reject(valid)
          }
        })
      })
    }
  }
}
</script>
<style scoped>

</style>