const mongoose = require('mongoose');
const { Schema } = mongoose;

const pricingSchema = mongoose.Schema({
  batch_full_price:Number,
  batch_full_desc:String,
  batch_monthly_price:Number,
  batch_monthly_desc:String,
  Days_2:Object,
  Days_3:Object,
  Days_4:Object,
  Days_5:Object,
  Days_6:Object


});

module.exports = { pricingSchema };
