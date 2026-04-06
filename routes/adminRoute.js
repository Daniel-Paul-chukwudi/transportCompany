const {createAdmin,adminLogin,adminDashboard} = require('../controller/adminController')
const router = require('express').Router()


/**
 * @swagger
 * /createAdmin:
 *   post:
 *     summary: Create a new admin
 *     description: Allows creating a new admin user with company and personal details.
 *     tags:
 *       - Admin
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - password   # for example, if password must always be provided
 *               - companyName
 *             properties:
 *               fullName:
 *                 type: string
 *                 example: John Doe
 *               companyName:
 *                 type: string
 *                 example: Tech Innovations Ltd
 *               email:
 *                 type: string
 *                 format: email
 *                 example: johndoe@example.com
 *               companyEmail:
 *                 type: string
 *                 format: email
 *                 example: info@techinnovations.com
 *               password:
 *                 type: string
 *                 format: password
 *                 example: StrongPassword123!
 *               companyNumber:
 *                 type: string
 *                 example: "+2348012345678"
 *     responses:
 *       201:
 *         description: Admin created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: admin created successfully
 *                 data:
 *                   type: object
 *                   properties:
 *                     fullName:
 *                       type: string
 *                       example: John Doe
 *                     companyName:
 *                       type: string
 *                       example: Tech Innovations Ltd
 *                     email:
 *                       type: string
 *                       example: johndoe@example.com
 *                     companyEmail:
 *                       type: string
 *                       example: info@techinnovations.com
 *                     companyNumber:
 *                       type: string
 *                       example: "+2348012345678"
 *                     password:
 *                       type: string
 *                       example: "$2b$10$hashedPasswordHere"
 *       500:
 *         description: Error creating admin
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: error creating admin
 *                 error:
 *                   type: string
 *                   example: Internal server error
 */
router.post('/createAdmin',createAdmin)

/**
 * @swagger
 * /login:
 *   post:
 *     summary: Admin login
 *     description: Allows an admin to log in using company email and password.
 *     tags:
 *       - Admin
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - companyEmail
 *               - password
 *             properties:
 *               companyEmail:
 *                 type: string
 *                 format: email
 *                 example: admin@company.com
 *               password:
 *                 type: string
 *                 format: password
 *                 example: StrongPassword123!
 *     responses:
 *       201:
 *         description: Admin login successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: admin login successful
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                         example: 64899efe-dd8b-4f4b-810c-fcae0cfb1ac9
 *                       fullName:
 *                         type: string
 *                         example: John Doe
 *                       companyName:
 *                         type: string
 *                         example: Tech Innovations Ltd
 *                       companyEmail:
 *                         type: string
 *                         example: admin@company.com
 *                       email:
 *                         type: string
 *                         example: johndoe@example.com
 *                       companyNumber:
 *                         type: string
 *                         example: "+2348012345678"
 *       400:
 *         description: Invalid login credentials
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Invalid login credentials
 *       500:
 *         description: Error during admin login
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: error admin login
 *                 error:
 *                   type: string
 *                   example: Internal server error
 */
router.post('/login',adminLogin)

/**
 * @swagger
 * /dashboard:
 *   get:
 *     summary: Get admin dashboard metrics
 *     description: Retrieves summary statistics for orders including total shipments, delivered, in transit, and processing.
 *     tags:
 *       - Admin
 *     responses:
 *       200:
 *         description: Dashboard metrics retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: All the Dashboard metrics
 *                 data:
 *                   type: object
 *                   properties:
 *                     totalShipments:
 *                       type: integer
 *                       example: 20
 *                     delivered:
 *                       type: integer
 *                       example: 10
 *                     inTransit:
 *                       type: integer
 *                       example: 5
 *                     processing:
 *                       type: integer
 *                       example: 5
 *       500:
 *         description: Error fetching dashboard details
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: error fetching Dashboard details
 *                 error:
 *                   type: string
 *                   example: Internal server error
 */
router.get('/dashboard',adminDashboard)

module.exports = router