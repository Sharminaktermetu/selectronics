const express = require('express');
const { default: mongoose } = require('mongoose');
const {
  createBannerTwoEng,
  getnewBannerTwoEng,
  createBannerTwoBng,
  getnewBannerTwoBng,
} = require('../controllers/bannerTwoController');

const router = express.Router();

router.route('/eng').post(createBannerTwoEng).get(getnewBannerTwoEng);
router.route('/bng').post(createBannerTwoBng).get(getnewBannerTwoBng);

module.exports = router;
