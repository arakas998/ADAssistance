<template>
    <div>
        <button @click="logout">Odjava</button>
        <h1>Dobrodošli {{ ime }} u AD Transporti</h1>
        <Form v-if = "rola == 'user'"></Form>
        <FormList v-if="rola" :rola="rola" />

        
    </div>
   
</template>

<script>
import axios from 'axios';
import Form from './Form.vue';
import FormList from './FormList.vue';
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
    async mounted() {
        await axios.get("http://localhost:5000/user", { headers: { token: localStorage.getItem("token") } })
            .then(res => {
            console.log(res);
            this.ime = res.data.user.ime;
            this.email = res.data.user.email;
            this.rola = res.data.user.rola;
            console.log(this.rola)
        });
    },
    methods: {
        logout() {
            localStorage.clear();
            this.$router.push("/login");
        }
    },
    components: { Form, FormList }
}
</script>