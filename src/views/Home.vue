<template>
  <div class="home">


      <div id="demo" style="margin-left:100px;">
        <div @click="toogle">
            <span >Toggle</span>    
        </div>
      </div>
  <transition name="fadeqa">
    <p v-if="show" class="toggle">hello{{show}}</p>
  </transition>

  </div>
  <!-- <div>
    b:{{b}}
  </div> -->
</template>

<script lang="ts">
import { defineComponent,ref } from 'vue';
import {useRouter} from 'vue-router'
import sign from './sign.vue'; // @ is an alias to /src

export default defineComponent({
  name: 'Home',
  components: {
    sign,
  },
  setup(){
    const router = useRouter()
     let show = ref<boolean>(true);
     let toogle = function (){
      router.push('/about')
     }
     return{
       show,
       toogle
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