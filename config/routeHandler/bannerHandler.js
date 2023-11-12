const express = require('express');
const { default: mongoose } = require('mongoose');
const {
  createBannerEng,
  createBannerBng,
  getnewBannerEng,
  getnewBannerBng,
} = require('../controllers/bannerController');

const router = express.Router();

router.route('/eng').post(createBannerEng).get(getnewBannerEng);
router.route('/bng').post(createBannerBng).get(getnewBannerBng);

module.exports = router;
