const mongoose = require('mongoose');

const studentPayModel = mongoose.Schema(
  {
    name:String,
    phoneNumber: Number,
    amount:Number,
    paymentMethod:String
   
  },

  { timestamps: true }
);

const StudentMonthlyPay = mongoose.model('stidentMonthlyPay', studentPayModel);

module.exports = StudentMonthlyPay;
