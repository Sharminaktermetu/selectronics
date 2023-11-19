const axios = require("axios");
const express = require('express')
const { v4: uuid } = require("uuid");
const { return_callback, checkoutPay, cancel_callback, getAllPayment } = require("../controllers/SurjoPayController");
const { checkLogin, admin } = require("../middlewares/checkLogin");
const router = express.Router()
const shurjopay = require('shurjopay')();




router.get('/checkout_return',return_callback )
router.get('/checkout_cancel',cancel_callback)
router.post("/checkout", checkoutPay)
router.get("/",checkLogin,admin,getAllPayment)
       

module.exports = router