<template>
    <body>


    <span class="left">
        <h1>AD TRANSPORTI</h1> <br/>
      
        
        
    </span>
    <span class="right">
      E-MAIL: <input type="text" v-model="email"> 
      LOZINKA: <input type="password" v-model="lozinka"> <br/><br/>
      <button @click="login" style="float: right;">Prijava</button> <br/> <br/>
      <router-link to="/signup" style="float: right;">Nemate otvoren račun? Registrirajte se.</router-link><br/><br/>
      {{ error }}
    </span>

<div class="center">
    <h3>POMOĆ NA CESTI 0-24h (Vučna služba)</h3>
<p>Dolazimo na mjesto nezgode te vršimo usluge sitnih popravaka na licu mjesta.
Ukoliko isto nije moguće prevozimo Vas i Vaše vozilo na željeno odredište.
Surađujemo sa odabranim mehaničarskim i autolimarskim radionicama te Vaše vozilo može biti osposobljeno za daljnje putovanje u vrlo kratkom roku.
Na raspolaganju Vam je i 40 zamjenskih vozila iz našeg voznog parka.
Po potrebi Vaše vozilo možete nam ostaviti na čuvanju u našem zaštićenom depou.
Isto tako ističemo da možemo osigurati smještaj ukoliko se za to ukaže potreba.
Surađujemo sa brojnim domaćim, europskim i svjetskim asistencama i osiguravajućim kućama.
Ugovorni smo suradnici HAK-a.</p>

<h3>PRIJEVOZ VOZILA</h3>


<p>Raspolažemo sa 2 kamiona opremljena za prijevoz svih vrsta vozila i uključujući radne strojeve, plovila, kamp kućice i poljoprivredne mehanizacije.
S punim povjerenjem nam predajte Vašeg trkaćeg ljubimca ili bilo koje vozilo, dostaviti ćemo Vam ga sigurno i pravovremeno na željeno odredište.
Godine iskustva i konstantno usavršavanje, te praćenje standarda u struci i opremljenost najsuvremenijim tehnologijama garancija su naše kvalitete.</p>

<h3>RENT A CAR</h3>

<p>Osim prijevoza vozila i pomoći na cesti, nudimo Vam i usluge iznajmljivanja vozila raznih kategorija u našoj rent-a-car službi "AD Rent-a-car".
Sve dodatne informacije na www.ad_rent-a-car.hr Ne ustručavajte se javiti nam se za informacije, savjete ili upite!</p>

<h4>Obratite nam se s povjerenjem!</h4>
</div>
    </body>

</template>

<script>
import axios from 'axios';


export default {
    name: "LoginView",
    data(){
        return{
            email: "",
            lozinka: "",
            error: ""
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
                    localStorage.setItem("token", res.data.token);
                    this.$router.push("/");
                }
            }, err => {
                console.log(err.response);
                this.error = err.response.data.error;
            })
        }
    }
}
</script>

<style>


body {
  background-image: url('background.jpg');
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-size: cover;
}

.right{
    float:right;
}

.left{
    float:left;
}
img {
  width: 100%;
}

.center{
    position:absolute;
    
    height:800px;
    width:800px;
    left:50%;
    top:30%;
    margin-top:-50px;
    margin-left:-50px;
    
}


p {
  font-size: 20px;
}
</style>
