<template>
  <div class="musicHome" >
    <div class="wrapper" v-if="this.isMusicHome">
        <div class="musicHome-header" >
        <div class="header-leftInfo">
            <mu-icon @click.prevent.stop="comeBack" value="arrow_back" color="#fff" size="36"></mu-icon>
            <div class="leftInfo-name">
                <div class="name-songName">{{ FMmusic[0].name }}</div>
                <div class="name-starName">{{ FMmusic[0].artists[0].name }}</div>
            </div>       
        </div>
         <div class="header-rightBtn">
                <mu-icon value="music_video" size="36" color="#fff"></mu-icon>
                <mu-icon value="share" size="36" color="#fff"></mu-icon>
            </div>     
    </div>
    <div class="musicHome-content">
        <img class="content-picture" :src="FMmusic[0].album.picUrl" alt="">
    </div>
    <div class="musicHome-footer">
        <div class="footer-topBtn">
            <mu-icon value="favorite_border" size="36" color="#fff"></mu-icon>
            <mu-icon value="play_for_work" size="36" color="#fff"></mu-icon>
            <mu-icon value="comment" size="36" color="#fff"></mu-icon>
            <mu-icon value="info_outline" size="36" color="#fff"></mu-icon>
        </div>
        <div class="footer-middleLine" >
            <div class="middleLine-startTime">{{playingTime}}</div>
            <mu-slider @change="changeTime"  class="middleLine-slider" v-model='musicSlider'></mu-slider>
            <div class="middleLine-endTime">{{musicAllTime}}</div>
        </div>
        <div class="footer-bottomBtn">
            <mu-icon value="replay" color="#fff" size="36"></mu-icon>
            <mu-icon value="skip_previous" color="#fff" size="36"></mu-icon>
            <mu-icon value="play_circle_outline" color="#fff"  ref="play" @click="playAudio" v-if="!this.isPlaying"  size="36" ></mu-icon>
            <mu-icon value="pause" v-if="this.isPlaying"  @click="stopAudio" color="#fff" size="36"></mu-icon>
            <mu-icon value="skip_next" color="#fff" size="36"></mu-icon>
            <mu-icon value="playlist_play" color="#fff" @click="openMusicList"  size="36"></mu-icon>
        </div>
    </div>
    <MusicList ref="musicList" :FMmusic="FMmusic"></MusicList>
    </div>
  </div>
</template>

<script>
import MusicList from '../musicList/MusicList'
export default {
  name: 'musicHome',
  components:{MusicList},
  props:{
      FMmusic:{
          type:Array,
          default:[]
      },
      playList:{
          type:Array,
          default:[]
      },
      isPlaying:{
          type:Boolean,
          default:false
      },
    musicTime:{
        type:Number,
        default:0
    },
    playingLong:{
        type:Number,
        default:0
    }
  },
  data () {
    return {
        isMusicHome:false,
        musicSlider:0,
        playingTime:'00:00'
    }
  },
  methods:{
      comeBack(){
        this.isMusicHome=false
      },
      openMusicHome(){
              this.isMusicHome=true
      },
      playAudio(){
          this.$parent.playAudio();
      },
      openMusicList(){
          this.$refs.musicList.openMusicList();
      },
       stopAudio(){
           this.$parent.stopAudio();
      },
      startTime(){
        //   音乐进度条
       let musicTime=Math.floor(this.musicTime);
       let speed=Math.floor(musicTime/100*1000)
       this.slider=setInterval(() => {
           this.musicSlider+=1;
       }, speed);
       console.log(speed)
    //    音乐播放时间
    //     let t=0; //10
    //    let m=0  //60
    //    let i=0;
       this.timer=setInterval(() => {
    //       i++;
    //       if(i==10){
    //           i=0
    //           t++
    //       }else if(t==6){
    //              m++;
    //              t=0;
    //       }
    //       console.log("0"+m+':'+t+i)
        //   this.playingTime="0"+m+':'+t+i
        let m=Math.floor(this.playingLong/60)?Math.floor(this.playingLong/60):0
        let s=parseInt(this.playingLong%60)?parseInt(this.playingLong%60):0
        // let t=s%10?s%10:0
        let mid=":"
        // this.playingTime=this.playingLong
        if(s>9){
            this.playingTime='0'+m+mid+s
        }else if(s<=9){
            this.playingTime='0'+m+mid+'0'+s
        }
      }, 1000);
      },
      closeTime(){
          clearInterval(this.timer);
          this.timer=null
          clearInterval(this.slider)
          this.slider=null
            this.musicSlider=0
      },
      changeTime(){
          let changeTime=this.musicSlider*this.musicTime/100
        //   console.log(this.musicSlider*this.musicTime/100)
          this.$parent.changeAudioTime(changeTime);
      }
  },
    computed:{
    musicAllTime(){
        let time=Math.floor(this.musicTime);
        let m=parseInt(time/60)
        let s=time%60
        if(m>=10){
            return m+':'+s
        }else{
            return '0'+m+':'+s
        }
      },
  
    },
  created(){
  },
 
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang='scss'>
.musicHome{
   .wrapper{
    position:fixed;
    left: 0;
    top:0;
    width: 100%;
    height:100%;
    background-color: #000;
    padding: 20px;
    box-sizing:border-box;
    z-index: 99;
        .musicHome-header{
        display:flex;
        justify-content:space-between;
        .header-leftInfo{
            display:flex;
            justify-content:flex-start;
                width: 60%;
            .leftInfo-name{
                display:flex;
                flex-direction:column;
                margin-left: 10px;
                width: 100%;
                .name-songName{
                    font-size:16px;
                    color: #fff;
                    margin-bottom: 2px;
                    white-space:nowrap;
                    overflow: hidden;
                    text-overflow:ellipsis;
                }
                .name-starName{
                    font-size: 12px;
                    color: #999;
                }
            }
        }
        .header-rightBtn{
            .mu-icon{
                margin-right: 10px;
            }
            .mu-icon:last-child{
                margin:0;
            }
        }
    }
    .musicHome-content{
        display:flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        height: 70%;
        .content-picture{
            border-radius: 50%;
            border: 5px solid #666;
            width: 250px;
            height: 250px;
            // margin-left: -125px;
            // margin-top: -125px;
        }
    }
    .musicHome-footer{
       
        .footer-topBtn{
            display:flex;
            justify-content: space-around;
        }
         .footer-middleLine{
             margin-top: 20px;
        display:flex;
        justify-content: space-between;
        .middleLine-startTime{
            color: #fff;
            margin-top: 3px;
        }
        .middleLine-slider{
            width: 75%;
        }
        .middleLine-endTime{
            margin-top: 3px;
            color:#fff;
        }
     }
     .footer-bottomBtn{
         display:flex;
         justify-content:space-around;
     }
    }
   
   }
}
</style>
