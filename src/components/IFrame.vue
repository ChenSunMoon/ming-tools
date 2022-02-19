<template>
<iframe  :src="url"></iframe>
</template>

<script>
/**
 * @作者：陈明明
 * @创建日期 ： 2022/2/19 18:22
 */
export default {
  name: 'IFrame',
  props: ['url']
}
</script>

<style scoped>
iframe{
  width: 100%;
  height:100%;
  border-width: 0;
  border-style: inset;
  border-color: initial;
  border-image: initial;
}
</style>