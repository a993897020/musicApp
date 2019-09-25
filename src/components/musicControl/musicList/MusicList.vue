<template>
  <div class="musicList">
     <div class="musicList-wrapper" v-if="openList">
          <div class="musicList-bg" @click.prevent.stop="closeMusicList"></div>
          <div class="musicList-content">
              <div class="content-header">
                  <div class="header-leftInfo">
                      <mu-icon value="replay"></mu-icon>
                      <div class="leftInfo-name" >列表循环({{this.FMmusic.length}})</div>
                  </div>
                  <div class="header-rightBtn">
                      <div class="rightBtn-collection">
                            <mu-icon value="star_border"></mu-icon>
                            <div class="collection-name">收藏全部</div>
                      </div>
                      <div class="rightBtn-deleteAll">
                          <mu-icon value="delete_outline"></mu-icon>
                      </div>
                  </div>
              </div>
              <div class="content-list" >
                  <div class="content-item" v-for="(item,index) in this.FMmusic" :key="index">
                      <div class="item-name">
                          <div class="name-songName">{{item.name}}
                                <span class="name-starName">-{{item.artists[0].name}}</span>
                          </div>
                        
                      </div>
                      <div class="item-delete">
                          <mu-icon value="clear"></mu-icon>
                      </div>
                  </div>
              </div>
          </div>
      </div>
  </div>
</template>

<script>
export default {
  name: 'musicList',
  props:{
      FMmusic:{
          type:Array,
          default:[]
      }
  },
  data () {
    return {
        openList:false
    }
  },
  methods:{
        closeMusicList(){
            this.openList=false
        },
         openMusicList(){
            this.openList=true
        },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang='scss'>
.musicList{
    .musicList-wrapper{
            position:fixed;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            z-index: 5;
              .musicList-bg{
                position: fixed;
                height: 50%;
                width: 100%;
                left: 0;
                top:0;
                background-color: rgba($color: #000, $alpha: 0.5);
            }
            .musicList-content{
                border-top-left-radius: 20px;
                border-top-right-radius: 20px;
                border-top: 1px solid #fff;
                padding: 20px;
                background-color: #fff;
                position:fixed;
                left: 0;
                bottom: 0;
                height: 60%;
                width: 100%;
                overflow: hidden;
                box-sizing:border-box;
                .content-header{
                    display:flex;
                    justify-content:space-between;
                    .header-leftInfo{
                        display:flex;
                        justify-content:flex-start;
                        .leftInfo-name{
                            margin-left: 10px;
                            font-size: 16px;
                        }
                    }
                    .header-rightBtn{
                        display:flex;
                        justify-content: flex-start;
                        .rightBtn-collection{
                            margin-right: 20px;
                            display: flex;
                            justify-content:flex-start;
                            .collection-name{
                                font-size: 16px;
                                 margin-left:10px;
                            }
                        }
                    }
                }
                .content-list{
                    margin-top: 20px;
                    .content-item{
                        display:flex;
                        justify-content:space-between;
                        margin-bottom: 20px;
                        .item-name{
                            display: flex;
                            justify-content:flex-start;
                            width: 80%;
                            .name-songName{
                                font-size: 14px;
                                white-space:nowrap;
                                text-overflow: ellipsis;
                                overflow: hidden;
                                color: #000;
                                .name-starName{
                                font-size: 12px;
                                color: #666;
                                 }
                            }
                            
                        }
                        .item-delete{

                        }
                    }
                }
            }
        }
}
</style>
