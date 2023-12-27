
const express = require('express');
const router = express.Router();
const {
    sslPost, sslPaySuccess,
    sslPayFaild
} = require('../controllers/sslController');


router.route('/ssl-request').post(sslPost);
router.route('/success/payment/:tranId').post(sslPaySuccess);
router.route('/failed/payment/:tranId').post(sslPayFaild);




module.exports = router;