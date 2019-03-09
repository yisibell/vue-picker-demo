<template>
  <div id="app">
    <h-picker :data="list" @change="handleChange">
      <!-- 2.5.x 作用域插槽写法 slot-scope-->
      <!-- <div slot-scope="{ data , index }">{{ '自定义的项' + index}}</div> -->
      <!-- 2.6.x 作用域插槽写法 v-slot-->
      <template v-slot:default="{ data , index }">{{ `自定义的项${index + 1}`}}</template>
    </h-picker>
  </div>
</template>

<script>
import HPicker from '@/HPicker'
export default {
  name: "app",
  components: {
    HPicker
  },
  data(){
    return {
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
    handleChange( data , index){
      console.log( data , index);
    }
  }
};
</script>

