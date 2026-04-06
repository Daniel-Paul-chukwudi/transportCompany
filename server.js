require('dotenv').config()
const express = require('express')
const mongoose  =require('mongoose')
const swaggerJSDoc = require('swagger-jsdoc')
const swaggerUi  = require('swagger-ui-express')
PORT = process.env.PORT
DB = process.env.DB
const orderRouter = require('./routes/orderRoute')
const adminRouter = require('./routes/adminRoute')

const app = express()

app.use(express.json())

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'API Documentation for transportCompany',
    version: '4.1.9',
    description: 'Swagger documentation for the TransportCompany backend',
    contact: {
      name: 'TransportCompany Support',
      url: 'https://google.com',
    },
  },
  servers: [
    {
      url: 'https://transportcompany.onrender.com',
      description: 'Production server',
    },
    {
      url: 'http://localhost:8902',
      description: 'Development server',
    },
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        description: 'Enter your JWT token as **Bearer <token>**',
      },
    },
  },
  security: [{ bearerAuth: [] }],
};

const swaggerOptions = {
  swaggerDefinition,
  apis: ['./routes/*.js'],
};

const swaggerSpec = swaggerJSDoc(swaggerOptions);
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use(orderRouter)
app.use(adminRouter)

const Startserver = async ()=>{ 
  mongoose.connect(DB).then(() => {
    console.log('Connected to Database')
    app.listen(PORT, () => {
      console.log('Server is running on Port:', PORT)
    })
  }).catch((error) => {
    console.log('Error connecting to Database', error.message)
  });
};

Startserver();