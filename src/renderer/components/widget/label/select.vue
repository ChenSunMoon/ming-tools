<template>
  <span>{{label}}</span>
</template>

<script>
export default {
  name: 'label-select',
  props: ['value', 'options'],
  computed: {
    label () {
      let one = this.options.find(item => item.key === this.value)
      return one ? one.label : ''
    }
  }
}
</script>

<style scoped>

</style>