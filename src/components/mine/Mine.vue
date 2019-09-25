<template>
  <div class="mine">
    <div class="mineSong-wrapper">
        <div class="mineSong-list">
          <div class="line-top"></div>
          <div class="mineSong-item">
            <img class="item-icon" src="./image/music.png" alt="">
            <div class="item-name">本地音乐</div>
          </div>
           <div class="mineSong-item">
            <img class="item-icon" src="./image/lately.png" alt="">
            <div class="item-name">最近播放</div>
          </div>
           <div class="mineSong-item">
            <img class="item-icon" src="./image/download.png" alt="">
            <div class="item-name">下载管理</div>
          </div>
           <div class="mineSong-item">
            <img class="item-icon" src="./image/radio.png" alt="">
            <div class="item-name">我的电台</div>
          </div>
           <div class="mineSong-item">
            <img class="item-icon" src="./image/collection.png" alt="">
            <div class="item-name">我的收藏</div>
          </div>
          <div class="line"/>
        </div>
        <div class="createSong-wrapper">
          <div class="createSong-header">
            <div class="header-left">
              <mu-icon value="expand_more" v-if="this.isCreateSong" size="28"></mu-icon>
              <mu-icon value="chevron_right" v-if="!this.isCreateSong" size="28"></mu-icon>
              <div class="left-title">创建的歌单</div>
            </div>
            <div class="header-right">
              <mu-icon value="add" size="28"></mu-icon>
              <mu-icon value="more_vert" size="28"></mu-icon>
            </div>
          </div>
        </div>
         <div class="collectionSong-wrapper">
          <div class="collectionSong-header">
            <div class="header-left">
              <mu-icon value="expand_more" v-if="this.iscollectionSong" size="28"></mu-icon>
              <mu-icon value="chevron_right" v-if="!this.iscollectionSong" size="28"></mu-icon>
              <div class="left-title">收藏歌单</div>
            </div>
            <div class="header-right">
              <mu-icon value="more_vert" size="28"></mu-icon>
            </div>
          </div>
        </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'mine',
  data () {
    return {
      userName:[],
      isCreateSong:false,
      iscollectionSong:false
    }
  },
  created(){
          this.userAPI('/login/status')
            .then(res=>{
              console.log('登陆成功')
              console.log(res)
              if(res.data.code===200){
                this.userName=res.data.profile
                return this.userAPI('/user/detail?uid='+ res.data.profile.userId +'')
              }
            })
            .then(res=>{
              console.log('用户信息')
              if(res.data.code===200){
                console.log(res)
              }
            })
  },
  methods:{
    userAPI(url){
      return new Promise((resolve,reject)=>{
        this.http.get(url,{withCredentials : true})
          .then(res=>{
            resolve(res)
          })
          .catch(err=>{
            reject(err)
          })
      })
    }      
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang='scss'>
  .mine{
    margin: 20px;
    box-sizing: border-box;
    .mineSong-wrapper{
   
      .mineSong-list{
        .line-top{
             border-top: 1px solid rgba($color: #000, $alpha: .1);
             margin-left: -20px;
             position: relative;
        }
        .line-top:before{
          position:absolute;
          right: -20px;
          top: 0;
          width: 20px;
          height: 1px;
          background-color: rgba($color: #000, $alpha: .1);
          content:'';
        }
        .mineSong-item{
          display:flex;
          margin-bottom: 10px;
          .item-icon{
            width: 25px;
            height: 25px;
            margin: 10px 0;
          }
          .item-name{
            font-size: 16px;
            margin-left: 30px;
            width: 100%;
            padding: 10px 0;
            border-bottom:1px solid rgba($color: #000, $alpha: .1);
            }
        }
        .line{
            color: #000;
            height: 10px;
            background-color: rgba($color: #000000, $alpha: 0.1);
            margin-left: -20px;
            margin-top: -10px;
            margin-bottom:20px;
            position: relative;
            z-index: -1;
          }
          .line:before{
            position:absolute;
            right: -20px;
            top: 0;
            width: 20px;
            content:"";
            height: 10px;
            background-color: rgba($color: #000000, $alpha: 0.1);
          }
      }
      .createSong-wrapper{
        .createSong-header{
          margin-bottom: 20px;
          display:flex;
          justify-content:space-between;
          .header-left{
            display: flex;
            justify-content:flex-start;
            .mu-icon{
              margin-right: 10px;
            }
            .left-title{
              font-weight: bold;
              font-size: 18px;
            }
          }
          .header-right{
            .mu-icon{
              margin-right: 10px;
            }
            .mu-icon:last-child{
              margin: 0;
            }
          }
        }
      }
      .collectionSong-wrapper{
        .collectionSong-header{
          margin-bottom: 20px;
          display:flex;
          justify-content:space-between;
          .header-left{
            display: flex;
            justify-content:flex-start;
            .mu-icon{
              margin-right: 10px;
            }
            .left-title{
              font-weight: bold;
              font-size: 18px;
            }
          }
          .header-right{
            .mu-icon{
              margin-right: 10px;
            }
            .mu-icon:last-child{
              margin: 0;
            }
          }
        }
      }
    }
  }
</style>
