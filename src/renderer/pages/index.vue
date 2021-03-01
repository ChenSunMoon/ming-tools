<style scoped>
</style>
<template>
  <Layout style="height:100vh">
    <Sider hide-trigger>
      <Menu theme="dark" width="auto" :open-names="['1']" :active-name="$route.path" >
        <MenuItem name="/home" to="/home">首页</MenuItem>
        <MenuItem name="/cmd" to="/cmd">命令助手</MenuItem>
        <MenuItem name="/bilibili/prize" to="/bilibili/prize">B站抽奖</MenuItem>
        <Submenu name="convert">
          <template slot="title">
            <Icon type="md-basket" />
            转换相关
          </template>
          <MenuItem name="/file/lrcToSrt" to="/file/lrcToSrt">lrc转srt</MenuItem>
        </Submenu>
        <Submenu name=voice>
          <template slot="title">
            <Icon type="md-appstore" />
              声音相关
          </template>
          <MenuItem name="/voice/tts" to="/voice/tts">语音合成</MenuItem>
          <MenuItem name="/voice/project" to="/voice/project">语音工程</MenuItem>
        </Submenu>
      </Menu>
    </Sider>
    <Layout :style="{padding: '24px 24px 24px'}">
        <router-view></router-view>
    </Layout>
  </Layout>
</template>
<script>
export default {
  data () {
    return {
      activeName: ''
    }
  },
  methods: {
    openPage () {
    }
  }
}
</script>
