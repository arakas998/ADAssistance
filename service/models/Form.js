const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const formSchema = new Schema ({
    userId: {type: Schema.Types.ObjectId, ref: 'User'},
    adresa: String,
    broj_mobitela: {
        unique: true,
        type: Number
    },
    lozinka: String,
    rola: String
})

const Form = mongoose.model("Form", formSchema);

module.exports = Form;