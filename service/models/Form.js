const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const formSchema = new Schema ({
    userId: {type: Schema.Types.ObjectId, ref: 'User'},
    Ime: String,
    Prezime: String,
    Brmobitela: Number, 
    Padresa: String,
    Oadresa: String,
    Vstanje: String,
    Vvozila: String,
    Tezina: Number,
    Status: String
})

const Form = mongoose.model("Form", formSchema);

module.exports = Form;