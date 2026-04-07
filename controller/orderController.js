const orderModel = require('../models/orderModel')
const otpGen = require('otp-generator')




exports.createOrder = async (req,res) =>{
    try {
        const {customerName,weight,origin,destination,carrier,estimatedDate,status} = req.body

        let code = 0
        let trackingId = ''

        const randomNumgenerator = () =>{
            code = otpGen.generate(9, { upperCaseAlphabets: false, lowerCaseAlphabets: false, digits: true, specialChars: false })
            return code
        }
        trackingId = `TRK${randomNumgenerator()}`
        const allOrders = await orderModel.find()
        let tId= []

        allOrders.map((item)=>{
            tId.push(item.trackingId)
        })

        do{
            trackingId = `TRK${randomNumgenerator()}`
        }while (tId.includes(trackingId))


        // for (const order of allOrders){
        //     if(order.trackingId === trackingId){
        //         trackingId = `TRK${randomNumgenerator()}`
        //     }
        // }
        console.log(carrier.toLowerCase(),"yes");
        
        

        const order = new orderModel({
            customerName,
            weight,
            origin,
            destination,
            carrier:carrier.toLowerCase(),
            trackingId,
            estimatedDate,
            status:status?status.toLowerCase():"processing"
        })


        await order.save()

        res.status(201).json({
            message: "order created successfully",
            data: order
        })

    } catch (error) {
        res.status(500).json({
            message:"error creating order",
            error:error.message
        })
    }
}

exports.findByTrackingId = async (req,res) =>{
    try {
        const {trackingId} = req.params
        const order = await orderModel.find({trackingId:trackingId})

        res.status(200).json({
            message: "order found",
            data: order
        })

    } catch (error) {
        res.status(500).json({
            message:"error finding order",
            error:error.message
        })        
    }
}

exports.updateOrder = async (req,res) =>{
    try {
        const {customerName,weight,origin,destination,carrier,status,estimatedDate} = req.body

        const orderId = req.params.id

        const targetOrder = await orderModel.findById(orderId)


            targetOrder.customerName = customerName?customerName : targetOrder.customerName,
            targetOrder.weight=weight?weight :targetOrder.weight,
            targetOrder.origin=origin?origin:targetOrder.origin,
            targetOrder.destination=destination?destination:targetOrder.destination,
            targetOrder.carrier=carrier?carrier.toLowerCase():targetOrder.carrier,
            targetOrder.status=status?status.toLowerCase():targetOrder.status,
            targetOrder.estimatedDate=estimatedDate?estimatedDate:targetOrder.estimatedDate,
            
        await targetOrder.save()
        // const updatedOrder = {
        //     customerName:customerName?customerName : targetOrder.customerName,
        //     weight:weight?weight :targetOrder.weight,
        //     origin:origin?origin:targetOrder.origin,
        //     destination:destination?destination:targetOrder.destination,
        //     carrier:carrier?carrier:targetOrder.carrier,
        //     trackingId:targetOrder.trackingId
        // }

        // const response = await orderModel.findByIdAndUpdate(orderId,updatedOrder)
        
        
        res.status(200).json({
            message: "order updated successfully",
            data: targetOrder
        })

    } catch (error) {
        res.status(500).json({
            message:"error updating order",
            error:error.message
        })
    }
}

exports.findOrder = async (req,res) =>{
    try {
        const id = req.params.id
        const order = await orderModel.findById(id)

        res.status(200).json({
            message: "order found",
            data: order
        })

    } catch (error) {
        res.status(500).json({
            message:"error finding order",
            error:error.message
        })        
    }
}

exports.getAll = async (req,res) =>{
    try {
        const orders = await orderModel.find()

        res.status(200).json({
            message: "All orders",
            data: orders
        })

    } catch (error) {
        res.status(500).json({
            message:"error finding orders",
            error:error.message
        })        
    }
}

exports.deleteOrder = async (req,res) =>{
    try {
        const id = req.params.id
        const order = await orderModel.findByIdAndDelete(id)

        res.status(200).json({
            message: "order deleted",
        })

    } catch (error) {
        res.status(500).json({
            message:"error deleting order",
            error:error.message
        })        
    }
}

