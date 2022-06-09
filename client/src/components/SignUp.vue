 <template>
    <div>

        <h3>Dobrodošli u aplikaciju AD transporti, molimo Vas da ispunite polja sa podacima kako bi ste se registriali i
            nastavili koristiti naše usluge.</h3><br />

        IME: <input type="text" v-model="ime" /> <br /><br />
        E-MAIL: <input type="text" v-model="email" /> <br /><br />
        LOZINKA: <input type="password" v-model="lozinka" /> <br /><br />
        <button @click="signup">Registracija</button>
        {{ error }}
    </div>
</template>





<script>
import axios from 'axios';



export default {
    name: "SignUp",
    data() {
        return {
            ime: "",
            email: "",
            lozinka: "",
            error: "",
        }
    },
    methods: {
        signup() {
            let newUser = {
                ime: this.ime,
                email: this.email,
                lozinka: this.lozinka
            }
            axios.post("http://localhost:5000/signup", newUser)
                .then(res => {
                    console.log(res)
                    this.error = "";
                    this.$router.push("/login");
                }, err => {
                    console.log(err.response)
                    this.error = err.response.data.error
                })

        }
    }
}
</script>

