const adminModel = require('../models/adminModel')

exports.createAdmin = async (req,res) => {
    try {
        const {fullName,companyName,email,companyEmail,password,companyNumber} = req.body

        const admin = new adminModel({
            fullName,
            companyName,
            email,
            companyEmail,
            password,
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
        // console.log(admin);
        

        if (admin[0].password !== password){
            return res.status(403).json({
                message: "Invalid login credentials"
            })
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