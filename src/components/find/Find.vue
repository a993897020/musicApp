<template>
  <div class="find">
    <mu-carousel hide-indicators	hide-controls class="picture-wrapper">
         <mu-carousel-item class="picture-item" v-for="(item,index) in this.banners" :key="index" > 
           <img :src="item.imageUrl" alt="" >
           <span class="imgTitle">{{item.typeTitle}}</span>
         </mu-carousel-item> 
    </mu-carousel>
    <div class="classify-wrapper">
      <mu-button color="red" to="/everyDaySong">每日推荐</mu-button>
      <mu-button color="success">歌单</mu-button>
      <mu-button color="primary">排行榜</mu-button>
      <mu-button color="Teal">电台</mu-button>
    </div>
    <div class="recommendSong-wrapper">
      <div class="recommendSong-title">
        <div class="recommendSong-leftText">推荐歌单</div>
        <div class="recommendSong-rightMore">歌单广场</div>
      </div>
      <div class="recommendSong-list">
        <div class="recommendSong-item" v-for="(item,index) in this.recommendSong" :key="index">
          <img class="recommendSong-img" :src="item.picUrl" alt="">
          <div class="name">{{item.name}}</div>
        </div>
      </div>
    </div>
    <div class="newDish-wrapper">
      <div class="newDish-title">
        <div class="newDish-leftText">新碟<i>|</i><span>新歌</span></div>
        <div class="newDish-rightMore">更多新碟</div>
      </div>
      <div class="newDish-list">
        <div class="newDish-item" v-for="(item,index) in this.newDish" :key="index">
          <img class="newDish-img" :src="item.picUrl" alt="">
          <div class="newDish-name">{{item.name}}</div>
          <div class="newDish-starName">{{item.artist.name}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'find',
  data () {
    return {
        banners:[],
        recommendSong:[],
        newDish:[]
    }
  },
  created(){
    //   banner轮播图
       this.musicAPI('/banner')
       .then(res=>{
        //  console.log(res)
           if(res.code==200){
                this.banners=res.banners;
                return this.musicAPI('/personalized?limit=6')
            }
       })
      //  歌单
       .then(res=>{
        //  console.log(res)
         if(res.code===200){
           this.recommendSong=res.result
           return this.musicAPI('/top/album?limit=3')
         }
       })
      //  新碟
       .then(res=>{
        //  console.log(res)
         if(res.code===200){
           this.newDish=res.albums
           return this.musicAPI('/recommend/songs')
         }
       })
      //  每日推荐歌曲
      .then(res=>{
        console.log(res)
        if(res.code===200){
          this.everyDaySong=res.data.dailySongs
        }
      })
      
  },
  methods:{
    musicAPI(url){
      return new Promise((resolve,reject)=>{
        this.http.get(url,{ withCredentials: true })
        .then(res=>{
          resolve(res.data)
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
    .find{
        padding:20px;
        box-sizing: border-box;
        .picture-wrapper{
          width: 100%;
          height: 150px;
              position: relative;
              z-index: -1 !important;
            .picture-item{
              width: 100%;
              height: 150px;
                img{
                width: 100%;
                height: 100%;
                border-radius: 10px;
               }
               .imgTitle{
                 position: absolute;
                 right: 0;
                 bottom:0;
                 padding: 5px;
                 border-top-left-radius: 5px;
                 background-color:red;
                 color: #fff;
               }
            }
        }
        .classify-wrapper{
          margin-top: 20px;
          display:flex;
          justify-content:space-around;
          .mu-button{
            width: 20px;
              z-index: -1 !important;
          }
        }
        .recommendSong-wrapper{
          margin-top:30px;
          .recommendSong-title{
            display:flex;
            justify-content:space-between;
            margin-bottom: 10px;
            .recommendSong-leftText{
              font-size: 18px;
              color: #000;
              font-weight: bold;
            }
            .recommendSong-rightMore{
              padding: 5px;
              border: 1px solid #ccc;
              border-radius: 10px;
              font-size: 12px;
            }
          }
          .recommendSong-list{
            display:flex;
            flex-wrap: wrap;
            justify-content: space-between;
            .recommendSong-item{
              display: flex;
              flex-direction:column;
              width: 100px;
              margin-bottom: 10px;
              .recommendSong-img{
                width: 100%;
                height: 100px;
                border-radius: 10px;
                margin-bottom: 5px;
              }
            }
          }
        }
        .newDish-wrapper{
          margin-top: 30px;
          .newDish-title{
            display:flex;
            justify-content:space-between;
            .newDish-leftText{
              font-size: 18px;
              color: #000;
              font-weight: bold;
              span{
                font-size: 14px;
                color: #999;
              }
              i{
                margin: 0 10px;
                color: rgba($color: #000, $alpha: .1);
              }
            }
            .newDish-rightMore{
              padding: 5px;
              border: 1px solid #ccc;
            }
          }
          .newDish-list{
            margin-top: 10px;
            display:flex;
            justify-content:space-between;
            .newDish-item{
              width: 100px;
              height: 100px;
              display:flex;
              flex-direction:column;
              margin-bottom: 10px;
              .newDish-img{
                width: 100%;
                height:100%;
                border-radius: 10px;
              }
              .newDish-name{
                margin: 5px 0;
              }
              .newDish-starName{
                font-size: 12px;
                color: #999;
              }
            }
          }
        }
   }
    
   
</style>
