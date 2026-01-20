const express = require('express');
const {cashOnDeliveryController } = require('../controllers/cashOndeliveryController');

const router = express.Router();

router.route('/').post(cashOnDeliveryController);




module.exports = router;