const express = require('express')
const cors = require("cors")
const app = express()
const port = 3000
app.use(cors())
app.use(express.json());
app.get('/', (req, res) => {
  res.send('Hello World!')
})


app.post('/add-form', (req, res) => {
    console.log (
      req.body
    )
    res.send('Forma dodana')
  })




app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})