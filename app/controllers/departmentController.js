const Department = require('../models/department')
const Ticket = require('../models/ticket')

//list
module.exports.list=(req,res)=>{
    Department.find()
    .then((department)=>{
        res.json(department)
    })
    .catch((err)=>{
        res.json(err)
    })
}

module.exports.create=(req,res)=>{
    const body = req.body
    const department = new Department(body)
    department.save()
      .then((department)=>{
          res.json(department)
      })
      .catch((err)=>{
          res.json(err)
      })
}

// module.exports.show = (req, res) => {
//     const { id } = req.params
//     Department.findById(id)
//         .then((department) => {
//             if(department){
//                 res.json(department)
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
    Department.findById(id)
        .then((department) => {
            if(department){
                Ticket.find({ departmentId: id})
                    .then((ticket)=>{
                        if(ticket){
                            //console.log('id found')
                            newDepartment={department,ticket}
                            res.json(newDepartment)
                            
                        }
                        else{
                            //console.log('id not found')
                            res.json(department)
                            
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
    Department.findByIdAndUpdate(id, body, { new: true, runValidators: true})
        .then((department) => {
            if(department) {
                res.json(department)
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
    Department.findByIdAndDelete(id)
    .then((department)=>{
        if(department)
        res.json(department)
        else
        res.json({})
    })
    .catch((err)=>{
        res.json(err)
    })
}
