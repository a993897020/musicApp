<template>
  <div id="app">
    <app-nav></app-nav>
    <router-view></router-view>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld'
import Nav from "./components/nav/Nav"
export default {
  name: 'App',
  components: {
    HelloWorld,"app-nav":Nav,
  }
}
</script>

<style lang="scss" scoped>

</style>
