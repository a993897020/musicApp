<template>
  <div class="nav">
      <div class="menu-wrapper">
          <img src="./image/menu.png" alt="menu">
      </div>
      <div class="nav-wrapper">
          <router-link to="/mine" class="item">我的</router-link>
          <router-link to="/find" class="item">发现</router-link>
          <router-link to="/cloud" class="item">云村</router-link>
          <router-link to="/video" class="item">视频</router-link>
      </div>
      <div class="search-wrapper">
          <img src="./image/search.png" alt="search">
      </div>
             <!-- 音乐播放器 -->
    <MusicControl ></MusicControl>
  </div>
</template>

<script>
import MusicControl from '../musicControl/MusicControl'
export default {
    components:{MusicControl},
  data () {
    return {
    }
  },
 
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang='scss'>
    .nav{
        /* height: 172px; */
        margin-top: 60px;
        padding: 20px;
        box-sizing: border-box;
        display: flex;
        justify-content:space-between;
    }
    .nav .menu-wrapper{
        width:25px;
        height: 25px;
    }
    .menu-wrapper img{
        width:100%;
        height: 100%;
    }
    .nav .nav-wrapper{
        display:flex;
        justify-content: center;
        align-content: center;
    }
    .nav-wrapper .item{
        font-size: 16px;
        color: #666;
        padding-left: 20px;
    }
    .nav-wrapper .active{
        font-weight: bold;
        color: #000;
        font-size: 18px;
        margin-top: -2px;
    }
    .nav-wrapper .item:first-child{
        padding: 0;
    }
    .nav .search-wrapper{
        width: 25px;
        height: 25px;
    }
    .search-wrapper img{
        width: 100%;
        height: 100%;
    }
</style>
