const Customer = require('../models/customer')
const Ticket = require('../models/ticket')

//list
module.exports.list=(req,res)=>{
    Customer.find()
    .then((customer)=>{
        res.json(customer)
    })
    .catch((err)=>{
        res.json(err)
    })
}

module.exports.create=(req,res)=>{
    const body = req.body
    const customer = new Customer(body)
    customer.save()
      .then((customer)=>{
          res.json(customer)
      })
      .catch((err)=>{
          res.json(err)
      })
}

// module.exports.show = (req, res) => {
//     const { id } = req.params
//     Customer.findById(id)
//         .then((customer) => {
//             if(customer){
//                 res.json(customer)
//             } else {
//                 res.json({})
//             }
//         })
//         .catch((err) => {
//             res.json(err)
//         })
// }


module.exports.show = (req, res) => {
    const { id } = req.params
    Customer.findById(id)
        .then((customer) => {
            if(customer){
                Ticket.find({ customerId: id})
                    .then((ticket)=>{
                        if(ticket){
                            //console.log('id found')
                            const newCustomer={customer,ticket}
                            res.json(newCustomer)
                            
                        }
                        else{
                            //console.log('id not found')
                            res.json(customer)
                            
                        }
                    })
                    .catch((err) => {
                        res.json(err)
                    })

            } else {
                //console.log('customer not found')
                res.json({})
                
            }
        })
        .catch((err) => {
            res.json(err)
        })
}



module.exports.update = (req, res) => {
    const id= req.params.id
    const body = req.body
    Customer.findByIdAndUpdate(id, body, { new: true, runValidators: true})
        .then((customer) => {
            if(customer) {
                res.json(customer)
            } else {
                res.json({})
            }
        })
        .catch((err) => {
           res.json(err)
        })
}

module.exports.destroy=(req,res)=>{
    const {id}=req.params
    Customer.findByIdAndDelete(id)
    .then((customer)=>{
        if(customer)
        res.json(customer)
        else
        res.json({})
    })
    .catch((err)=>{
        res.json(err)
    })
}
