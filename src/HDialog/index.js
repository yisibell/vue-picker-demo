import HDialog from './HDialog.vue'

HDialog.install = function (Vue){
  Vue.component( HDialog.name , HDialog )
}

export default HDialog;