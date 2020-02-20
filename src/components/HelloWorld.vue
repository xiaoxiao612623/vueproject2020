<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <h2>Hello World !</h2>
    <router-link to='/pos'> <h3>To Pos</h3> </router-link>
    <h3 @click="aa">跳到</h3>
    <el-switch
      v-model="value"
      active-color="#13ce66"
      inactive-color="#ff4949">
    </el-switch>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      value: false
    }
  },
  methods: {
    aa(){
      this.$router.push({path:'/aa'})
    }
  }, 
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
