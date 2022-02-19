<template>
  <i :class="`iconfont icon-${value}`"></i>
</template>

<script lang="ts">
/**
 * @作者：陈明明
 * @创建日期 ： 2021/10/23 16:53
 */
import {defineComponent} from 'vue'
import './fonts/iconfont.css'
export default defineComponent({
  name: 'm-icon',
  props: {
    value: String,
  },
})
</script>

<style scoped lang="scss">

</style>
