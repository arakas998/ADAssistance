<template>
    <div>
      Ime: <input type="text" v-model="Ime"> <br/><br/>
      Prezime: <input type="text" v-model="Prezime"> <br/><br/>
      Broj mobitela: <input type="text" v-model="Brmobitela"> <br/><br/>
      Početna adresa: <input type="text" v-model="Padresa"> <br/><br/>
      Odredišna adresa: <input type="text" v-model="Oadresa"> <br/><br/>
      Vozno stanje: <input type="text" v-model="Vstanje"> <br/><br/>
      Vrsta vozila: <input type="text" v-model="Vvozila"> <br/><br/>
      Težina: <input type="text" v-model="Tezina"> <br/> <br/>
      <button @click="posalji">Pošalji</button>
      
      {{ error }}
    </div>
</template>

<script>
import axios from 'axios';


export default {
    name: "FormView",
    data(){
        return{
            Ime: "",
            Prezime: "",
            Brmobitela: "",
            Padresa: "",
            Oadresa: "",
            Vstanje: "",
            Vvozila: "",
            Tezina: "",
            error: ""
        }
    },
    methods: {
        posalji(){
            let form = {
                Ime: this.Ime,
                Prezime: this.Prezime,
                Brmobitela: this.Brmobitela,
                Padresa: this.Padresa,
                Oadresa: this.Oadresa,
                Vstanje: this.Vstanje,
                Vvozila: this.Vvozila,
                Tezina: this.Tezina
            }
            let token = localStorage.getItem("token") 
            console.log (token)
            axios.post("http://localhost:5000/saveform", form, {headers: { 'Authorization': token } })
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