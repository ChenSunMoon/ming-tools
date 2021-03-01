<template>
  <Card>
    <Button type="info" @click="$router.push('cmd')">命令助手</Button>
    <Button type="warning" @click="$router.push('file/lrcToSrt')">lrc转srt</Button>
    <Button type="error" @click="$router.push('voice/tts')">语音合成</Button>
    <Button type="primary" @click="$router.push('voice/project')">语音工程</Button>
    <Button type="primary" @click="$router.push('bilibili/prize')">B站抽奖</Button>
    <Button @click="openUnlockMusic">VIP音乐破解</Button>
  </Card>
</template>
<script>
export default {
  data () {
    return {
    }
  },
  methods: {
    openUnlockMusic () {
      let path = process.cwd() + '\\static\\legacy\\index.html'
      this.$electron.shell.openExternal(path)
    }
  }
}
</script>
<style scoped>

</style>