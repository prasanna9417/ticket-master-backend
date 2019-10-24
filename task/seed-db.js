const configureDB = require('../config/database')
const faker = require('faker')
const Ticket= require('../app/models/ticket')

configureDB()

    
for (let i = 0; i < 1000; i++) {
    const ticket = new Ticket({ task: faker.name.jobTitle(),
        departmentId:"5d7f71c3ecead947e8f8ba27", customerId: "5d7f698df361412bcca1257d",
        employeeId:"5d80b38f175aa1386c5ddfbb", priority:"medium", createdAt:faker.date.between('2019-01-01', '2019-12-31'),
        isResolved:faker.random.boolean()
     })
    ticket.save()
        .then(note => {
            console.log(note)
        })
        .catch(err => {
            console.log(err)
        })
}
