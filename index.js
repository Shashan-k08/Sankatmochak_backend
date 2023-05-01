const connectToMongo= require('./db');
const express = require('express')
var cors=require('cors');
connectToMongo();

const app = express()
const port = 3008
app.use(cors());
app.get('/', (req, res) => {
  res.send('Hello Shashank!')
})
app.use(express.json());


app.listen(port, () => {
  console.log(`Sankatmochak app listening on port ${port}`)
})