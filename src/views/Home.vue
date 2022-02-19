<template>
  <div class="margin">
    <el-button @click="$router.push({name: 'mkv2mp4'})">MKV转码</el-button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'Home',
  components: {
  },
});
</script>
