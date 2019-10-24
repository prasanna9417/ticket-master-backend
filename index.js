const express = require('express')
const configureDB=require('./config/database')
const morgan=require('morgan')
const router=require('./config/routes')
const app =express()
const fs = require('fs')
const port= 3015

configureDB()

app.use(express.json())

// setting up logstreams
const accessLogStream = fs.createWriteStream('./access.log', { flags: 'a' })

//app.use(morgan('dev'))

// setting up logger
app.use(morgan('combined', { stream: accessLogStream }))

app.get("/",(req,res)=>{
    res.json({
        notice: "Welcome to the ticket-master-backend"
    })
})

app.use('/', router)

app.listen(port,()=>{
    console.log("Listening to port",port)
})