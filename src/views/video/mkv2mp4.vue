<template>
  <div style="width: 100%;display: flex;flex-direction: column;">
    <el-card style="margin-right: 1rem;" class="margin" >
      <div>
        <el-button size="small" @click="addFiles">添加文件</el-button>
        <el-select v-model="videoCode" size="small" style="margin-left: 1rem;margin-right: 1rem;width: 6rem;" >
          <el-option label="无损" value="copy"></el-option>
          <el-option label="h264" value="h264"></el-option>
        </el-select>
        <el-button type="primary" size="small" @click="start" :disabled="disableStart">开始</el-button>
        <el-button type="danger" size="small" @click="stop" :disabled="disabledStop">停止</el-button>
        <el-button size="small" @click="clear" :disabled="!disabledStop" v-show="list.length > 0">清空</el-button>
      </div>
    </el-card>
    <el-scrollbar style="flex:1;">
      <div class="tasks margin">
        <el-card v-for="task in list" :key="task.id">
          <template #header>
            <div class=" task-header" :title="task.name">
              <div class="text-over" style="flex: 1">
                {{task.name}}
              </div>
              <el-icon :size="24" style="cursor:pointer;" @click="openFile(task)"><folder-opened /></el-icon>
            </div>
          </template>
          <div style="text-align: center;">
            <el-progress
                type="circle"
                :percentage="task.progress"
                :indeterminate="task.status === 'running'"
                :status="['success', 'exception'].includes(task.status) ? task.status : ''">
              <el-popconfirm
                  confirm-button-text="了解"
                  cancel-button-text=" "
                  icon="info-filled"
                  icon-color="red"
                  v-if="task.errorMsg"
                  :title="task.errorMsg"
              >
                <template #reference>
                  <el-icon :size="24" color="#f56c6c" ><circle-close /></el-icon>
                </template>
              </el-popconfirm>
            </el-progress>
          </div>
        </el-card>
      </div>
    </el-scrollbar>

  </div>
</template>

<script lang="ts">
/**
 * @作者：陈明明
 * @创建日期 ： 2021/10/26 22:06
 */

import {defineComponent} from 'vue'
import {remote, shell} from 'electron'
import {Task} from "@/components/Video/Task";
import {getFolder, path2name} from "@/utils/file";
import ffmpeg, {FfmpegCommand} from 'fluent-ffmpeg'
let curTaskCmd:FfmpegCommand

export default defineComponent({
  name: 'mkv-to-mp4',
  props: {
    msg: String,
  },
  data() {
    let list:Array<Task> = []
    return {
      videoCode: 'copy',
      disableStart: true,
      disabledStop: true,
      curTaskCmd: FfmpegCommand,
      list,
    }
  },
  methods: {
    addFiles () {
      remote.dialog.showOpenDialog({
        properties: ['multiSelections'],
        filters: [{name: 'All', extensions: ['mkv']}]
      })
      .then(({filePaths}) => {
        if (filePaths.length > 0) {
          this.disableStart = false
        }
        filePaths.forEach((file, i) => {
          this.list.push({
            id:Date.now() + i,
            name:path2name(file),
            filePath: file,
            folder: getFolder(file),
            status: 'ready',
            progress: 0
          })
        })
      })
    },
    clear () {
      this.list = []
      this.disableStart = true
    },
    start() {
      let next = this.list.find((task):boolean => {
        return task.status === 'ready'
      })
      if (next) {
        this.startTask(next)
        this.disabledStop = false
      } else {
        this.disableStart = true
      }
    },
    startTask (task:Task) {
      task.status = 'running'
      curTaskCmd = ffmpeg(task.filePath)
          .audioBitrate(192)
          .videoCodec(this.videoCode)
          .on('progress', (progress) => {
            if (progress.percent) {
              task.progress = Math.ceil(progress.percent)
            }
          })
          .on('error', (err) => {
            task.status = 'exception'
            task.errorMsg = err.message
            console.error(err)
          })
          .on('end', () => {
            task.progress = 100
            task.status = 'success'
            this.start()
          })
          .save(task.filePath.replace('.mkv', '.mp4'))
    },
    openFile (task:Task) {
      remote.shell.showItemInFolder(task.filePath)
    },
    stop () {
      if (curTaskCmd) {
        curTaskCmd.kill('SIGKILL')
        this.disabledStop = true
      }
    },
  }
})
</script>

<style scoped lang="scss">
.tasks {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-column-gap: 8px;
  grid-row-gap: 8px;
}
.task {
  &-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
}
</style>
