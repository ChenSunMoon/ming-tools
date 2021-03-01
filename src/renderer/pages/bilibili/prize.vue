<template>
    <Card>
       <Form :model="form" :rules="rules">
           <FormItem label="BV号" prop="BV">
               <Input v-model="form.BV"></Input>
           </FormItem>
           <FormItem label="前多少页">
               <InputNumber v-model="form.pageTotal" :min="1" :max="100"></InputNumber>
           </FormItem>
           <FormItem>
             <Button @click="start" v-show="comments.length <= 0">获取评论数据</Button>
             <Button @click="restart" v-show="comments.length > 0">重新开始</Button>
             <Button @click="txzr" type="success" v-show="comments.length > 0">天选之人</Button>
             <Button @click="open" type="primary" v-show="user.mid !== 454323668">打开主页</Button>
           </FormItem>
           <FormItem>
             <span>参与抽奖人数：{{comments.length}}</span>
             <div class="user">
                <img :src="user.avatar">
                <div class="right">
                  <span class="name">{{user.name}}</span><br>
                  <span class="content">{{user.content}}</span>
                </div>  
             </div>
           </FormItem>
       </Form>
    </Card>
</template>
<script>
import {ipcRenderer, shell} from 'electron'
export default {
  data () {
    return {
      form: {
        BV: 'BV1SD4y127ti',
        pageTotal: 1
      },
      user: {
        avatar: 'https://i1.hdslb.com/bfs/face/0fd251f7507f736f627c0b725b248ea8cab42016.jpg',
        name: '燃点侠',
        content: '一名特摄区小UP',
        mid: 454323668
      },
      comments: [],
      rules: {
        BV: [{required: true, message: '视频链接不能为空', trigger: 'blur'}]
      }
    }
  },
  methods: {
    restart () {
      this.comments = []
      this.user = {
        avatar: 'https://i1.hdslb.com/bfs/face/0fd251f7507f736f627c0b725b248ea8cab42016.jpg',
        name: '燃点侠',
        content: '一名特摄区小UP',
        mid: 454323668
      }
    },
    start () {
      ipcRenderer.send('BILIBILI_GET_ALL_COMMENTS', this.form)
      ipcRenderer.once('RES_BILIBILI_GET_ALL_COMMENTS', (event, arg) => {
        this.comments = []
        for (let key in arg) {
          this.comments.push(arg[key])
        }
      })
    },
    txzr () {
      if (this.comments.length === 0) return
      let i = Math.floor(Math.random() * (this.comments.length - 1))
      let comment = this.comments[i]
      this.user = {
        avatar: comment.member.avatar,
        name: comment.member.uname,
        content: comment.content.message,
        mid: comment.mid
      }
    },
    open () {
      shell.openExternal(`https://space.bilibili.com/${this.user.mid}`)
    }
  }
}
</script>
<style lang="less" scoped>
.user {
  background: #f3f3f3;
  width: 400px;
  display: flex;
  height: 70px;
  align-items: center;
  padding-right: 12px;
  img {
    margin-left: 12px;
    width: 50px;
    height: 50px;
  }
  .right {
    margin-left: 12px;
    flex: 1;
    height: 70px;
    .name {
      color: #666666;
      font-weight: 600; 
      position: absolute;
    }
    .content {
      text-indent: 12px;
      font-size: 12px;
      margin-top: -6px;
      overflow:hidden;
      text-overflow:ellipsis;
      line-height: 20px;
      display:-webkit-box;
      -webkit-box-orient:vertical;
      -webkit-line-clamp:2;
    }
  }
}
</style>