const mongoose = require('mongoose');

const adminSchema =new mongoose.Schema({
      fullName: {
        type: String,
        trim: true
      },
      companyName: {
        type: String,
        trim: true
      },
      email:{
        type: String,
      },
      companyEmail: {
        type: String
      },
      password:{
        type: String
      },
      companyNumber:{
        type: String
      },
      
  },
  {
    timestamps:true,
  }
);

const adminModel = mongoose.model('admins', adminSchema);

module.exports = adminModel; 