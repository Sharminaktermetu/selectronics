const express = require('express')
const router = express.Router()
const SSLCommerzPayment = require('sslcommerz-lts')
const is_live = true //true for live, false for sandbox
const { v4: uuid } = require("uuid");
const store_id = process.env.SSL_USERNAME;
const store_passwd =process.env.SSL_PASS
const PaymentSSL =require('../schemas/sslPaySchema')
// const store_id = 'sslin6540f8f222862'
// const store_passwd = 'sslin6540f8f222862@ssl'

router.post('/ssl-request', (req, res) => {
 
  const  paymentData  = req.body;
  console.log(paymentData);
  const tran_id =uuid()
    const data = {
        total_amount: paymentData?.amount,
        currency: paymentData.currency,
        tran_id: tran_id, // use unique tran_id for each api call
        success_url: `https://qawmiuniversity.com/check-out/done`,
        fail_url: 'https://qawmiuniversity.com/check-out/failed',
        cancel_url: 'https://qawmiuniversity.com/*',
        ipn_url: 'http://localhost:3030/ipn',
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
        // console.log('Redirecting to: ', GatewayPageURL)
    });
    
    router.post("/check-out/done", async (req, res) => {
      console.log('object');
          
    });
    
    


  })
  
//   app.get('/validate', (req, res) => {
//     const val_id = req.query.val_id; 
//     const data = {
//         val_id: val_id
//     };

   
//     const sslcz = new SSLCommerzPayment(store_id, store_passwd, is_live);

   
//     sslcz.validate(data).then(apiResponse => {

//         if (apiResponse.status === 'VALID') {
            
//             console.log('Transaction is valid');
//         } else {
           
//             console.log('Transaction is not valid');
//         }

//         // Send a response back to the client
//         res.json(apiResponse);
//     }).catch(error => {
//         // Handle errors that might occur during the validation process
//         console.error('Validation error:', error);
//         res.status(500).json({ error: 'Internal Server Error' });
//     });
// });



module.exports = router