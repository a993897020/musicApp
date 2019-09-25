<template>
  <div class="login-wrapper">
    <div class="login-bg"></div>
    <div class="login-icon"></div>
    <div class="btn-wrapper">
     <mu-button flat color="red" @click="phoneLogin">手机号登陆</mu-button>
     <mu-button flat color="#fff" @click="fastFn">手机号注册</mu-button>
    </div>
    <div class="agree-wrapper">
      <mu-checkbox color="#000" @change="agreeFn(isAgree)" label="同意《用户协议》和《隐私政策》" v-model="isAgree"></mu-checkbox>
    </div>
    <mu-icon value="home"></mu-icon>
  </div>
</template>

<script>
export default {
  name: 'login',
  data () {
    return {
      isAgree:false
    }
  },
  methods:{
    agreeFn(isAgree){
      console.log(isAgree)
      if(isAgree){
        this.$toast.success('agree')
      }else{
        this.$toast.error('error')
      }
    },
    phoneLogin(){
      if(this.isAgree){
        this.$router.push('/phoneLogin')
      }else{
        this.$toast.message('同意《用户协议》和《隐私政策》')
      }
    },
    fastFn(){
       if(this.isAgree){
        this.$router.push('/phoneRegister')
      }else{
        this.$toast.message('同意《用户协议》和《隐私政策》')
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang='scss'>
.login-wrapper{
   .login-bg{
    background-color:rgb(218, 45, 31);
    width: 100%;
    height: 100%;
    position:fixed;
    top:0;
    left: 0;
   }
    .login-icon{
      background-image: url('./image/icon.png');
      background-repeat: no-repeat;
      background-size: 100% 100%;
      width: 150px;
      height:150px;
      border-radius:50%;
      border: 20px solid rgba($color: red, $alpha: .5);
      position: fixed;
      left: 50%;
      top:20%;
      margin-left: -75px;
    }
    .btn-wrapper{
      position: fixed;
      bottom: 15%;
      left: 50%;
      margin-left: -50px;
        margin-left: -125px;
      .mu-button{
        display:block;
        background-color: #fff;
        margin-bottom: 20px;
        width: 250px;
        padding: 20px 0;
        border-radius: 20px;
        font-size: 15px;
      }
      .mu-button:last-child{
        background-color: rgb(218, 45, 31);
        border: 1px solid rgba($color: #fff, $alpha: 0.5);
      }
    }
    .agree-wrapper{
        position:fixed;
        bottom: 10%;
        left: 50%;
          width: 250px;
          margin-left: -125px;
          text-align: center;
          font-size: 14px;
        .mu-checkbox{
          color: #ccc;
        }
      }
}
</style>
