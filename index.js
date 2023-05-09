const connectToMongo= require('./db');
const express = require('express')
var cors=require('cors');
const authroute = require('./routes/userRouter');
const formroute = require('./routes/formRouter')
connectToMongo();

const app = express()
const port = 3008
app.use(cors());
app.get('/', (req, res) => {
  res.send('Hello Shashank!')
})
app.use(express.json());
app.use('/api/auth',authroute)
app.use('/api/form',formroute)

app.listen(port, () => {
  console.log(`Sankatmochak app listening on port ${port}`)
})