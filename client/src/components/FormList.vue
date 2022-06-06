<template>
    <div>
        <h1>UserForms</h1>
        <div :key="form._id" v-for="form in forms">
            <span>{{form.Ime}}</span>
            <span>{{form.Padresa}}</span>
        </div>
    </div>
</template>
<script>
import axios from 'axios'
export default {

    name: "FormListView",
    props: ['rola'],
    data(){
        return{
            forms: [],
            isLoaded: false
        }
    },
    methods: {
        async getUserForms(){
            const response = await axios.get("http://localhost:5000/get-user-forms", { headers: { token: localStorage.getItem("token") }})
            
            this.forms = response.data.forms
        },
        async getAllForms(){
            const response = await axios.get("http://localhost:5000/get-all-forms", { headers: { token: localStorage.getItem("token") }})
            
            this.forms = response.data.forms
        }
    
    },
    mounted(){
        if(this.rola == "admin"){
            this.getAllForms()
        }else{
            this.getUserForms()
        }
    }

}

</script>

