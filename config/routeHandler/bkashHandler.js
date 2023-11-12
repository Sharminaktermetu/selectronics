const express = require('express');
const { createPayment, executePayment } = require('../controllers/bkashController');
const router = express.Router();
const {checkLogin,admin}=require('../middlewares/checkLogin')

router.post('/create',checkLogin,createPayment)
router.post('/execute',executePayment)


module.exports = router;