const express = require('express');
const { default: mongoose } = require('mongoose');
const {
  createPricingPlan,
  getPricingPlan,
  getSinglePricingPlan,
  classPricingdaysPlanUpdate,
  batchPricingdaysPlanUpdate,
} = require('../controllers/pricingControllerItem');

const router = express.Router();

router.route('/').post(createPricingPlan).get(getPricingPlan);

router.route('/single/:Id').get(getSinglePricingPlan);
router.route('/private/:Id').put(classPricingdaysPlanUpdate);
router.route('/batch/:Id').put(batchPricingdaysPlanUpdate);

module.exports = router;
