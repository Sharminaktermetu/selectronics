const mongoose = require("mongoose");

const SurjoPaySchema = mongoose.Schema(
  {
    
        id: {
            type:Number,
            
        },
        order_id: {
            type:String,
            
        },
        currency: {
            type:String,
            
        } ,
        amount:  {
            type:Number,
            
        },
        payable_amount:  {
            type:String,
        
        },
        discsount_amount:  {
            type:String,
            
        },
        disc_percent:  {
            type:String,
           
        },
        usd_amt:  {
            type:String,
           
        },
        usd_rate:  {
            type:String,
            
        },
        card_holder_name:  {
            type:String,
       
        },
        card_number:  {
            type:Number,
       
        },
        phone_no: {
            type:String,
           
        },
        bank_trx_id: {
            type:String,
           
        },
        invoice_no: {
            type:String,
          
        },
        bank_status: {
            type:String,
            
        },
        customer_order_id: {
           type: mongoose.Schema.Types.ObjectId, 
            ref: "Course",
            
        },
        sp_code:{
            type:Number,
           
        },
        sp_massage: {
            type:String,
           
        },
        name: {
            type:String,
       
        },
        email:{
            type:String,
            
        },
        address: {
            type:String
            
        },
        city: {
            type:String
            
        },
        value1: {
            type:String
            
        },
        value2: {
            type:String
            
        },
        value3: {
            type:String
            
        },
        value4: {
            type:String
            
        },
        transaction_status: {
            type:String
            
        },
        method: {
            type:String,
          
        },
        date_time: {
            type:String,
           
        },
        sslCommerzField1: { type: String },
        sslCommerzField2: { type: String },
      
  }
);

const Payment = mongoose.model("Payment", SurjoPaySchema);
module.exports = Payment;