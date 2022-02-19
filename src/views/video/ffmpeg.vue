<template>
<div>
<el-form size="small">
  <el-form-item label="视频编码：">
    <el-select v-model="form.copy" placeholder="请选择视频编码">
      <el-option v-for="code in videoCodes" :key="code" :label="code" :value="code"/>
    </el-select>
  </el-form-item>
  <el-form-item label="音频:">
    <el-select>
      <el-option></el-option>
    </el-select>
  </el-form-item>
</el-form>
</div>
</template>

<script>
/**
 * @作者：陈明明
 * @创建日期 ： 2021/10/31 14:29
 */
export default {
  name: 'mkv2mp4',
  data () {
    return {
      form:{
        videoCode: 'copy'
      },
      videoCodes: [
        'copy',
        'libx264'
      ],
      audioCodes: [

      ]
    }
  }
}
</script>

<style scoped>

</style>