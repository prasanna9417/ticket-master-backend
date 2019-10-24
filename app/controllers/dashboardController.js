const Customer = require('../models/customer')
const Ticket = require('../models/ticket')

// module.exports.list=(req,res)=>{
//     Customer.find().sort({"createdAt":-1}) && Ticket.find().sort({"createdAt":1})
//     .then((customer,ticket)=>{
//         const recentCustomer={"Recent Customers":customer.slice(0,5)}
//         const recentTicket={"Recent Tickets":ticket.slice(0,5)}
//         Ticket.find({isResolved:true})
//         .then((resticket)=>{
//             const total={"Total":{"tickets":ticket.length,"resolved":resticket.length,"pending":ticket.length-rticket.length}}
//             res.json(recentTicket,recentCustomer,total)
//         })
//         .catch((err)=>{
//             res.json(err)
//         })
//     })
//     .catch((err)=>{
//         res.json(err)
//     })
// }

module.exports.list=(req,res)=>{
    Customer.find().sort({"createdAt":-1})
    .then((customer,ticket)=>{
        const recentCustomer=customer.slice(0,5)
        Ticket.find().populate('departmentId').sort({"createdAt":-1})
            .then((ticket)=>{
                const recentTicket=ticket.slice(0,5)
                 Ticket.find({isResolved:true})
                    .then((resticket)=>{
                        const total={"tickets":ticket.length, "resolved":resticket.length, "pending":ticket.length-resticket.length}
                        const output={"Recent Customers":recentCustomer,"Recent Tickets":recentTicket, "Total":total}
                        res.json(output)
        
                    })
                    .catch((err)=>{
                        res.json(err)
                    })
            })
            .catch((err)=>{
                res.json(err)
            })   
    })
    .catch((err)=>{
        res.json(err)
    })
}




