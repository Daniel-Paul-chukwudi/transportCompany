const {createOrder,findByTrackingId,updateOrder,deleteOrder,findOrder,getAll} = require('../controller/orderController')
const express = require('express')
const router = express.Router()

/**
 * @swagger
 * /order:
 *   post:
 *     summary: Create a new order
 *     description: Creates a new order and generates a unique tracking ID automatically.
 *     tags:
 *       - Orders
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - customerName
 *               - weight
 *               - origin
 *               - destination
 *               - carrier
 *             properties:
 *               customerName:
 *                 type: string
 *                 example: John Doe
 *               weight:
 *                 type: number
 *                 example: 25
 *               origin:
 *                 type: string
 *                 example: Lagos
 *               destination:
 *                 type: string
 *                 example: Abuja
 *               carrier:
 *                 type: string
 *                 example: DHL
 *     responses:
 *       201:
 *         description: Order created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: order created successfully
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: 64f9c2e7a12b34c56789abcd
 *                     customerName:
 *                       type: string
 *                       example: John Doe
 *                     weight:
 *                       type: number
 *                       example: 25
 *                     origin:
 *                       type: string
 *                       example: Lagos
 *                     destination:
 *                       type: string
 *                       example: Abuja
 *                     carrier:
 *                       type: string
 *                       example: DHL
 *                     trackingId:
 *                       type: string
 *                       example: TRK123456789
 *       500:
 *         description: Error creating order
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: error creating order
 *                 error:
 *                   type: string
 *                   example: Internal server error
 */
router.post('/order',createOrder)

/**
 * @swagger
 * /order/track/{trackingId}:
 *   get:
 *     summary: Find order by tracking ID
 *     description: Retrieves an order using its tracking ID.
 *     tags:
 *       - Orders
 *     parameters:
 *       - in: path
 *         name: trackingId
 *         required: true
 *         schema:
 *           type: string
 *         description: The tracking ID of the order
 *         example: TRK123456789
 *     responses:
 *       200:
 *         description: Order found successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: order found
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: 64f9c2e7a12b34c56789abcd
 *                     customerName:
 *                       type: string
 *                       example: John Doe
 *                     weight:
 *                       type: number
 *                       example: 25
 *                     origin:
 *                       type: string
 *                       example: Lagos
 *                     destination:
 *                       type: string
 *                       example: Abuja
 *                     carrier:
 *                       type: string
 *                       example: DHL
 *                     trackingId:
 *                       type: string
 *                       example: TRK123456789
 *       500:
 *         description: Error finding order
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: error finding order
 *                 error:
 *                   type: string
 *                   example: Internal server error
 */
router.get('/order/track/:trackingId',findByTrackingId)

/**
 * @swagger
 * /alter/{id}:
 *   patch:
 *     summary: Update an order
 *     description: Partially updates an existing order using its ID. Only provided fields will be updated.
 *     tags:
 *       - Orders
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the order
 *         example: 64f9c2e7a12b34c56789abcd
 *     requestBody:
 *       required: false
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               customerName:
 *                 type: string
 *                 example: John Doe
 *               weight:
 *                 type: number
 *                 example: 30
 *               origin:
 *                 type: string
 *                 example: Lagos
 *               destination:
 *                 type: string
 *                 example: Abuja
 *               carrier:
 *                 type: string
 *                 example: FedEx
 *               status:
 *                 type: string
 *                 example: in-transit
 *     responses:
 *       200:
 *         description: Order updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: order updated successfully
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: 64f9c2e7a12b34c56789abcd
 *                     customerName:
 *                       type: string
 *                       example: John Doe
 *                     weight:
 *                       type: number
 *                       example: 30
 *                     origin:
 *                       type: string
 *                       example: Lagos
 *                     destination:
 *                       type: string
 *                       example: Abuja
 *                     carrier:
 *                       type: string
 *                       example: FedEx
 *                     status:
 *                       type: string
 *                       example: in-transit
 *                     trackingId:
 *                       type: string
 *                       example: TRK123456789
 *       500:
 *         description: Error updating order
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: error updating order
 *                 error:
 *                   type: string
 *                   example: Internal server error
 */
router.patch('/alter/:id',updateOrder)

/**
 * @swagger
 * /remove/{id}:
 *   delete:
 *     summary: Delete an order
 *     description: Deletes an order using its ID.
 *     tags:
 *       - Orders
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the order to delete
 *         example: 64f9c2e7a12b34c56789abcd
 *     responses:
 *       200:
 *         description: Order deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: order deleted
 *       404:
 *         description: Order not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Order not found
 *       500:
 *         description: Error deleting order
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: error deleting order
 *                 error:
 *                   type: string
 *                   example: Internal server error
 */
router.delete('/remove/:id',deleteOrder)

/**
 * @swagger
 * /find/{id}:
 *   get:
 *     summary: Find order by ID
 *     description: Retrieves a single order using its unique ID.
 *     tags:
 *       - Orders
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the order
 *         example: 64f9c2e7a12b34c56789abcd
 *     responses:
 *       200:
 *         description: Order found successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: order found
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: 64f9c2e7a12b34c56789abcd
 *                     customerName:
 *                       type: string
 *                       example: John Doe
 *                     weight:
 *                       type: number
 *                       example: 25
 *                     origin:
 *                       type: string
 *                       example: Lagos
 *                     destination:
 *                       type: string
 *                       example: Abuja
 *                     carrier:
 *                       type: string
 *                       example: DHL
 *                     status:
 *                       type: string
 *                       example: in-transit
 *                     trackingId:
 *                       type: string
 *                       example: TRK123456789
 *       404:
 *         description: Order not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Order not found
 *       500:
 *         description: Error finding order
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: error finding order
 *                 error:
 *                   type: string
 *                   example: Internal server error
 */
router.get('/find/:id',findOrder)

/**
 * @swagger
 * /allOrders:
 *   get:
 *     summary: Get all orders
 *     description: Retrieves a list of all orders in the system.
 *     tags:
 *       - Orders
 *     responses:
 *       200:
 *         description: Successfully retrieved all orders
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: All orders
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                         example: 64f9c2e7a12b34c56789abcd
 *                       customerName:
 *                         type: string
 *                         example: John Doe
 *                       weight:
 *                         type: number
 *                         example: 25
 *                       origin:
 *                         type: string
 *                         example: Lagos
 *                       destination:
 *                         type: string
 *                         example: Abuja
 *                       carrier:
 *                         type: string
 *                         example: DHL
 *                       status:
 *                         type: string
 *                         example: pending
 *                       trackingId:
 *                         type: string
 *                         example: TRK123456789
 *       500:
 *         description: Error retrieving orders
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: error finding orders
 *                 error:
 *                   type: string
 *                   example: Internal server error
 */
router.get('/allOrders',getAll)

module.exports = router