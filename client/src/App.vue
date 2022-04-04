<template>
  <div id="app">
    <nav>
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </nav>
    <input v-model = "name" type="text" name="name" id="name">
    <input v-model = "prezime" type="text" name="prezime" id="prezime">
    <button @click="saveForm">
      save
    </button>
    <router-view/>
  </div>
</template>
<script>
const axios = require ("axios")
export default {
  
  name: "app", 
  data(){
    return  {
      name: "", prezime: ""
    }
  },
  methods:{
    async saveForm(){
      console.log(this.name, this.prezime)
      let data = await axios.post("http://localhost:3000/add-form", {
        name:this.name,
        prezime:this.prezime
      })
      console.log(
        data
      )
    }
  }
}
</script>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
