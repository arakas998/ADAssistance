const express = require('express');
const bodyParser = require ('body-parser');
const mongoose = require ('mongoose');
const cors = require("cors");
const User = require("./models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");



mongoose.connect("mongodb+srv://admin:admin@cluster0.5cmtv.mongodb.net/?retryWrites=true&w=majority");



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
  newUser.save(err => {
    if (err) {
      return res.status(400).json({
        title: "error",
        error: "E-mail se već koristi"
      })
    }
    return res.status(200).json({
      title: "Prijava je uspješna"
    })
  })
})


app.post("/login", (req, res, next) => {
  User.findOne({email: req.body.email}, (err,user) =>{
    console.log(user)
    if (err) return res.status(500).json({
      title: "server error",
      error: err
    })
    if (!user){
      return res.status(401).json({
        title: "User nije pronađen",
        error: "Neispravni podaci"
      })
    }
    if (!bcrypt.compareSync(req.body.lozinka, user.lozinka)){
      return res.status(401).json({
        title: "Neuspješna prijava",
        error: "Neispravni podaci"
      })
    }
      let token = jwt.sign({userId: user._id}, "secretkey");
      return res.status(200).json({
        title: "Prijava je uspješna",
        token: token
      })
  })
})


app.get("/user", (req, res, next) =>{
  let token = req.headers.token;
  jwt.verify(token, "secretkey", (err, decoded) =>{
    if (err) return res.status(401).json({
      title: "Neovlašteni pristup"
    })
    
    User.findOne({ _id: decoded.userId }, (err, user) =>{
      if (err) return console.log(err)
      return res.status(200).json({
        title: "User ispravan",
        user: {
          email: user.email,
          ime: user.ime
        }
      })
    })

  })
})
const port = process.env.PORT || 5000;

app.listen(port, (err) => {
  if (err) return console.log(err);
  console.log("Server radi na portu: " + port);
})


