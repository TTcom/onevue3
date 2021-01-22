<template>
  <div class="sign">
    <transition name="fadeqa">
      <div class="container" v-if="isdata" @keyup.enter="login">
        <h2>We Are The Avengers</h2>
        <div class="signinput">
          <input
            type="text"
            placeholder="your name"
            id="username"
            v-model="username"
            @change="inputchange"
          />
        </div>
        <div class="signinput">
          <input
            type="password"
            placeholder="your password"
            v-model="password"
          />
        </div>
        <div class="signinput">
          <el-button
            class="loginbtn"
            type="primary"
            :loading="islogining"
            :disabled="islogining"
            @click="login"
            >{{ islogining ? "logining" : "login" }}</el-button
          >
        </div>
      </div>
    </transition>
  </div>
</template>


<script  lang="ts">
import { reactive, toRefs, onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import {login as Login} from '@/api/login'
import { ElMessage } from 'element-plus'
export default {
  setup() {
    const router = useRouter();
    const data = reactive({
      isdata: false,
      username: "",
      password: "",
      islogining: false,
      color:'red'
    });
    let show = ref(true);
    const methods = {
      inputchange() {
        let user
        if(localStorage.getItem("vsys_user")){
           user = JSON.parse(localStorage.getItem("vsys_user") || '');
        }
        
        if (user && user.account == data.username) {
          data.password = user.password;
        }
      },
      login() {
        data.color = 'blue'
        if (!methods.usertest()) {
          return;
        }

        if (data.islogining) {
          return;
        }
        data.islogining = true;
        // router.push("/home")
        let params = {
           username: '',
           password: '',
        }
        Login(params).then((res:any)=>{
          console.log(res)
          if(res.success){
            router.push("/home")
          }else{
            ElMessage.error({
              showClose: true,
              message: res.message,
              type: "error"
            })
          }
          data.islogining = false;
        })
        // Login(params)
        //   .then(res => {
        //     console.log(res)
        //     if (res.code == 0) {
        //       this.$message({
        //         showClose: true,
        //         message: "登录成功",
        //         type: "success"
        //       })
        //       localStorage.setItem("vsys_user", JSON.stringify(params))
        //       localStorage.setItem("vsys_token", res.data)
        //       this.$router.push("/file")
        //     } else {
        //       this.$errorMessage({
        //         showClose: true,
        //         message: res.msg,
        //         type: "error"
        //       })
        //     }
        //   })
        //   .finally(() => {
        //     console.log("finally")
        //     this.islogining = false
        //   })
      },
      usertest() {
        if (!data.username) {
        //  ElMessage.error('错了哦，这是一条错误消息');
          ElMessage.error({
            showClose: true,
            message: "用户名不可为空",
            type: "error"
          })
          return false;
        }
        if (!data.password) {
          ElMessage({
            showClose: true,
            message: "密码不可为空",
            type: "error"
          })
          return false;
        }

        return true;
      },
    };
    onMounted(() => {
      setTimeout(() => {
        data.isdata = !data.isdata;
      }, 250);
    });
    return {
      ...toRefs(data),
      ...methods,
    };
  },
};
</script>

<style lang="scss">
.loginbtn{
    position: relative;
    &::before,
    &::after {
        content: "";
        position: absolute;
        width: 20px;
        height: 20px;
        transition: .3s ease-in-out;
        
    }
    &::before {
        top: -5px;
        left: -5px;
        border-top: 1px solid #409EFF;
        border-left: 1px solid #409EFF;
        border-radius:4px 0 0 0;
    }
    &::after {
        right: -5px;
        bottom: -5px;
        border-bottom: 1px solid #409EFF;
        border-right: 1px solid #409EFF;
        border-radius:0 0 4px 0;
    }
    &:hover::before,
    &:hover::after {
        width: calc(100% + 9px);
        height: calc(100% + 9px);
        border-radius:4px;
    }
    
}
.sign {
  display: flex;
  width: 100%;
  height: 100%;
  background: #f0f2f5 url(../common/img/img.svg) no-repeat 50%;
  background-size: 100%;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  perspective: 500px;
  color:  v-bind(color);
  .container {
    position: relative;
    padding-bottom: 230px;
    height: 100px;
    transition: all 0.5s;
    top: 0;
    text-align: center;
    width: 360px;
    margin: 0;
    h2 {
      margin-bottom: 30px;
    }
    .signinput {
      input {
        height: 40px;
        background-color: white;
        width: 100%;
        box-sizing: border-box;
        border: 1px solid #d9d9d9;
        border-radius: 4px;
      }
      button {
        margin-top: 15px;
        width: 100%;
      }
      margin-bottom: 15px;
    }
  }
  .fadeqa-enter-from {
    opacity: 0;
    top: -25px;
  }
  .fadeqa-enter-active {
    transition: all 0.5s;
  }
}
</style>
