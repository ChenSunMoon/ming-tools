<template>
  <el-container id="app">
    <el-aside>
      <ToolMenu :value="menus"/>
    </el-aside>
    <el-container>

      <router-view></router-view>
    </el-container>
  </el-container>
</template>

<script lang="ts">
import ToolMenu from "@/components/ToolMenu/ToolMenu.vue";

export default {
  name: 'App',
  components: {
    ToolMenu,
  },
  setup() {
    return {
      menus: [
        {
          key: 'home',
          name: '首页',
          path: '/'
        },
        {
          key: 'subtitles',
          name: '字幕',
          children: [
            {
              key: 'lrc2srt',
              name: 'lrc转srt',
              path: '/subtitles/lrc2srt'
            }
          ]
        },
        {
          key: 'video',
          name: '视频',
          children: [{
            key: 'mkv2mp4',
            name: 'MKV转码',
            path: '/video/mkv2mp4'
          }]
        },
        {
          key: 'voice',
          name: '声音',
          children: [
            {
              key: 'unlockMusic',
              name: 'VIP音乐破解',
              path: '/voice/unlock-music'
            }
          ]
        },
      ]
    }
  }
}
</script>

<style lang="scss">
html,body{
  height: 100%;
  width: 100%;
  margin: 0;
  overflow: hidden;
}
#app {
  background-color: $bgColor;
  height: 100%;
}
</style>
