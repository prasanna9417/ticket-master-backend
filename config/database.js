const mongoose = require('mongoose')

mongoose.Promise = global.Promise

const configureDB = ()=>{
    mongoose.connect('mongodb://localhost:27017/ticket-master-weekend-june',{useNewUrlParser:true})
    .then(()=>{
        console.log('successfully connected to db')
    })
    .catch((err)=>{
        console.log('error connecting to db',err)
    })
}

module.exports = configureDB