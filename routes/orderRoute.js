const {createOrder,findByTrackingId,updateOrder,deleteOrder,findOrder,getAll} = require('../controller/orderController')
const express = require('express')
const router = express.Router()

router.post('/order',createOrder)

router.get('/track',findByTrackingId)

router.patch('/alter/:id',updateOrder)

router.delete('/remove/:id',deleteOrder)

router.get('/find/:id',findOrder)

router.get('/allOrders',getAll)

module.exports = router