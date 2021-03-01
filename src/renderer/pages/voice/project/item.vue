<template>
    <ListItem :class="{item: true, 'item-selected': value.isSelected} ">
        <ListItemMeta  :title="value.form.tex"/>
            <template slot="action">
            <ButtonGroup >
               <Button icon="ios-create-outline" @click="$emit('modal', value.id)"></Button>
               <Button v-if="value.filePath" icon="ios-play" @click="$emit('play', value.filePath)"></Button>
               <Button icon="ios-trash-outline" @click="$emit('remove', value.id)"></Button>
            </ButtonGroup>
            </template>
    </ListItem>
</template>
<script>
export default {
  props: ['value'],
  methods: {
  }
}
</script>
<style lang="less" scoped>
.item {
    margin-top: 4px;
    padding: 8px;
    margin-left: 12px;
    
}
.item-selected {
  border:2px solid #2d8cf0;
  border-bottom: 2px solid #2d8cf0 !important;
}
</style>