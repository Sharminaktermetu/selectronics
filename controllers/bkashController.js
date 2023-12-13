
const asyncHandler = require('express-async-handler');

const User = require("../schemas/userSchema");
const BkashPayment = require('../schemas/bkashSchema');

const { createPayment, executePayment, queryPayment, searchTransaction, refundTransaction } = require('bkash-payment');
const { bkashConfig } = require('../config/bkashConfig');


const createBPayment=asyncHandler(async (req, res) => {
  try {
    // console.log(req.body);
    const { amount, callbackURL, orderID, reference } = req.body
    const paymentDetails = {
      amount: amount || 10,                                                 // your product price
      callbackURL: callbackURL || 'http://localhost:8000/bkash/bkash-callback',  // your callback route 
      orderID: orderID || 'Order_101',                                     // your orderID
      reference: reference || '1'                                          // your reference
    }
    const result = await createPayment(bkashConfig, paymentDetails)
  
    res.send(result)
  } catch (e) {
    console.log(e)
  }
  });

  const executeBPayment = async (req, res) => {
    console.log(req.query);
     try {
      const { status, paymentID } = req.query;
      let result;
      let response = {
        statusCode: '4000',
        statusMessage: 'Payment Failed'
      };
      
      if (status === 'success') {
        result = await executePayment(bkashConfig, paymentID);
        console.log(result);
        if (result?.statusCode !== '0000') {
            // Send JSON response for failure
            
            res.redirect('http://localhost:3000/check-out/failed');
            return;
        }
    }
    
      if (result?.transactionStatus === 'Completed') {
        
        const paymentData = {          
          amount: +result?.amount,
          transactionID:result?.paymentID
        };

        // Using Mongoose to create the payment record
        const paymentRecord = await BkashPayment.create(paymentData);

        console.log(paymentData,paymentRecord);
  
        // console.log(paymentRecord, 'from line 55');
        res.redirect('http://localhost:3000/check-out/done');
        return;
      } else {
        res.redirect('http://localhost:3000/check-out/failed');
        return;
      }

    } catch (e) {
      console.error(e);
      res.status(500).send('Internal Server Error');
    }
  };
  const refundBPayment = async (req, res) => {
    try {
      const { paymentID, trxID, amount } = req.body
      const refundDetails = {
        paymentID,
        trxID,
        amount,
      }
      const result = await refundTransaction(bkashConfig, refundDetails)
      res.send(result)
    } catch (e) {
      console.log(e)
    }
  }
 
  


  module.exports = {
    createBPayment,
    executeBPayment,
    refundBPayment
  };



