const asyncHandler = require('express-async-handler');
const { bannerEngSchema, bannerBngSchema } = require('../schemas/bannerSchema');
const mongoose = require('mongoose');
const BannerEngs = new mongoose.model('BannerEng', bannerEngSchema);
const BannerBngs = new mongoose.model('BannerBng', bannerBngSchema);

const createBannerEng = asyncHandler(async (req, res) => {
  try {
    const newBannerEng = await BannerEngs.create({
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

const getnewBannerEng = asyncHandler(async (req, res) => {
  try {
    const BannerEng = await BannerEngs.find({});

    res.status(201).json({
      success: true,
      data: BannerEng,
    });
  } catch (error) {
    
    res.status(401).json({
      error: 'Something error, can not get user data',
    });
  }
});
const createBannerBng = asyncHandler(async (req, res) => {
  try {
    const newBannerBng = await BannerBngs.create({
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

const getnewBannerBng = asyncHandler(async (req, res) => {
  try {
    const BannerBng = await BannerBngs.find({});

    res.status(201).json({
      success: true,
      data: BannerBng,
    });
  } catch (error) {
    
    res.status(401).json({
      
      error: 'Something error, can not get user data',
    });
  }
});

module.exports = {
  createBannerEng,
  getnewBannerEng,
  createBannerBng,
  getnewBannerBng,
};
