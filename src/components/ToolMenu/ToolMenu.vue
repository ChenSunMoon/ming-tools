<template>
  <el-menu class="tool-menu" :default-active="active" router>
    <template v-for="menu in value">
      <el-menu-item v-if="!menu.children" :key="menu.key" :index="menu.path">
        <template #title>
          <span>{{ menu.name }}</span>
        </template>
      </el-menu-item>
      <el-menu-item-group v-else :key="menu.key" :index="menu.path">
        <template #title>
          <span>{{ menu.name }}</span>
        </template>
        <el-menu-item v-for="childMenu in menu.children" :key="childMenu.key" :index="childMenu.path">
          <template #title>
            <span>{{ childMenu.name }}</span>
          </template>
        </el-menu-item>
      </el-menu-item-group>
    </template>
  </el-menu>
</template>

<script lang="ts">
/**
 * @作者：陈明明
 * @创建日期 ： 2021/10/23 16:01
 */
import {defineComponent, PropType} from 'vue'
import {Menu} from './Menu'

export default defineComponent({
  name: 'tool-menu',
  props: {
    value: Array as PropType<Menu[]>
  },
  data  () {
    return {
      active: '/'
    }
  },
  watch: {
    '$route.path' (val) {
      this.active = val
    }
  }
})
</script>

<style scoped lang="scss">
.tool-menu {
  height: 100%;
}
</style>
