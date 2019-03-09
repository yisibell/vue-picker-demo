<template>
  <div class="h-picker">
    <div class="h-picker-container" :style="containerStyle">
      <div ref="moveItemsMask" class="h-picker-mask" :style="pickerMaskStyle"
      @touchstart="handleStart" @touchmove="handleMove" @touchend="handleEnd"></div>
      <ul ref="moveItemsEl" class="h-picker-move-items" :style="moveItemsStyle">
        <li :style="itemStyle" v-for="(item,index) in data" :key="index">
          <slot :data="item" :index="index">{{item.label}}</slot>
        </li>
      </ul>
      <div :style="itemBoxStyle" class="selected-item-box"></div>
    </div>
  </div>  
</template>

<script>
export default {
  name: 'HPicker',
  props: {
    data: {  // 列表数据
      type: Array,
      default(){ return [] }
    },
    itemHeight: { // 每个选择项的高度
      type: Number,
      default: 37
    },
    count: { // 选择项的可见个数
      type: Number,
      default: 5
    }
  },
  data(){
    return {
      start_pos_y : 0,     //触摸起始点纵坐标
      end_pos_y : 0,       //触摸结束点纵坐标
      curr_dis : 0,        //当前移动元素 translate 纵坐标 偏移值
      curr_dis_end : 0,    //移动结束后的 translate 纵向偏移值
      ismoving : false,    // 是否正在移动选项列表，解决滑动卡顿
      selected_index : 0,  //当前选中项索引
  
    }
  },
  computed: {
    // 选择项样式
    itemStyle(){
      return {
        height: this.itemHeight + 'px',
        lineHeight: this.itemHeight + 'px',
      }
    },
    // 选择框样式
    itemBoxStyle(){
      return {
        height: this.itemHeight + 'px',
        top: this.padding + 'px',
      }
    },
    containerStyle(){
      return {
        height: this.height + 'px',
      }
    },
    moveItemsStyle(){
      return {
        transform: 'translate3d(0,0,0)',
        paddingTop: this.padding + 'px',
        fontSize: '1em',
      }
    },
    pickerMaskStyle(){
      const h = this.padding - this.itemHeight / 2
      return {
        backgroundSize: `100% ${h}px,100% ${h}px`,
      }
    },
    padding(){
      return (Math.ceil( this.count / 2 ) - 1) * this.itemHeight
    },
    height(){
      return this.itemHeight * this.count
    }
  },
  methods: {
    handleStart(e){
      this.ismoving = false;
      this.start_pos_y = e.touches[0].pageY;
      this.curr_dis = Number.parseInt( this.$refs.moveItemsEl.style.transform.split(",")[1] );
    },
    handleMove(e){

      this.ismoving = true;
    
      this.end_pos_y = e.touches[0].pageY;

      let len = Number.parseFloat(this.end_pos_y) - Number.parseFloat(this.start_pos_y) + Number.parseFloat(this.curr_dis);

      this.$refs.moveItemsEl.style.transform = "translate3d(0, "+ len +"px , 0)";

      this.curr_dis_end = len;  //最终根据此值去调整某项在选中框的位置

      e.stopPropagation()
      e.preventDefault()

    },
    handleEnd(e){

      if ( !this.ismoving ) return

      this.ismoving = false;
      
      let sign = this.curr_dis_end >=0 ? 1 : -1;  // 确定符号
      let all_items_len = -(this.$refs.moveItemsEl.children.length -1) * this.itemHeight;  // 全部待选项的长度
      let items = Math.round( Math.abs(this.curr_dis_end) / this.itemHeight );  // 计算偏移倍数

      this.curr_dis_end = sign * items * this.itemHeight;  // 正确偏移量

      this.selected_index = items;

      if ( this.curr_dis_end > 0){
        this.curr_dis_end = 0;
        this.selected_index = 0;
      }else if ( this.curr_dis_end <  all_items_len ){
        this.curr_dis_end = all_items_len;
        this.selected_index = this.$refs.moveItemsEl.children.length -1;
      }

      //响应已选变化
      this.$emit("change" , this.data[this.selected_index] , this.selected_index )

      this.$refs.moveItemsEl.style.transform = "translate3d(0,"+ this.curr_dis_end +"px,0)"
      this.$refs.moveItemsEl.style.transition = "transform .6s cubic-bezier(0.68, -0.55, 0.27, 1.55)"

      this.$refs.moveItemsEl.addEventListener("transitionend" , this.TransitionEndListener )
      this.$refs.moveItemsEl.addEventListener("webkitTransitionEnd" , this.TransitionEndListener )

      e.preventDefault()
      e.stopPropagation()
    },
    TransitionEndListener(e){
      e.target.style.transition = "";
    }
  }
}
</script>

<style lang="css" scoped>

html {
  touch-action: manipulation;
}
body{
  margin: 0;
  padding: 0;
}
ul,li{
  margin: 0;
  padding: 0;
  list-style: none;
}

.h-picker{
  background-color: #fff;
}

.h-picker-container {
  width: 95%;
  /* height: 400px; */
  position: relative;
  overflow: hidden;
  margin: 0 auto;
}

.h-picker-container > ul.h-picker-move-items{
  /* padding: 160px 0; */
  width: 100%;
}

.h-picker-container > ul.h-picker-move-items li {
  width: 100%;
  /* height: 40px; */
  text-align: center;
  /* line-height: 40px; */
}


.h-picker-container > .selected-item-box {
  width: 100%;
  /* height: 40px; */
  position: absolute;
  /* top: 160px; */
  left: 0;
  z-index: 2;
  border-top: 1px solid #bbb;
  border-bottom: 1px solid #bbb;
}

.h-picker-container > .h-picker-mask{
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 3;
  background-image: linear-gradient( rgba(255,255,255,.95) , rgba(255,255,255,.4) ),
                    linear-gradient( 0deg, rgba(255,255,255,.95) , rgba(255,255,255,.4));  
  background-position: top, bottom;
  /* background-size: 100% 140px , 100% 180px; */
  background-repeat: no-repeat;
}


</style>


