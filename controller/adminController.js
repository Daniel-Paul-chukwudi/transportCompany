const adminModel = require('../models/adminModel')
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