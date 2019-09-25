<template>
  <div class="everyDaySong">
      <div class="everyDaySong-header">
          <div class="header-left">
            <mu-icon @click="comeBack" value="arrow_back" color="#000" size="28"></mu-icon>
            <div class="left-title">每日推荐</div>
          </div>
          <div class="header-right">
                <mu-icon value="help_outline"></mu-icon>
          </div>
      </div>
      <div class="everyDaySong-content">
          <div class="content-header">
              <div class="header-left">
              <mu-icon value="play_circle_outline" size="28" color="#000"></mu-icon>
              <div class="left-play">播放全部</div>
              </div>
              <div class="header-right">
                  <img src="./image/selectAll.png" alt="">
                  <div class="right-select">多选</div>
              </div>
          </div>
          <div class="content-list">
              <div class="content-item" v-for="(item,index) in this.everyDaySong" :key="index">
                <div class="item-leftInfo">
                    <img class="leftInfo-avatar" :src="item.album.picUrl" alt="">
                    <div class="leftInfo-name">
                        <div class="name-songName">{{item.album.name}}</div>
                        <div class="name-starName">{{item.album.artists[0].name}}</div>
                    </div>
                </div>
                <div class="item-rightBtn">
                    <div class="rightBtn-video">
                      <mu-icon value="play_circle_outline" v-if="item.mvid" size="28" color="#000"></mu-icon>
                      <mu-icon value="expand_more"  size="28"></mu-icon>
                    </div>
                </div>
              </div>
          </div>
      </div>
  </div>
</template>

<script>
export default {
  name: 'everyDaySong',
  data () {
    return {
        everyDaySong:[]
    }
  },
  created(){
      this.http.get('/recommend/songs',{ withCredentials: true })
        .then(res=>{
            if(res.data.code===200){
                this.everyDaySong=res.data.data.dailySongs
                console.log(this.everyDaySong)
            }
        })
  },
  methods:{
    comeBack(){
        this.$router.push('/find')
    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang='scss'>
.everyDaySong{
    position:fixed;
    left: 0;
    top:0;
    width: 100%;
    height: 100%;
    background-color: #fff;
    padding:20px;
    box-sizing:border-box;
    .everyDaySong-header{
        display:flex;
        justify-content:space-between;
        .header-left{
            display:flex;
            justify-content:flex-start;
            .left-title{
                font-weight: bold;
                font-size: 18px;
                margin-left: 20px;
            }
        }
    }
    .everyDaySong-content{
        margin-top: 20px;
        padding: 20px;
        border-top: 1px solid #000;
        border-top-left-radius: 20px;
        border-top-right-radius: 20px;
        margin-left: -20px;
        margin-right: -20px;
        box-sizing: border-box;
        .content-header{
            display:flex;
            justify-content:space-between;
            .header-left{
                display:flex;
                .left-play{
                    margin-left: 10px;
                    font-size: 16px;
                }
            }
            .header-right{
                display: flex;
                .right-select{
                    font-size: 16px;
                }
                img{
                    width: 15px;
                    height: 15px;
                    margin-top: 5px;
                    margin-right: 10px;
                }
            }
        }
        .content-list{
            .content-item{
                display:flex;
                justify-content:space-between;
                margin-top: 20px;
                .item-leftInfo{
                    display:flex;
                    justify-content:flex-start;
                    .leftInfo-avatar{
                        margin-right: 10px;
                        width: 50px;
                        height: 50px;
                        border-radius: 5px;
                    }
                    .leftInfo-name{
                        display:flex;
                        flex-direction:column;
                        width: 200px;
                        .name-songName{
                            font-size: 16px;
                            margin-bottom: 5px;
                            color:#000;
                            text-overflow:ellipsis;
                            overflow:hidden;
                            white-space:nowrap;
                        }
                        .name-starName{
                            font-size: 12px;
                            color: #999;
                        }
                    }
                }
                .item-rightBtn{
                    display:flex;
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
