
const express = require('express');
const router = express.Router();

//true for live, false for sandbox
const uuid = require('uuid');
const Payment = require('../schemas/SurjoPaySchema');
const PaymentSSL = require('../schemas/sslPaySchema')
const store_id = 'qawmiuniversity0live'
const store_passwd ="6548F3072FE1D36902"
// const store_id = 'sslin6540f8f222862'
// const store_passwd = 'sslin6540f8f222862@ssl'
const is_live = true
const SSLCommerzPayment = require('sslcommerz-lts');
const BkashPayment = require('../schemas/bkashSchema');

const sslPost = (async (req, res) => {

  const paymentData = req.body;
  console.log(paymentData, 'line 20');
  const tran_id = uuid.v4();
  const data = {
    total_amount: paymentData?.amount,
    currency: 'BDT',
    tran_id: tran_id, // use unique tran_id for each api call
    success_url: `https://api.qawmiuniversity.com/success/payment/${tran_id}`,
    fail_url: `https://api.qawmiuniversity.com/failed/payment/${tran_id}`,
    cancel_url: 'https://qawmiuniversity.com/*',
    ipn_url: 'https://qawmiuniversity.com/ipn',
    shipping_method: paymentData.paymentMethod,
    product_name: 'Computer.',
    product_category: 'Electronic',
    product_profile: 'general',
    cus_name: paymentData.name,
    cus_email: 'customer@example.com',
    cus_add1: 'Dhaka',
    cus_add2: 'Dhaka',
    cus_city: 'Dhaka',
    cus_state: 'Dhaka',
    cus_postcode: '1000',
    cus_country: 'Bangladesh',
    cus_phone: paymentData.phoneNumber,
    cus_fax: '01711111111',
    ship_name: 'Customer Name',
    ship_add1: 'Dhaka',
    ship_add2: 'Dhaka',
    ship_city: 'Dhaka',
    ship_state: 'Dhaka',
    ship_postcode: 1000,
    ship_country: 'Bangladesh',
  };
  const sslcz = new SSLCommerzPayment(store_id, store_passwd, is_live)
  sslcz.init(data).then(apiResponse => {
    // Redirect the user to payment gateway
    let GatewayPageURL = apiResponse.GatewayPageURL
    console.log(data);
    res.send({ url: GatewayPageURL })

    const finalOrder = {
      amount: paymentData.amount,
      paidStatus: false,
      transactionID: tran_id,
      payerReference: paymentData.reference,
      phone: paymentData.phoneNumber,
      method: paymentData.paymentMethod
    }
    const result = BkashPayment.create(finalOrder);
    console.log(result);
    console.log('Redirecting to: ', GatewayPageURL)
  });

  console.log('data');
})

const sslPaySuccess = async (req, res) => {
  console.log(req.params.id);
  
  try {
    const result = await BkashPayment.updateOne(
      { transactionID: req.params.tranId },
      {
        $set: {
          paidStatus: true,
        }
      }
    );

    if (result.modifiedCount > 0) {
      res.redirect(`https://muslimschoool.com/check-out/payment-successful`);
    } else {
      // Handle the case where the document with the provided transactionID was not found or not modified.
      res.status(404).send('Not Found');
    }
  } catch (error) {
    // Handle any errors that occurred during the update.
    console.error('Error updating document:', error);
    res.status(500).send('Internal Server Error');
  }
};

const sslPayFaild =async(req,res)=>{
      const deletePayment =await BkashPayment.deleteOne({transactionID:req.params.tranId})
      if (deletePayment.deletedCount) {
        res.redirect('https://muslimschoool.com/check-out/failed')
      }
}
module.exports = {
  sslPost,
  sslPaySuccess,
  sslPayFaild
};