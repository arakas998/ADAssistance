 <template>
<div>
    IME: <input type="text"  v-model="ime" /> <br/>
    E-MAIL: <input type="text" v-model="email" /> <br/>
    LOZINKA: <input type="password" v-model="lozinka" /> <br/>
    <button @click="signup">Registracija</button>
    {{ error }}
</div>
</template>

<script>
import axios from 'axios';



export default{
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
        signup(){
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
            }, err=> {
                console.log(err.response)
                this.error = err.response.data.error
            })
           
        }
    }
}
</script>

