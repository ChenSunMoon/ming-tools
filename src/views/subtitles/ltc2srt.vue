<template>
  <div>
    <el-card style="margin: 8px;">
      <el-select v-model="fileCode" size="small" >
        <el-option value="gb2312" label="gb2312"></el-option>
        <el-option value="utf8" label="utf8"></el-option>
      </el-select>
      <el-button type="primary" size="small" style="margin-left:8px;" @click="start">选择文件</el-button>
    </el-card>
  </div>

</template>

<script lang="ts">
/**
 * @作者：陈明明
 * @创建日期 ： 2021/11/13 16:09
 */
import {defineComponent} from 'vue'
import {remote} from "electron";
import Lrc2SrtConvert from "@/utils/lrc2srt";
import base from "@/base";
import {ElNotification} from "element-plus";

export default defineComponent({
  name: 'lrc2srt',
  mixins: [base],
  props: {
  },
  data () {
    return {
      fileCode: 'gb2312'
    }
  },
  methods: {
    start () {
      remote.dialog.showOpenDialog({
        filters: [{name: 'All', extensions: ['lrc']}]
      })
      .then(({filePaths}) => {
        if (filePaths.length > 0) {
          const convert = new Lrc2SrtConvert(filePaths[0], this.fileCode)
          convert.start()
          .then((res) => {
            this.tip(res)
          })
        }
      })
    },
    tip(path:string) {
      const el = ElNotification({
        title: '提示',
        message: '转换成功',
        onClick: () => {
          remote.shell.showItemInFolder(path)
          el.close()
        }
      })
    }
  },

})
</script>

<style scoped lang="scss">

</style>
