<template>
  <div id="app">
    
    <re-base v-if="!signedIn" >
      <router-view/>
    </re-base>
    <router-view v-else/>
    
  </div>
</template>

<script>
import ReBase from './components/ReBase.vue'
export default {
  components: { ReBase },
  name: 'App',
  data () {
      return {
       signedIn:false
      }
    },
  mounted() {
      if (localStorage.signedIn) this.signedIn = localStorage.signedIn;
    },
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
