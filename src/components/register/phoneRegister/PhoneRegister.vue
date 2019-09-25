<template>
  <div class="phoneRegister">
       <div class="header-wrapper">
          <div class="back-icon">
              <mu-icon @click="comeBack" value="arrow_back" left></mu-icon>
          </div>
          <div class="header-title">手机号注册</div>
      </div>
      <div class="content-wrapper">
          <mu-form ref="registerForm" :model="registerInfo">
                <mu-form-item label="昵称" prop="nickname" :rules="nicknameRules">
                  <mu-text-field
                    v-model="registerInfo.nickname"
                    prop="nickname"
                    placeholder="请输入昵称"
                    ></mu-text-field>
              </mu-form-item>
              <mu-form-item label="手机号" prop="phone" :rules="phoneRules">
                  <mu-text-field
                    v-model="registerInfo.phone"
                    prop="phone"
                    placeholder="请输入手机号"
                    ></mu-text-field>
              </mu-form-item>
              <mu-form-item label="密码" prop="password" :rules="passwordRules">
                  <mu-text-field type="password"
                   v-model="registerInfo.password"
                    prop="password" 
                    placeholder="请输入密码"></mu-text-field>
              </mu-form-item>
              <mu-form-item label="验证码" prop="verifyCode" >
                  <mu-text-field v-model="registerInfo.verifyCode" 	:action-icon=this.sendVerify :action-click="sendVerifyCode"  prop="verifyCode">
                      <slot append="发送验证码"></slot>
                  </mu-text-field>
              </mu-form-item>
              <mu-form-item>
                  <mu-button color="red" full-width @click="submit">注册</mu-button>
              </mu-form-item>
          </mu-form>
      </div>
  </div>
</template>

<script>
export default {
  name: 'phoneRegister',
  data () {
    return {
        sendVerify:'发送验证码',
        registerInfo:{
            phone:'',
            password:'',
            verifyCode:'',
            nickname:''
        },
        nicknameRules:[
            {validate:(val)=>!!val,message:'必须填写昵称'},
            {validate:(val)=>val.length>=2,message:"用户名不能少于2位"},
        ],
        phoneRules:[
            {validate:(val)=>!!val,message:'必须填写手机号'},
            {validate:(val)=>val.length>=11,message:"请输入11位数手机号"}
        ],
        passwordRules:[
            {validate:(val)=>!!val,message:'必须填写密码'},
            {validate:(val)=>val.length>=6,message:'密码不能小于6位'}
        ],
       
    }
  },
  methods:{
      comeBack(){
          this.$router.push('/login')
      },
      sendVerifyCode(){
          this.http.get('/captcha/sent?phone='+ this.registerInfo.phone +'')
            .then(res=>{
                console.log(res)
              this.sendVerify='已发送';
            })
      },
      submit(){
          this.$refs.registerForm.validate()
            .then((result)=>{
                if(result===true){
                   this.registerAPI('/captcha/verify?phone='+ this.registerInfo.phone +'&captcha=' +this.registerInfo.verifyCode+ '')
                    .then(res=>{
                        console.log('校验验证码',res)
                        if(res.code===200){
                               return this.registerAPI('/cellphone/existence/check?phone='+ this.registerInfo.phone +'')
                        }
                    })
                    .then(res=>{
                        console.log('手机是否已经注册',res)
                        if(res.code===200){
                                return this.registerAPI('/activate/init/profile?nickname='+ this.registerInfo.nickName +'')
                        }
                    })
                    .then(res=>{
                        console.log('初始化昵称',res)
                        if(res.code===301){
                            return this.registerAPI('/register/cellphone?phone='+
                             this.registerInfo.phone +'&password='+ 
                             this.registerInfo.password +'&captcha='+
                             this.registerInfo.verifyCode+ '&nickname='+
                                this.registerInfo.nickname +'')
                        }
                    })
                    .then(res=>{
                        console.log('注册成功')
                        console.log(res)
                        if(res.code===200){
                            this.$router.push('/mine')
                        }
                    })
                    .catch(err=>{
                        console.log(err)
                        this.$toast.error('最大可能性：____________昵称已被占用________第二大可能性：_______手机号已经注册_________最小可能性:_______________验证码错误__________温馨提示：_____验证码有10分钟，慢慢利用_____')
                    })
                }
            })
      },
      registerAPI(url){
          return new Promise((resolve,reject)=>{
              this.http.get(url)
                .then(res=>{
                    resolve(res.data)
                })
                .catch(err=>{
                    reject(err)
                })
          })
      },
  
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang='scss'>
    .phoneRegister{
        width: 100%;
        height: 100%;
        position:fixed;
        left: 0;
        top:0;
        background-color: #fff;
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
            .mu-form{
                        font-size: 12px;

                .mu-form-item{
                        font-size: 12px;

                    i{
                        font-size: 12px;
                    }
                }
            }
        }
    }
</style>
