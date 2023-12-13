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


});

const BkashPayment = mongoose.model("BkashPayment", bkashSchema);
module.exports = BkashPayment;
