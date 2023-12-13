const express = require('express')
const router = express.Router()
const SSLCommerzPayment = require('sslcommerz-lts')
const is_live = true //true for live, false for sandbox
const { v4: uuid } = require("uuid");
const Payment = require('../schemas/SurjoPaySchema');
const store_id = 'qawmiuniversity0live';
const store_passwd ="6548F3072FE1D36902"
// const PaymentSSL =require('../schemas/sslPaySchema')
// const store_id = 'sslin6540f8f222862'
// const store_passwd = 'sslin6540f8f222862@ssl'

router.post('/ssl-request', (req, res) => {
 
  const  paymentData  = req.body;
  // console.log(paymentData);
  const tran_id =uuid()
    const data = {
        total_amount: paymentData?.amount,
        currency: paymentData.currency,
        tran_id: tran_id, // use unique tran_id for each api call
        success_url: `https://qawmiuniversity.com/check-out/done`,
        fail_url: 'https://qawmiuniversity.com/check-out/failed',
        cancel_url: 'https://qawmiuniversity.com/*',
        ipn_url: 'https://qawmiuniversity.com/ipn',
        shipping_method: 'Courier',
        product_name: 'Computer.',
        product_category: 'Electronic',
        product_profile: 'general',
        cus_name: 'Customer Name',
        cus_email: paymentData.email,
        cus_add1: 'Dhaka',
        cus_add2: 'Dhaka',
        cus_city: 'Dhaka',
        cus_state: 'Dhaka',
        cus_postcode: '1000',
        cus_country: 'Bangladesh',
        cus_phone: paymentData.customer_phone,
        cus_fax: '01711111111',
        ship_name: paymentData.customer_name,
        ship_add1: 'Dhaka',
        ship_add2: 'Dhaka',
        ship_city: 'Dhaka',
        ship_state: 'Dhaka',
        ship_postcode: 1000,
        ship_country: 'Bangladesh',
    };
    console.log(data);
    const sslcz = new SSLCommerzPayment(store_id, store_passwd, is_live)
    sslcz.init(data).then(apiResponse => {
        // Redirect the user to payment gateway
        let GatewayPageURL = apiResponse.GatewayPageURL
        res.send({url:GatewayPageURL})
        console.log('Redirecting to: ', GatewayPageURL)
    });
    
  })


  router.post('/ipn', async(req, res) => {
    try {
     
      const data = req.body;

      // Validate the IPN data
      const sslcz = new SSLCommerzPayment(store_id, store_passwd, is_live);
      const isValidIPN = sslcz.validateIpnResponse(data);
    
      if (isValidIPN) {
        // IPN data is valid, perform necessary actions
        const transactionStatus = data.status;
        const transactionID = data.transaction_id;
    
        if (transactionStatus === 'VALID') {
         
          console.log(`Payment successful for transaction ID: ${transactionID}`);
  
        } else {
          
          console.log(`Payment failed or other status: ${transactionStatus}`);
          
        }
    
        
        res.json({ status: 'OK' });
      } else {

        console.error('Invalid IPN data received');
        res.status(400).json({ status: 'Invalid IPN data' });
      }
      
      const newPayment = new Payment({
        order_id: data.order_id,
        amount: data.amount,
        sslCommerzField1: data.sslCommerzField1,
        sslCommerzField2: data.sslCommerzField2,
        // ... other common and SSLCommerz-specific fields
      });
  
      
      await newPayment.save();
  
      res.json({ status: 'OK' });
    } catch (error) {
      res.status(500).json({ status: 'Invalid IPN data' });
    }
  });



module.exports = router