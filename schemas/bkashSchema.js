const mongoose = require("mongoose");

const bkashSchema =new mongoose.Schema({
  amount: {
    type: Number, 
    // required: true,
  },
  transactionID: {
    type: String,
    // required: true,
  },
  payerReference: {
    type: String,
    // required: true,
  },
  phone:{
    type:String,
  },
name:{type:String},
method:{type:String},
paidStatus:{type:Boolean}

},
{ timestamps: true }
);

const BkashPayment = mongoose.model("BkashPayment", bkashSchema);
module.exports = BkashPayment;
