<template>
    <div>
        <button @click="logout">Odjava</button>
        <h1>HELLO {{ ime }}</h1>
        <h2>Tvoj mail je {{ email }}</h2>
    </div>
</template>

<script>
import axios from 'axios';
export default {
    name: "LandingView",
    data () {
        return {
            ime: "",
            email: "",
        }
    },
    created(){
      if  (localStorage.getItem("token") == null) {
          this.$router.push("/login");
      }
    },
    mounted() {
        axios.get("http://localhost:5000/user", {headers: {token: localStorage.getItem("token")}})
        .then(res => {
            console.log(res);
            this.ime = res.data.user.ime;
            this.email = res.data.user.email;
        })
    },
    methods: {
        logout(){
            localStorage.clear();
            this.$router.push("/login");
        }
    }
}
</script>