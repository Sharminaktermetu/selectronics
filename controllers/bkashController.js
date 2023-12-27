
const asyncHandler = require('express-async-handler');

const User = require("../schemas/userSchema");
const BkashPayment = require('../schemas/bkashSchema');

const { createPayment, executePayment, queryPayment, searchTransaction, refundTransaction } = require('bkash-payment');
const { bkashConfig } = require('../config/bkashConfig');


const createBPayment=asyncHandler(async (req, res) => {
  try {
   
    const { amount, callbackURL, orderID, reference,name} = req.body
    const paymentDetails = {
      amount: amount,                                               
      callbackURL: `https://api.qawmiuniversity.com/bkash/bkash-callback?name=${name}`,  
      orderID: orderID || 'Order_101',                                   
      reference: reference ||1,
                           
    }
  
    const result = await createPayment(bkashConfig, paymentDetails)
    res.send(result)

  } catch (e) {
    console.log(e)
  }
  });

  const executeBPayment = async (req, res) => {

    try {
      const { status, paymentID,name} = req.query;
      
      let result;

      if (status === 'success') {
        result = await executePayment(bkashConfig, paymentID);
  
        if (result?.statusCode !== '0000') {
          res.redirect('https://qawmiuniversity.com/check-out/failed');
          return;
        }
      }
  
     
      if (result?.transactionStatus === 'Completed') {
       
        const paymentData = {
          amount: +result?.amount,
          transactionID: result?.paymentID,
          payerReference: result?.payerReference,
         phone:result?.customerMsisdn,
          name:req.query.name,
          method:'bkash',
          paidStatus: true
        };
  
        // Using Mongoose to create the payment record
        const paymentRecord = await BkashPayment.create(paymentData);
  
        
  
        res.redirect('https://qawmiuniversity.com/check-out/payment-successful');
        return;
      } else {
        res.redirect('https://qawmiuniversity.com/check-out/failed');
        return;
      }
    } catch (e) {
     
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
  
  const getmonthlypayment = asyncHandler(async (req, res) => {
    try {
      const messages = await BkashPayment.find({reference:'student-monthly-payment',paidStatus: true});
  
      res.json(messages);
    } catch (error) {
      res.status(400);
      throw new Error(error.message);
    }
  });
  
  const deleteAllStudentPay = asyncHandler(async (req, res) => {
    try {
        // Use deleteMany to delete all documents in the collection
        const result = await BkashPayment.deleteMany({});
        
        // Check the result object to see the number of deleted documents
        console.log(`${result.deletedCount} documents deleted.`);

        res.json({ message: 'All documents deleted successfully.' });
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error', message: error.message });
    }
});

  module.exports = {
    createBPayment,
    executeBPayment,
    refundBPayment,
    getAllpayment,
    deleteAllStudentPay,
    getmonthlypayment
  };