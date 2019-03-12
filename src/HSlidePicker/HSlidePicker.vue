<template>
  <div class="h-slide-picker">
    
    <h-dialog :visible.sync="isvisible" :title="title" @confirm="handleConfirm" @cancel="handleCancel">
      <slot name="title"><div slot="title">{{title}}</div></slot>
      <h-picker :data="data" :item-height="itemHeight" :count="count" @change="handleChange"></h-picker>
    </h-dialog>

  </div>
</template>

<script>
import HDialog from '@/HDialog'
import HPicker from '@/HPicker'

export default {
  name: 'HSlidePicker',
  components: {
    HDialog,
    HPicker
  },
  props: {
    visible: { //弹出层显示状态
      type: Boolean,
      default: false
    },
    data: {  //待选数据
      type: Array,
      default(){return []}
    },
    title: { //弹出层标题
      type: String,
      default: ""
    },
    itemHeight: {  //每个选择项的高度值
      type: Number,
      default: 37
    },
    count: {   //选择项的可见个数
      type: Number,
      default: 5
    }
  },
  data(){
    return {
      isvisible: this.visible,
      selectedData: null,
      selectedIndex: 0
    }
  },
  watch: {
    visible(val){
      this.isvisible = val
    },
    isvisible(val){
      this.$emit("update:visible" , val)
    }
  },
  methods: {
    handleChange(data , index){
      this.selectedData = data
      this.selectedIndex = index
    },
    handleConfirm(){
      this.$emit("confirm" , this.selectedData , this.selectedIndex)
    },
    handleCancel(){
      this.$emit("cancel")
    }
  }
}
</script>

<style scoped>

</style>


