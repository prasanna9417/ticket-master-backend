const mongoose = require('mongoose')

const Schema = mongoose.Schema
const ticketSchema = new Schema({
    task:{
        type:String,
        required:true
    },
    employeeId:{
        type: Schema.Types.ObjectId,
        ref: 'Employee',
        required:true
    },
    departmentId:{
        type: Schema.Types.ObjectId,
        ref: 'Department',
        required:true
    },
    customerId:{
        type: Schema.Types.ObjectId,
        ref: 'Customer',
        required:true
    },
    createdAt : {
        type : Date,
        default : Date.now
    },
    priority: {
        type: String,
        required:true
    },
    isResolved:{
        type:Boolean,
        required:true
    }
})

const Ticket=mongoose.model('Ticket', ticketSchema)

module.exports = Ticket