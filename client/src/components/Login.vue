<template>
    <div>
      E-MAIL: <input type="text" v-model="email"> <br/>
      LOZINKA: <input type="password" v-model="lozinka"> <br/>
      <button @click="login">Prijava</button>
      {{ error }}
    </div>
</template>

<script>
import axios from 'axios';


export default {
    name: "LoginView",
    data(){
        return{
            email: " ",
            lozinka: " ",
        }
    },
    methods: {
        login(){
            let user = {
                email: this.email,
                lozinka: this.lozinka
            }
            axios.post("http://localhost:5000/login", user)
            .then(res =>{
                console.log(res);
                if (res.status == 200){
                    console.log(res)
                }
            }, err => {
                console.log(err.response);
                this.error = err.response.data.error;
            })
        }
    }
}
</script>