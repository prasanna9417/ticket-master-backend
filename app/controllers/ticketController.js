const Ticket = require('../models/ticket')
const Customer = require('../models/customer')
const Employee = require('../models/employee')
const Department = require('../models/department')

//list
module.exports.list=(req,res)=>{
    if( typeof req.query.limit != 'undefined' && typeof req.query.offset != 'undefined' ){
        Ticket.find().sort({"createdAt":-1}).limit(Number(req.query.limit)).skip(Number(req.query.offset))
        .then((ticket)=>{
            res.json(ticket)
        })
        .catch((err)=>{
            res.json(err)
        })
       
    }else if( typeof req.query.limit != 'undefined' && typeof req.query.offset == 'undefined' ){
        Ticket.find().sort({"createdAt":-1}).limit(Number(req.query.limit))
        .then((ticket)=>{
            res.json(ticket)
        })
        .catch((err)=>{
            res.json(err)
        })

    }else{
        Ticket.find().populate('departmentId').populate('employeeId').populate('customerId')
        .then((ticket)=>{
            res.json(ticket)
        })
        .catch((err)=>{
            res.json(err)
        })
   }
}

//create
module.exports.create=(req,res)=>{
    const body = req.body
    const ticket = new Ticket(body)
    ticket.save()
      .then((ticket)=>{
          res.json(ticket)
      })
      .catch((err)=>{
          res.json(err)
      })
}

//show
module.exports.show=(req,res)=>{
    const id = req.params.id
    // Note.findById(id).populate('categoryId',['name'])
    Ticket.findById(id).populate('departmentId').populate('employeeId').populate('customerId')
    .then((ticket)=>{
        if(ticket)
            res.json(ticket)
        else
            res.json({})
    })
    .catch((err)=>{
        res.json(err)
    })
}

//update
module.exports.update=(req,res)=>{
    const id=req.params.id
    const body=req.body
    Ticket.findByIdAndUpdate(id,body,{new:true,runValidators:true})
    .then((ticket)=>{
        if(ticket)
            res.json(ticket)
        else
            res.json({})
    })
    .catch((err)=>{
        res.json(err)
    })
}

module.exports.destroy=(req,res)=>{
    const {id}=req.params
    Ticket.findByIdAndDelete(id)
    .then((ticket)=>{
        if(ticket)
        res.json(ticket)
        else
        res.json({})
    })
    .catch((err)=>{
        res.json(err)
    })
}

