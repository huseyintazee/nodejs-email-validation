const express = require('express')
const bodyParser = require('body-parser')

//Routes
const apiRouter = require('./routes')

const app = express();
require('dotenv').config();

//middlewares
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))


//Route
app.use('/api', apiRouter)


//Listen
app.listen(6465,()=>{
    console.log("Server listenin on PORT : 6465")
})

