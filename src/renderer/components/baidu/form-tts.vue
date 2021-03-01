<template>
    <Form :model="form" :ref="id" :rules="rules">
      <FormItem label="音库">
        <Select v-model="form.per" style="width:200px;">
          <Option v-for="per in pers" :value="per.value" :key="per.value" >{{per.label}}</Option>
        </Select>
      </FormItem>
      <FormItem label="语速">
        <InputNumber v-model="form.spd" :max="15" :min="0" ></InputNumber>
      </FormItem>
      <FormItem label="语调">
        <InputNumber v-model="form.pit" :max="15" :min="0" ></InputNumber>
      </FormItem>
      <FormItem label="音量">
        <InputNumber v-model="form.vol" :max="15" :min="0" ></InputNumber>
      </FormItem>
      <FormItem label="合成文字" prop="tex">
        <Input v-model="form.tex" type="textarea" :rows="4" style="width:95%;"></Input>
      </FormItem>
    </Form>
</template>
<script>
export default {
  props: ['id'],
  data () {
    return {
      form: {
        tex: '',
        per: 1,
        spd: 5,
        pit: 5,
        vol: 5,
        ctp: 1,
        lan: 'zh',
        cuid: 'randianxia',
        aue: 3
      },
      pers: [{value: 1, label: '度小宇'},
        {value: 0, label: '度小美'},
        {value: 3, label: '度逍遥'},
        {value: 4, label: '度丫丫'},
        {value: 106, label: '度博文（精品音库）'},
        {value: 110, label: '度小童（精品音库）'},
        {value: 111, label: '度小萌（精品音库）'},
        {value: 103, label: '度米朵（精品音库）'},
        {value: 5, label: '度小娇（精品音库）'}],
      rules: {
        tex: [{required: true, message: '要合成的文字不能为空', trigger: 'blur'}]
      }
    }
  },
  created () {
    let data = JSON.parse(localStorage.getItem('baidu.tts.form_' + this.id))
    if (data) {
      this.form = data
    }
  },
  methods: {
    getFormRef () {
      localStorage.setItem('baidu.tts.form_' + this.id, JSON.stringify(this.form))
      return this.$refs[this.id]
    },
    clearTex () {
      this.form.tex = ''
    }
  }
}
</script>
<style >

</style>