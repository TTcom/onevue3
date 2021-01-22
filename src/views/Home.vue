<template>
  <div class="home">


      <div id="demo" style="margin-left:100px;">
        <div @click="toogle">
            <span >Toggle</span>    
        </div>
      </div>
       <HelloWorld :title="title" :ref="halo"></HelloWorld>
  </div>

</template>

<script lang="ts">
import { defineComponent,onMounted,ref,Ref,DefineComponent } from 'vue';
import {useRouter,Router} from 'vue-router'
import HelloWorld from '@/components/HelloWorld.vue'

export default defineComponent({
  name: 'Home',
  components: {
    HelloWorld
  },
  setup(){
    const router: Router = useRouter()
     let show = ref<boolean>(true);
     let title = ref<string>('旺仔牛奶')

     let halo: any = (el:HTMLElement):HTMLElement=>{  //获取dom元素
          return el
     }
     let toogle = function (){
      router.push('/about')
     }
     onMounted(()=>{
        setTimeout(()=>{
             title.value="特仑苏牛奶" 
             console.log(halo)
             halo.getmsg()
        },1000)
     })
     return{
       show,
       toogle,
       title,
       halo
     }

  }
  
});
</script>
<style lang="scss" >
.toggle {
  position: absolute;
  top: 20px;
}
.fadeqa-enter-active,
.fadeqa-leave-active {
  transition: all 0.5s;
}

.fadeqa-enter-from,
.fadeqa-leave-to {
  top: -25px;
}
// .fade-enter-active, .fade-leave-active {
//    transition: all 0.5s;
// }

// .fade-enter-from, .fade-leave-to {
  
//  // margin-left: 110px;
 
//    top: 100px;
//   // opacity: 0;
// }
// .toggle{
//   position: absolute;

//      top: 10px;
// }
</style>