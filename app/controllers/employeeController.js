const Employee = require('../models/employee')
const Ticket = require('../models/ticket')

//list
module.exports.list=(req,res)=>{
    Employee.find().populate('departmentId')
    .then((employee)=>{
        res.json(employee)
    })
    .catch((err)=>{
        res.json(err)
    })
}

//create
module.exports.create=(req,res)=>{
    const body = req.body
    const employee = new Employee(body)
    employee.save()
      .then((employee)=>{
          res.json(employee)
      })
      .catch((err)=>{
          res.json(err)
      })
}

//show
// module.exports.show=(req,res)=>{
//     const id = req.params.id
//     // Note.findById(id).populate('categoryId',['name'])
//     Employee.findById(id).populate('departmentId')
//     .then((employee)=>{
//         res.json(employee)
//     })
//     .catch((err)=>{
//         res.json(err)
//     })
// }


module.exports.show = (req, res) => {
    const { id } = req.params
    Employee.findById(id)
        .then((employee) => {
            if(employee){
                Ticket.find({ employeeId: id})
                    .then((ticket)=>{
                        if(ticket){
                            //console.log('id found')
                            const newEmployee={employee,ticket}
                            res.json(newEmployee)
                            
                        }
                        else{
                            //console.log('id not found')
                            res.json(employee)
                            
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



//update
module.exports.update=(req,res)=>{
    const id=req.params.id
    const body=req.body
    Employee.findByIdAndUpdate(id,body,{new:true,runValidators:true})
    .then((employee)=>{
        if(employee)
            res.json(employee)
        else
            res.json({})
    })
    .catch((err)=>{
        res.json(err)
    })
}

module.exports.destroy=(req,res)=>{
    const {id}=req.params
    Employee.findByIdAndDelete(id)
    .then((employee)=>{
        if(employee)
        res.json(employee)
        else
        res.json({})
    })
    .catch((err)=>{
        res.json(err)
    })
}
