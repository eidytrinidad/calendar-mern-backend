const express= require('express');
const { dbConnection } = require('./database/config');
const cors = require('cors')
require('dotenv').config()

const app =express()

const morgan=require('morgan')

//Base de Datos

dbConnection()

// cors
app.use(cors())


//Middlewares
app.use(express.static('public'))
app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use(morgan('dev'))
// const port=process.env.PORT||4000;

// rutas
app.use('/api/auth',require('./routes/auth'))
app.use('/api/events',require('./routes/events'))
app.listen(process.env.PORT,()=>{
    console.log("Server Running in port",process.env.PORT)
})