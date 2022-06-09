<template>
    <div class="FormList">
        <h1>Popis transporta</h1>
        <table class="table table-striped">
                <thead>
                    <tr>
                        <th>Ime</th>
                        <th>Prezime</th>
                        <th>Broj telefona</th>
                        <th>Početna adresa</th>
                        <th>Odredišna adresa</th>
                        <th>Vozno stanje</th>
                        <th>Vrsta vozila</th>
                        <th>Težina</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="form in forms" :key="form._id">
                        <td scope="row">{{ form.Ime }}</td>
                        <td>{{ form.Prezime }}</td>
                        <td>{{ form.Brmobitela }}</td>
                        <td>{{ form.Padresa }}</td>
                        <td>{{ form.Oadresa }}</td>
                        <td>{{ form.Vstanje }}</td>
                        <td>{{ form.Vvozila }}</td>
                        <td>{{ form.Tezina }}</td>
                        <td>{{ form.Status }}</td>
                        <button v-if="rola == 'admin' && form.Status == 'cekanje'" @click="approve(form._id)">Prihvati</button>
                        <button v-if="rola == 'admin' && form.Status == 'cekanje'" @click="reject(form._id)">Odbij</button>
                    </tr>
                </tbody>
            </table>
    </div>
</template>
<script>
import axios from 'axios'
export default {

    name: "FormListView",
    props: ['rola'],
    data() {
        return {
            forms: [],
            isLoaded: false
        }
    },
    methods: {
        async getUserForms() {
            const response = await axios.get("http://localhost:5000/get-user-forms", { headers: { token: localStorage.getItem("token") } })

            this.forms = response.data.forms
        },
        async getAllForms() {
            const response = await axios.get("http://localhost:5000/get-all-forms", { headers: { token: localStorage.getItem("token") } })

            this.forms = response.data.forms
        },
        async approve(formId) {
            await axios.post(`http://localhost:5000/approve-form?id=${formId}`, {}, { headers: { token: localStorage.getItem("token") } })
            this.getForms()
        },
        async reject(formId) {
            await axios.post(`http://localhost:5000/reject-form?id=${formId}`, {}, { headers: { token: localStorage.getItem("token") } })
            this.getForms()
        },
        getForms() {
            if (this.rola == "admin") {
                this.getAllForms()
            } else {
                this.getUserForms()
            }
        }

    },
    mounted() {
        let self = this
        this.$root.$on('getForms', data => {
            console.log(data)
            self.getForms()
        });
        this.getForms()
    }

}

</script>

<style>
.FormList{
    background-color: rgba(255, 244, 172, 0.699);
    width: fit-content;
    border-radius: 10px;
    padding: 20px;
}

table, th, td {
  border: 1px solid;
}

td {
  text-align: center;
}
</style>

