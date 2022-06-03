<template>
    <div>
        <button @click="logout">Odjava</button>
        <h1>HELLO {{ ime }}</h1>
        <h2>Tvoj mail je {{ email }}</h2>
        <Dashboard v-if = "rola == 'admin' "></Dashboard>
    </div>
</template>

<script>
import axios from 'axios';
import Dashboard from './Dashboard.vue';
export default {
    name: "LandingView",
    
    data() {
        return {
            ime: "",
            email: "",
            rola: ""
        };
    },
    created() {
        if (localStorage.getItem("token") == null) {
            this.$router.push("/login");
        }
    },
    mounted() {
        axios.get("http://localhost:5000/user", { headers: { token: localStorage.getItem("token") } })
            .then(res => {
            console.log(res);
            this.ime = res.data.user.ime;
            this.email = res.data.user.email;
            this.rola = res.data.user.rola;
        });
    },
    methods: {
        logout() {
            localStorage.clear();
            this.$router.push("/login");
        }
    },
    components: { Dashboard }
}
</script>