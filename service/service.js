const express = require('express');
const bodyParser = require ('body-parser');
const mongoose = require ('mongoose');
const cors = require("cors");
const User = require("./models/User");
const bcrypt = require("bcrypt");
//require('dotenv').config()
const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

//rute
app.post("/signup", (req, res, next) =>{
  console.log(req.body.email)
  const newUser = new User ({
    email: req.body.email,
    ime: req.body.ime,
    lozinka: bcrypt.hashSync(req.body.lozinka, 10)
  })
  console.log(newUser);
})



const port = process.env.PORT || 5000;

app.listen(port, (err) => {
  if (err) return console.log(err);
  console.log("Server radi na portu: " + port);
})



//const db = require('./db')
/*
app.use(cors())
app.use(express.json());
app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.post('/add-form', (req, res) => {
    //const dbC = db()
    console.log (
      req.body,
      //dbC
    )
    res.send('Forma dodana')
  })




app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})*/
