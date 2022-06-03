<template>
    <div>
      E-MAIL: <input type="text" v-model="email"> <br/>
      LOZINKA: <input type="password" v-model="lozinka"> <br/>
      <button @click="login">Prijava</button>
      <router-link to="/signup">Nemate otvoren račun?</router-link>
      {{ error }}
    </div>
</template>

<script>
import axios from 'axios';


export default {
    name: "FormView",
    data(){
        return{
            email: "",
            lozinka: "",
            error: ""
        }
    },
    methods: {
        login(){
            let form = {
                email: this.email,
                lozinka: this.lozinka
            }
            axios.post("http://localhost:5000/saveform", { form:form, headers: { token: localStorage.getItem("token") } })
            .then(res =>{
                console.log(res);
                
            }, err => {
                console.log(err.response);
                this.error = err.response.data.error;
            })
        }
    }
}
</script>