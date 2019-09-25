<template>
  <div class="transition">
      <div class="bgImage"></div>
  </div>
</template>

<script>
export default {
  name: 'transition',
  data () {
    return {
    }
  },
  created(){
      setTimeout(()=>{
      this.goLogin()
      },2000)
  },
  methods:{
      goLogin(){
          this.$router.push('/login')
      }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang='scss'>
    .transition{
        .bgImage{
            background-image:url('./image/bg.jpg');
            background-size: 100% 100%;
            width:100%;
            height:100%;
            position:fixed;
            left: 0;
            top: 0;
        }
    }
</style>
