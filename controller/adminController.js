const adminModel = require('../models/adminModel')
const orderModel = require('../models/orderModel')
const bcrypt = require('bcrypt')

exports.createAdmin = async (req,res) => {
    try {
        const {fullName,companyName,email,companyEmail,password,companyNumber} = req.body

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        const admin = new adminModel({
            fullName,
            companyName,
            email,
            companyEmail,
            password: hashedPassword,
            companyNumber
        })

        await admin.save()

        res.status(201).json({
            message: "admin created successfully",
            data: admin
        })

    } catch (error) {
        res.status(500).json({
            message: "error creating admin",
            error:error.message
        })
    }
}

exports.adminLogin = async (req,res) => {
    try {
        const {companyEmail,password} = req.body

        const admin = await adminModel.find({companyEmail})
        
        const isMatch = await bcrypt.compare(password, admin[0].password);
        
        if (!isMatch) {
        return res.status(400).json({ message: "Invalid login credentials" });
        }



        res.status(201).json({
            message: "admin login successful",
            data: admin
        })

    } catch (error) {
        res.status(500).json({
            message: "error admin login",
            error:error.message
        })
    }
}

exports.adminDashboard = async (req,res) =>{
    try {
        
        const allOrders = await orderModel.find()
        let totalShipments = allOrders.length
        let delivered = 0
        let inTransit = 0
        let processing = 0

        if (allOrders.length > 0){
            for (const order of allOrders){
                if(order.status === "delivered"){
                    delivered += 1
                }else if(order.status === "in transit"){
                    inTransit += 1
                }else if(order.status === "processing"){
                    processing += 1
                }

            }
            return res.status(200).json({
                message: "All the Dashboard metrics",
                data:{
                    totalShipments,
                    delivered,
                    inTransit,
                    processing
                }
            })
        }else{
            return res.status(200).json({
                message: "No orders yet",
                data:{
                    totalShipments,
                    delivered,
                    inTransit,
                    processing
                }
            })
        }



    } catch (error) {
                res.status(500).json({
            message: "error fetching Dashboard details",
            error:error.message
        })
    }
}