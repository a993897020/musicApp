<template>
  <div class="phoneLogin">
      <div class="header-wrapper">
          <div class="back-icon">
              <mu-icon @click="comeBack" value="arrow_back" left></mu-icon>
          </div>
          <div class="header-title">手机号登陆</div>
      </div>
      <div class="content-wrapper">
          <mu-form ref="loginForm" :model="loginInfo">
              <mu-form-item label="手机号" prop="phone" :rules="phoneRules">
                  <mu-text-field v-model="loginInfo.phone" prop="phone" placeholder="请输入手机号"></mu-text-field>
              </mu-form-item>
               <mu-form-item label="密码" prop="password" :rules="passwordRules">
                  <mu-text-field type="password" v-model="loginInfo.password" prop="password" placeholder="请输入密码"></mu-text-field>
              </mu-form-item>
              <mu-form-item>
                  <mu-button full-width color="red" @click="submit"> 登陆</mu-button>
              </mu-form-item>
          </mu-form>
      </div>
  </div>
</template>

<script>
export default {
  name: 'phoneLogin',
  data () {
    return {
        loginInfo:{
            phone:'',
            password:''
        },
        phoneRules:[
            {validate:(val)=>!!val,message:'必须填写手机号'},
            {validate:(val)=>val.length>=11,message:'请输入正确的手机号'}
        ],
        passwordRules:[
            {validate:(val)=>!!val,message:'必须填写密码'},
            {validate:(val)=>val.length>=6,message:'密码不少于6位'}
        ]
    }
  },
  methods:{
      submit(){
          this.$refs.loginForm.validate()
            .then(result=>{
                if(result){
                    this.http.get('/login/cellphone?phone='+ this.loginInfo.phone +'&password='+ this.loginInfo.password +''
                        )
                        .then(res=>{
                            if(res.data.code===200){
                                this.$router.push('/mine')
                                console.log(res)
                            }
                        })
                        .catch(err=>{
                            console.log(err)
                                this.$toast.error('您的输入有误，请重新输入')

                        })
                }
            })
      },
      comeBack(){
          this.$router.push('/login')
      }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang='scss'>
    .phoneLogin{
        width:100%;
        height:100%;
        background-color: #fff;
        position:fixed;
        left: 0;
        top: 0;
        padding: 20px;
        box-sizing: border-box;
        .header-wrapper{
            display:flex;
            .back-icon{
                margin-right: 20px;
            }
            .header-title{
                font-size: 16px;
                font-weight: bold;
            }
        }
        .content-wrapper{
            margin-top: 20px;
            .hint{
                color: #999;
                font-size: 12px;
                margin-bottom: 20px;
            }
            .input-phone{
                font-size: 14px;
            }
            .mu-button{
                border-radius: 20px;
            }
        }
    }
</style>
