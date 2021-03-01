<template>
  <Card>
    <p slot="title">{{ cmd.name }}-参数编辑</p>
    <Row>
      <i-col span="8">
        <v-form ref="form" v-model="content" :options="options">
          <FormItem>
            <Button v-show="editIndex === undefined" type="primary" @click="addParam">添加</Button>
            <Button v-show="editIndex >= 0" @click="cancelUpdate">取消</Button>
            <Button v-show="editIndex >= 0" type="success" @click="updateParam">保存</Button>
            <Button  @click="$router.back()">返回</Button>
          </FormItem>
        </v-form>
      </i-col>
      <i-col span="16" style="padding: 1rem;" class="param-table">
        <Table :columns="columns" :data="data">
          <template slot-scope="{ row }" slot="required">
            {{ row.required ? '是' : '否' }}
          </template>
          <template slot-scope="{ row }" slot="isStore">
            {{ row.isStore ? '是' : '否' }}
          </template>
          <template slot-scope="{ row }" slot="valueType">
            <label-select :value="row.valueType" :options="valueTypes"/>
          </template>
          <template slot-scope="res" slot="action">
            <Button size="small" type="primary" @click.stop="onRowSelect(res)" icon="ios-create"></Button>
            <Button size="small" type="error" @click.stop="deleteRow(index)" icon="ios-remove-circle"></Button>
          </template>
        </Table>
      </i-col>
    </Row>
  </Card>

</template>

<script>
import {find, update} from '@/api/cmd';

/**
 * 配置参数
 * @作者：陈明明
 * @创建日期 ： 2021/1/15 16:02
 */
const valueTypes = [
  {key: 'string', label: '字符串'},
  {key: 'folder', label: '文件夹'},
  {key: 'file', label: '文件'},
  {key: 'url', label: '网址'},
  {key: 'null', label: '无'}
]
export default {
  name: 'editParam',
  computed: {
    valueTypes() {
      return valueTypes
    },
    id() {
      return this.$route.query.id
    }
  },
  data() {
    return {
      cmd: {},
      columns: [
        {
          key: 'name',
          title: '名称',
          align: 'center'
        },
        {
          key: 'key',
          title: '标识'
        },
        {
          key: 'cmdKey',
          title: '参数'
        },
        {
          key: 'required',
          title: '必填',
          slot: 'required'
        },
        {
          key: 'isStore',
          title: '存储',
          slot: 'isStore'
        },
        {
          key: 'valueType',
          title: '类型',
          slot: 'valueType'
        },
        {
          title: '操作',
          slot: 'action'
        }
      ],
      content: {
        name: '',
        key: '',
        cmdKey: '',
        required: true,
        isStore: false,
        valueType: 'string'
      },
      options: [
        {
          key: 'name',
          type: 'string',
          label: '名称',
          rules: [
            {required: true, message: `名称不能为空`, trigger: 'blur'}
          ]
        },
        {
          key: 'key',
          label: '标识',
          type: 'string',
          rules: [
            {required: true, message: `标识不能为空`, trigger: 'blur'}
          ]
        },
        {
          key: 'cmdKey',
          label: '参数',
          type: 'string',
          rules: [
            {required: false}
          ]
        },
        {
          key: 'required',
          label: '必填',
          type: 'switch',
        },
        {
          key: 'isStore',
          label: '存储',
          type: 'switch',
        },
        {
          key: 'valueType',
          label: '值类型',
          type: 'select',
          options: valueTypes,
          rules: [
            {required: true, message: `值类型不能为空`, trigger: 'blur'}
          ]
        },

      ],
      data: [],
      editIndex: undefined
    }
  },
  created() {
    this.initData()
  },
  methods: {
    initData() {
      find({_id: this.id})
          .then(data => {
            this.cmd = data[0]
            this.data = this.cmd.options || []
            this.resetContent()
          })
    },
    cancelUpdate() {
      this.editIndex = undefined
      this.resetContent()
    },
    updateParam() {
      this.$refs.form.validate()
          .then(() => {
            this.$set(this.data, this.editIndex, this.content)
            this.editIndex = undefined
            this.confirm()
            this.resetContent()
          })
    },
    resetContent() {
      this.content = {
        name: '',
        key: '',
        cmdKey: '',
        required: true,
        isStore: false,
        valueType: 'string'
      }
    },
    addParam() {
      this.$refs.form.validate()
          .then(() => {
            this.data.push(this.content)
            this.resetContent()
            this.confirm()
          })
    },
    onRowSelect({row, index}) {
      this.content = {...row}
      this.editIndex = index
    },
    confirm() {
      update(this.cmd._id, {options: this.data})
          .then(res => {
            this.cmd.options = this.data
          })
    },
    deleteRow(i) {
      this.data.splice(i, 1)
      this.confirm()
    }
  }
}
</script>

<style scoped>

</style>