const mongoose = require('mongoose');

const orderSchema =new mongoose.Schema({
      trackingId: {
        type: String,
        required: true,
        trim: true
      },
      customerName: {
        type: String,
        required: true,
        trim: true
      },
      weight:{
        type: String,
        required: true,
      },
      origin: {
        type: String,
        required: true
      },
      destination:{
        type: String,
        required: true
      },
      carrier:{
        type: String,
        enum: ['dhl','fedex','shipengine','ups','usps'],
      },
      status:{
        type: String,
        enum: ['in transit','delivered','processing','out for delivery','on hold','cancelled'],
        default:'processing'
      }
  },
  {
    timestamps:true,
  }
);

const orderModel = mongoose.model('orders', orderSchema);

module.exports = orderModel; 