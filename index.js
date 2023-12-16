const express = require('express')
const dotenv = require("dotenv")
const mongoose = require("mongoose")
const productRouter = require('./routes/products')
const authRouter = require('./routes/auth')
const userroute = require('./routes/user')
const cardroute =require("./routes/card")
const orderrouter = require('./routes/order')
const app = express()  
const port = 3000

dotenv.config()
mongoose.connect(process.env.MONGO_URL).then(()=>console.log("db connected")).catch((err)=>console.log(err))

app.use(express.json({limit:'10mb'}))
app.use(express.urlencoded({limit:'10mb',extended:true})); 
  
 app.use('/api/products',productRouter)
 app.use('/api/',authRouter) 
 app.use('/api/users',userroute)
 app.use('/api/cards',cardroute)
 app.use('/api/orders',orderrouter)
app.listen(process.env.PORT || port, () => console.log(`Example app listening on port ${port}!`))    