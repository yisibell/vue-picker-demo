<template>
    <div class="h-dialog" v-show="visible">
      <div class="h-dialog-mask" @click="handleMask"></div>

      <transition name="slide-fade">
        <div class="h-dialog-wrap" v-if="visible">
          <div class="h-dialog-header">
            <button class="btn btn-cancel" @click="handleCancel">取消</button>
            <div class="title">
              <slot name="title">
                <div>{{title}}</div>
              </slot>
            </div>
            <button class="btn btn-confirm" @click="handleConfirm">确定</button>
          </div>
          <div class="h-dialog-content">
            <slot></slot>
          </div>
        </div>
      </transition>

    </div>
</template>

<script>
export default {
  name: 'HDialog',
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: ''
    },
    closeByMask: {
      type: Boolean,
      default: true
    }
  },
  data(){
    return {

    }
  },
  methods: {
    handleMask(){
      this.closeByMask && this.$emit("update:visible" , false)
    },
    handleCancel(){
      this.$emit("cancel")
      this.$emit("update:visible" , false)
    },
    handleConfirm(){
      this.$emit("confirm")
    }
  }
}
</script>

<style lang="scss" scoped>

  html,body{
    margin: 0;
    padding: 0;
  }

  .slide-fade-enter-active {
    transition: all .4s ease;
  }
  
  .slide-fade-leave-active {
    transition: all .8s ease;
  }

  .slide-fade-enter {
    transform: translateY(300px);
  }

  .h-dialog {
    width: 100vw;
    height: 100vh;
    position: fixed;
    left: 0;
    top: 0;
   
    .h-dialog-mask{
      width: 100%;
      height: 100%;
      background-color: rgba(0,0,0,.4);
    }

    .h-dialog-wrap{
      width: 100%;
      height: 45%;
      position: absolute;
      left : 0;
      bottom: 0;
      background-color: #fff;

      .h-dialog-header{
        height: 35px;
        display: -webkit-flex;
        display: flex;
        justify-content: space-between;

        .btn{
          width: 50px;
          border: 0;
        }

        .title{
          flex: 1;
          text-align: center;
          line-height: 35px;
        }

       
      }

      .h-dialog-content{
        width: 100%;
        height: 100%;
      }
    }
  }

</style>


