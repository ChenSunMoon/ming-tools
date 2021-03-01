<template>
  <Card>
    <p slot="title">命令列表</p>
    <a slot="extra" @click="isShowAddCmd = true">新建</a>
    <Table :columns="columns" :data="data"></Table>
    <run-cmd v-model="isShowEditContent" :cmd = 'cmd'></run-cmd>
    <add-cmd v-model="isShowAddCmd" @cmd-added="cmdAdded"></add-cmd>
    <edit-cmd v-model="isShowEditCmd" :cmd="cmd"></edit-cmd>
  </Card>
</template>

<script>
import RunCmd from '@/components/cmd/modal/run'
import AddCmd from '@/components/cmd/modal/new'
import EditCmd from '@/components/cmd/modal/edit'
export default {
  name: 'index.vue',
  components: { AddCmd, RunCmd, EditCmd },
  data () {
    return {
      isShowEditContent:false,
      isShowAddCmd:false,
      isShowEditParam: false,
      isShowEditCmd:false,
      cmd: {},
      columns: [
        {
          title: '名称',
          key: 'name'
        },
        {
          title: '执行程序',
          key: 'execPath'
        },
        {
          title: '配置参数',
          render: (h, params) => {
            return h('Button', {
              props: {
                size: 'small'
              },
              on: {
                click: () => {
                  this.editParam(params)
                }
              }
            }, '配置')
          }
        },
        {
          title: '操作',
          render: (h, params) => {
            return h('div', [
              h('Button', {
                props: {
                  size: 'small',
                  icon: 'ios-create'
                },
                style: {
                  marginRight: '5px'
                },
                on: {
                  click: () => {
                    this.isShowEditCmd = true
                    this.cmd = params.row
                  }
                }
              }),
              h('Button', {
                props: {
                  size: 'small',
                  icon: 'md-play'
                },
                style: {
                  marginRight: '5px'
                },
                on: {
                  click: () => {
                    this.opeEditContentDialog(params)
                  }
                }
              }),
              h('Button', {
                props: {
                  size: 'small',
                  icon: 'md-trash'
                },
                on: {
                  click: () => {
                    this.delete(params)
                  }
                }
              }),
            ]);
          }
        }
      ],
      data: [
      ]
    }
  },
  created() {
    this.$api.cmd.getAll()
    .then(res => {
      this.data = res
    })
  },
  methods: {
    opeEditContentDialog (e) {
      if (e.row.options && e.row.options.length > 0) {
        this.cmd = e.row
        this.isShowEditContent = true
      } else {
        this.$Message.error('尚未配置运行参数项')
      }
    },
    cmdAdded (doc) {
      this.data.unshift(doc)
      // this.data.push(doc)
    },
    delete (e) {
      this.$Modal.confirm({
        title: '删除',
        content: '确定要删除这条命令吗？',
        onOk: () => {
          this.$api.cmd.remove(e.row._id)
              .then(() => {
                this.data.splice(e.index, 1)
              })
        }
      })
    },
    editParam (e) {
      this.$router.push({name: 'editParam', query:{id: e.row._id}})
    }
  }
}
</script>

<style scoped>

</style>