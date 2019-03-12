<template>
  <div>
    <button @click="visible = true">click</button>
    <h-dialog :visible.sync="visible" title="hello"
    @cancel="cancel" @confirm="confirm">

    </h-dialog>
  </div>
</template>

<script>
import HDialog from '@/HDialog'
export default {
  name: 'Demo2',
  components: {
    HDialog
  },
  data(){
    return {
      visible: false
    }
  },
  methods: {
    cancel(){

    },
    confirm(){
     
    }
  }
}
</script>

<style scoped>

</style>


