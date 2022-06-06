const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require("cors");
const User = require("./models/User");
const Form = require("./models/Form");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");



mongoose.connect("mongodb+srv://admin:admin@cluster0.5cmtv.mongodb.net/?retryWrites=true&w=majority");



const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//rute
app.post("/signup", (req, res, next) => {
  console.log(req.body.email)
  const newUser = new User({
    email: req.body.email,
    ime: req.body.ime,
    lozinka: bcrypt.hashSync(req.body.lozinka, 10),
    rola: "user"
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
  User.findOne({ email: req.body.email }, (err, user) => {
    console.log(user)
    if (err) return res.status(500).json({
      title: "server error",
      error: err
    })
    if (!user) {
      return res.status(401).json({
        title: "User nije pronađen",
        error: "Neispravni podaci"
      })
    }
    if (!bcrypt.compareSync(req.body.lozinka, user.lozinka)) {
      return res.status(401).json({
        title: "Neuspješna prijava",
        error: "Neispravni podaci"
      })
    }
    let token = jwt.sign({ userId: user._id }, "secretkey");
    return res.status(200).json({
      title: "Prijava je uspješna",
      token: token
    })
  })
})



app.get("/get-user-forms",(req,res, next)=>{
  let token = req.headers.token;
  jwt.verify(token, "secretkey", (err, decoded) => {
    if(err) return res.status(401).json({err})
    const {userId} = decoded

    Form.find({ userId: mongoose.Types.ObjectId(userId)}, '-userId -__v', (err, forms) => {
      if(err) return res.status(500).json({err})
      return res.status(200).json({forms})
    })
  })
})

app.get("/get-all-forms",(req,res, next)=>{
  let token = req.headers.token;
  jwt.verify(token, "secretkey", (err, decoded) => {
    if(err) return res.status(401).json({err})
    Form.find({}, '-userId -__v', (err, forms) => {
      if(err) return res.status(500).json({err})
      return res.status(200).json({forms})
    })
  })
})

app.post("/saveform", (req, res, next) => {
  
  let token = req.headers.authorization;
  
  jwt.verify(token, "secretkey", (err, decoded) => {
    if (err) return res.status(401).json({
      title: "Neovlašteni pristup"
    })

    User.findOne({ _id: decoded.userId }, (err, user) => {
      if (err) return console.log(err)
      const newForm = new Form({
        Ime: req.body.Ime,
        Prezime: req.body.Prezime,
        Brmobitela: req.body.Brmobitela,
        Padresa: req.body.Padresa,
        Oadresa: req.body.Oadresa,
        Vstanje: req.body.Vstanje,
        Vvozila: req.body.Vvozila,
        Tezina: req.body.Tezina,
        userId: mongoose.Types.ObjectId(user._id)
      })
     
      newForm.save(err => {
        
        if (err) {
          return res.status(400).json({
            title: err,
            error: "Forma već ispunjena"
          })
        }
        
        return res.status(200).json({
          title: "Forma spremljena",
          Form: {
            Ime: req.body.Ime,
            Prezime: req.body.Prezime,
            Brmobitela: req.body.Brmobitela,
            Padresa: req.body.Padresa,
            Oadresa: req.body.Oadresa,
            Vstanje: req.body.Vstanje,
            Vvozila: req.body.Vvozila,
            Tezina: req.body.Tezina
          }
        })
      })
      
    })

  })

})



app.get("/user", (req, res, next) => {
  let token = req.headers.token;
  jwt.verify(token, "secretkey", (err, decoded) => {
    if (err) return res.status(401).json({
      title: "Neovlašteni pristup"
    })

    User.findOne({ _id: decoded.userId }, (err, user) => {
      if (err) return console.log(err)
      return res.status(200).json({
        title: "User ispravan",
        user: {
          email: user.email,
          ime: user.ime,
          rola: user.rola
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


