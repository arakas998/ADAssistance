const express = require('express')
const cors = require("cors")
require('dotenv').config()
const app = express()
const port = 3000
const db = require('./db')
app.use(cors())
app.use(express.json());
app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.post('/add-form', (req, res) => {
    const dbC = db()
    console.log (
      req.body,
      dbC
    )
    res.send('Forma dodana')
  })




app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})