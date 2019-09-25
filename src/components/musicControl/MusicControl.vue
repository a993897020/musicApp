<template>
  <div class="musicControl" ref="line" @click.stop.prevent="openMusicHome" >
      <audio   id="audio" @click="playingFn"   @ended="overAudio">
          <source  :src="item.url" v-for="(item,index) in this.playList" :key="index">
      </audio>
    <div class="wrapper">
           <div class="musicControl-leftInfo" >
          <img class="leftInfo-avatar"   :src="this.FMmusic[0].album.picUrl"  alt="">
            <div class="leftInfo-name">
                <div class="name-songName">{{this.FMmusic[0].name}}</div>
                <div class="name-starName">{{this.FMmusic[0].artists[0].name}}</div>
            </div>
      </div>
      <div class="musicControl-rightBtn">
            <div class="rightBtn-video">
                <mu-icon value="play_circle_outline"  ref="play" @click.prevent.stop="playAudio" v-if="!this.isPlaying"  size="36" color="#000"></mu-icon>
                <mu-icon value="pause_circle_outline" v-if="this.isPlaying" @click.prevent.stop="stopAudio"  size="36" color="#000"></mu-icon>
                <mu-icon value="playlist_play" @click.prevent.stop="openMusicList"  size="36"></mu-icon>
            </div>
      </div>
    </div>
        <!-- 音乐列表 -->
    <MusicList ref="musicList"  :FMmusic="FMmusic"></MusicList>
        <!-- 音乐界面 -->
    <MusicHome ref="musicHome" :playingLong="playingLong"  :musicTime="musicTime"  :isPlaying="isPlaying" :playList='playList' :FMmusic='FMmusic'></MusicHome>
  </div>
</template>

<script>
import MusicHome from './musicHome/MusicHome'
import MusicList from './musicList/MusicList'
export default {
  name: 'musicControl',
  components:{MusicHome,MusicList},
  data () {
    return {
        FMmusic:[],
        playList:[],
        isPlaying:false,
        isOver:false,
        musicTime:0,
        playingLong:0
    }
  },
  created(){
      this.musicPlayAPI('/personal_fm')
        .then(res=>{
            console.log(res.data)
            if(res.data.code===200){
                this.FMmusic=res.data.data
                let musicList=''
                this.FMmusic.forEach((item,index,list)=>{
                    if(index===list.length-1){
                        musicList+=item.id
                    }else{
                        musicList+=item.id+','
                    }
                })
                return this.musicPlayAPI('/song/url?id='+ musicList +'')
            }
        })
        .then(res=>{
            console.log(res.data)
            if(res.data.code===200){
                this.playList=res.data.data
            }
        })
          
  },
  mounted(){

  },
  methods:{
      playingFn(){
        //   this.http.get('/song/url?id='+ this.FMmusic[0].id +'')
        //     .then(res=>{
        //         if(res.data.code===200){
        //             console.log(res.data)
        //             this.playing=res.data[0].url
        //             console.log(this.$refs.music)
        //             this.$refs.url=this.playing;
        //         }
        //     })
        console.log(1)
        this.$refs.music.play();
      },
        musicPlayAPI(url){
            return new Promise((resolve,reject)=>{
                this.http.get(url,{withCredentials : true})
                    .then(res=>{
                        resolve(res)
                    })
                    .catch(err=>{
                        reject(err)
                    })
            })
        },
        playAudio(){
            this.isPlaying=true
            let audio=this.audio=document.getElementById('audio');
       
            this.musicTime=audio.duration
            this.$refs.musicHome.startTime();
                audio.play();
        },
        stopAudio(){
            this.isPlaying=false
            let audio=document.getElementById('audio')
            audio.pause();
            console.log(audio)
        },
        changeAudioTime(val){
            let audio=document.getElementById('audio')
            // audio.fastSeek(20)
            audio.currentTime=val
            console.log(audio.currentTime)
        },
        overAudio(){
            this.isPlaying=false
            this.$refs.musicHome.closeTime()
                console.log('111')
        },
        openMusicList(){
            this.$refs.musicList.openMusicList();
        },
      
        openMusicHome(){
              let audio=this.audio=document.getElementById('audio');
            this.musicTime=this.audio.duration
            setInterval(() => {
            this.playingLong=Math.floor(this.audio.currentTime)
            }, 1000);
            this.$refs.musicHome.openMusicHome();
        }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang='scss'>
    .musicControl{
        position:fixed;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 50px;
        border-top:1px solid #000;
        background-color: #fff;
       .wrapper{
            display:flex;
            justify-content:space-between;
            .musicControl-leftInfo{
            display:flex;
                margin: 5px;
                height: 100%;
            .leftInfo-avatar{
                width: 40px;
                height: 40px;
                border-radius: 50%;
                margin-right: 10px;
            }
            .leftInfo-name{
                display: flex;
                flex-direction: column;
                .name-songName{
                    font-size: 16px;
                    color: #000;
                    white-space:nowrap;
                    overflow:hidden;
                    text-overflow:ellipsis;
                    width: 150px;
                }
                .name-starName{
                    font-size: 12px;
                    color: #666;
                }
            }
        }
        .musicControl-rightBtn{
                height: 50px;
            .mu-icon{
                margin-right: 15px;
                margin-top: 10px;
                position: relative;
            }
            .mu-icon:first-child{
            }
            // .mu-icon:first-child:before{
            //     position:absolute;
            //     left: 3px;
            //     top: 3px;
            //     content:'';
            //     border-radius: 50%;
            //     border: 2px solid red;
            //     width: 26px;
            //     height: 26px;
            //     padding-right: 2px;
            //     padding-top: 2px;
            //     padding-bottom: 2px;
            //     z-index: 2;
            // }
            .mu-icon:last-child{
                margin: 0;
            }
        }
       }
   
    }
</style>
