
const asyncHandler = require('express-async-handler');

const User = require("../schemas/userSchema");
const BkashPayment = require('../schemas/bkashSchema');

const { createPayment, executePayment, queryPayment, searchTransaction, refundTransaction } = require('bkash-payment');
const { bkashConfig } = require('../config/bkashConfig');


const createBPayment=asyncHandler(async (req, res) => {
  try {
   
    const { amount, callbackURL, orderID, reference,regType} = req.body
    const paymentDetails = {
      amount: amount ||10,                                                 // your product price
      callbackURL: callbackURL || 'http://localhost:8000/bkash/bkash-callback',  // your callback route 
      orderID: orderID || 'Order_101',                                     // your orderID
      reference: reference || '1' ,
      regType:regType                                // your reference
    }
  
   console.log(paymentDetails);
    const result = await createPayment(bkashConfig, paymentDetails)
  
    res.send(result)

  } catch (e) {
    console.log(e)
  }
  });

  const executeBPayment = async (req, res) => {
    console.log(req.query, 'this is qury');
    try {
      const { status, paymentID} = req.query;
      let result;

      if (status === 'success') {
        result = await executePayment(bkashConfig, paymentID);
  
        if (result?.statusCode !== '0000') {
          res.redirect('https://qawmiuniversity.com/check-out/failed');
          return;
        }
      }
  
     
      if (result?.transactionStatus === 'Completed') {
        console.log(result);
        const paymentData = {
          amount: +result?.amount,
          transactionID: result?.paymentID,
      // Add regType to the paymentData object
        };
  
        // Using Mongoose to create the payment record
        const paymentRecord = await BkashPayment.create(paymentData);
  
        console.log(paymentData, paymentRecord);
  
        res.redirect('https://qawmiuniversity.com/check-out/payment-successful');
        return;
      } else {
        res.redirect('https://qawmiuniversity.com/check-out/failed');
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
  const getAllpayment = asyncHandler(async (req, res) => {
    try {
      const messages = await BkashPayment.find({});
  
      res.json(messages);
    } catch (error) {
      res.status(400);
      throw new Error(error.message);
    }
  });
  


  module.exports = {
    createBPayment,
    executeBPayment,
    refundBPayment,
    getAllpayment
  };