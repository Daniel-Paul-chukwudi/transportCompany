const {createAdmin,adminLogin} = require('../controller/adminController')
const router = require('express').Router()

router.post('/createAdmin',createAdmin)

router.post('/login',adminLogin)

module.exports = router