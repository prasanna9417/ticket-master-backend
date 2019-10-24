const express = require('express')
const router = express.Router()

const customerController = require('../app/controllers/customerController')
const departmentController = require('../app/controllers/departmentController')
const employeeController = require('../app/controllers/employeeController')
const ticketController = require('../app/controllers/ticketController')
const dashboardController = require('../app/controllers/dashboardController')


router.get('/customer',customerController.list)
router.post('/customer',customerController.create)
router.get('/customer/:id',customerController.show)
router.put('/customer/:id',customerController.update)
router.delete('/customer/:id',customerController.destroy)

router.get('/department',departmentController.list)
router.post('/department',departmentController.create)
router.get('/department/:id',departmentController.show)
router.put('/department/:id',departmentController.update)
router.delete('/department/:id',departmentController.destroy)

router.get('/employee',employeeController.list)
router.post('/employee',employeeController.create)
router.get('/employee/:id',employeeController.show)
router.put('/employee/:id',employeeController.update)
router.delete('/employee/:id',employeeController.destroy)

router.get('/ticket',ticketController.list)
router.post('/ticket',ticketController.create)
router.get('/ticket/:id',ticketController.show)
router.put('/ticket/:id',ticketController.update)
router.delete('/ticket/:id',ticketController.destroy)


router.get('/dashboard',dashboardController.list)


module.exports = router