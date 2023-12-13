
const asyncHandler = require('express-async-handler');
const { v4: uuidv4 } = require("uuid");
const fetch = require("node-fetch");
let sess;
const User = require("../schemas/userSchema");
const Payment = require('../schemas/SurjoPaySchema');
const currentDate = require('../utilis/getCurrentDate');
const { createPayment, executePayment, queryPayment, searchTransaction, refundTransaction } = require('bkash-payment');
const { bkashConfig } = require('../config/bkashConfig');


const createBPayment=asyncHandler(async (req, res) => {
  try {
    const { amount, callbackURL, orderID, reference } = req.body
    const paymentDetails = {
      amount: amount || 10,                                                 // your product price
      callbackURL: callbackURL || 'http://localhost:8000/bkash/bkash-callback',  // your callback route 
      orderID: orderID || 'Order_101',                                     // your orderID
      reference: reference || '1'                                          // your reference
    }
    const result = await createPayment(bkashConfig, paymentDetails)
    console.log(result);
    res.send(result)
  } catch (e) {
    console.log(e)
  }
  });


  const executeBPayment=(async (req, res) => {
   console.log(req.query);
      try {
        const { status, paymentID } = req.query
        let result
        let response = {
          statusCode: '4000',
          statusMessage: 'Payment Failed'
        }
        if (status === 'success') result = await executePayment(bkashConfig, paymentID)
    
        if (result?.transactionStatus === 'Completed') {
          // payment success 
          // insert result in your db 
          res.redirect('http://localhost:3000/check-out/done');
          return; 
        }
       
          else {
 
            res.redirect('http://localhost:3000/check-out/failed');
            return; 
          }
      
        
        // if (result) response = {
        //   statusCode: result?.statusCode,
        //   statusMessage: result?.statusMessage
        // }
        // // You may here use WebSocket, server-sent events, or other methods to notify your client
        // res.send(response)
      } catch (e) {
        console.log(e)
      }
    
  });




  module.exports = {
    createBPayment,
    executeBPayment
  };



  // {"_id":"6360bd427c07f889a0646e25",
  // "id":1337359,
  // "order_id":"sp6360bcf2b4304",
  // "currency":"BDT",
  // "amount":1000,
  // "payable_amount":"1000.0000",
  // "discsount_amount":"0.0000",
  // "disc_percent":"0",
  // "usd_amt":"0.0000",
  // "usd_rate":"0",
  // "card_holder_name":null,
  // "card_number":null,
  // "phone_no":null,
  // "bank_trx_id":"9K19JEAYY3",
  // "invoice_no":"sp6360bcf2b4304",
  // "bank_status":"The Payment was Successful",
  // "customer_order_id":"jjkfjdg",
  // "sp_code":1000,
  // "sp_massage":"Success",
  // "name":"SAMIHA AMIN",
  // "email":"anita.0540@gmail.com",
  // "address":"Bangladesh",
  // "city":"45 Minutes-3 Days(Monthly)",
  // "value1":"nhe",
  // "value2":null,
  // "value3":null,
  // "value4":null,
  // "transaction_status":"Completed",
  // "method":"bKash",
  // "date_time":"2022-11-01 12:31:26","__v":0}