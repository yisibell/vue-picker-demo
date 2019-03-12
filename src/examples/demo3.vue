<template>
  <div>
    <button @click="showPicker">click</button>
    <h-slide-picker
      title="单项滑动选择器" 
      :visible.sync="visible" 
      :data-list="list"
      @confirm="handleConfirm" 
      @cancel="handleCancel"></h-slide-picker>
  </div>
</template>

<script>
import HSlidePicker from '@/HSlidePicker'
export default {
  components: {
    HSlidePicker
  },
  data(){
    return {
      visible: false,
      list:  [
        {label: "测试文字项1"},
        {label: "测试文字项2"},
        {label: "测试文字项3"},
        {label: "测试文字项4"},
        {label: "测试文字项5"},
        {label: "测试文字项6"},
        {label: "测试文字项7"},
        {label: "测试文字项8"},
        {label: "测试文字项9"},
        {label: "测试文字项10"},
        {label: "测试文字项11"},
        {label: "测试文字项12"},
        {label: "测试文字项13"},
        {label: "测试文字项14"},
        {label: "测试文字项15"},
        {label: "测试文字项16"},
        {label: "测试文字项17"},
        {label: "测试文字项18"},
        {label: "测试文字项19"},
        {label: "测试文字项20"},
      ] 
    }
  },
  methods: {
    showPicker(){
      this.visible = true
    },
    handleConfirm(data,index){
      console.log( data , index);
    },
    handleCancel(){

    }
  }
}
</script>

<style lang="scss" scoped>

</style>


