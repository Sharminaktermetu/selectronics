const asyncHandler = require('express-async-handler');

const mongoose = require('mongoose');
const {
  bannerTwoEngSchema,
  bannerTwoBngSchema,
} = require('../schemas/bannerTwoSchema');
const BannerTwoEngs = new mongoose.model('bannerTwoEng', bannerTwoEngSchema);
const BannerTwoBngs = new mongoose.model('bannerTwoBng', bannerTwoBngSchema);

const createBannerTwoEng = asyncHandler(async (req, res) => {
  try {
    const newBannerTwoEng = await BannerTwoEngs.create({
      ...req.body,
    });
    // await newbook.save();
    
    
    res.status(200).json({
      success: true,
      message: 'newBannerEng created Successfully',
    });
  } catch (error) {
    
    res.status(500).json({
      error: 'something wrong, cannot create book',
    });
  }
});

const getnewBannerTwoEng = asyncHandler(async (req, res) => {
  try {
    const BannerTwoEng = await BannerTwoEngs.find({});

    res.status(201).json({
      success: true,
      data: BannerTwoEng,
    });
  } catch (error) {
    
    res.status(401).json({
      error: 'Something error, can not get user data',
    });
  }
});
const createBannerTwoBng = asyncHandler(async (req, res) => {
  try {
    const newBannerTwoBng = await BannerTwoBngs.create({
      ...req.body,
    });
    // await newbook.save();
    
    
    res.status(200).json({
      success: true,
      message: 'newBannerEng created Successfully',
    });
  } catch (error) {
    
    res.status(500).json({
      error: 'something wrong, cannot create book',
    });
  }
});

const getnewBannerTwoBng = asyncHandler(async (req, res) => {
  try {
    const BannerTwoBng = await BannerTwoBngs.find({});

    res.status(201).json({
      success: true,
      data: BannerTwoBng,
    });
  } catch (error) {
    
    res.status(401).json({
      error: 'Something error, can not get user data',
    });
  }
});

module.exports = {
  createBannerTwoEng,
  getnewBannerTwoEng,
  createBannerTwoBng,
  getnewBannerTwoBng,
};
