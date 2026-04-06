require('dotenv').config()
const express = require('express')
const mongoose  =require('mongoose')
PORT = process.env.PORT
DB = process.env.DB
const orderRouter = require('./routes/orderRoute')
const adminRouter = require('./routes/adminRoute')

const app = express()

app.use(express.json())
app.use(orderRouter)
app.use(adminRouter)

const Startserver = async ()=>{ 
  mongoose.connect(DB).then(() => {
    console.log('Connected to Database')
    app.listen(PORT, () => {
      console.log('Server is running on Port:', PORT)
    })
  }).catch((error) => {
    console.log('Error connecting to Database', error.message)
  });
};

Startserver();